import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import RoomCard from "../components/RoomCard";
import { IRoom } from "../interfaces/IRoom";
import CreateRoomPopup from "../components/CreateRoomPopup";
import JoinRoomPopup from "../components/JoinRoomPopup";

const HomePage = () => {
  const token = localStorage.getItem("tm-auth-token");

  const userIdInStorage: string =
    localStorage.getItem("tm-user-id") || '"userId"';
  const userId: string = userIdInStorage.substring(
    1,
    userIdInStorage.length - 1
  );

  const usernameInStorage: string =
    localStorage.getItem("tm-username") || '"user"';
  const username: string = usernameInStorage.substring(
    1,
    usernameInStorage.length - 1
  );

  const navigate = useNavigate();

  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const [isJoinPopupOpen, setIsJoinPopupOpen] = useState(false);

  const handleCreateRoomClick = () => {
    setIsCreatePopupOpen(true);
  };

  const handleCloseCreatePopup = () => {
    setIsCreatePopupOpen(false);
    setTimeout(fetchUserRooms, 300);
  };

  const handleJoinRoomClick = () => {
    setIsJoinPopupOpen(true);
  };

  const handleCloseJoinPopup = () => {
    setIsJoinPopupOpen(false);
    setTimeout(fetchUserRooms, 300);
  };

  useEffect(() => {
    if (!token) {
      return navigate("/login");
    }

    fetchUserRooms();
  }, []);

  const logout = () => {
    localStorage.removeItem("tm-auth-token");
    localStorage.removeItem("tm-user-id");
    localStorage.removeItem("tm-username");
    return navigate("/login");
  };

  const goToRoom = (_id: string) => {
    return navigate(`/room/${_id}`);
  };

  const fetchUserRooms = async () => {
    try {
      console.log("user id =" + userId);
      const result = await fetch(`/api/users/getRoomIdsOfUser/${userId}`);
      const data = await result.json();

      if (!data.success) {
        throw new Error("error fetching user rooms");
      }
      console.log(data);

      const uniqueRooms: IRoom[] = [];
      for (const roomId of data.roomIds) {
        const roomObj: IRoom | undefined = await fetchRoomData(roomId);
        if (roomObj) {
          uniqueRooms.push({
            _id: roomObj._id,
            title: roomObj.title,
            creatorId: roomObj.creatorId,
          });
        }
      }
      // Update state with unique rooms
      setRooms(uniqueRooms);
    } catch (error) {
      console.error("An error has occured while fetching user rooms:", error);
    }
  };

  const fetchRoomData = async (roomId: string) => {
    try {
      const result = await fetch(`/api/rooms/${roomId}`);
      const data: IRoom = await result.json();
      console.log(data);

      return data;
    } catch (error) {
      console.error("An error has occured while fetching room info:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        {/* Welcome message */}
        <h1 className="text-2xl font-semibold">Welcome, {username}!</h1>
        {/* Logout button */}
        <button
          onClick={() => logout()}
          className="text-gray-600 hover:text-gray-900"
        >
          Logout
        </button>
      </div>
      {/* Action buttons */}
      <div className="flex justify-end mb-4">
        <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md mr-4"
        onClick={() => handleJoinRoomClick()}
        >
          Join Room
        </button>
        {isJoinPopupOpen && (
            <JoinRoomPopup userId={userId} onClose={handleCloseJoinPopup} />
          )}
        <div>
          <button
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md"
            onClick={() => handleCreateRoomClick()}
          >
            Create Room
          </button>
          {isCreatePopupOpen && (
            <CreateRoomPopup userId={userId} onClose={handleCloseCreatePopup} />
          )}
        </div>
      </div>
      {/* Room cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map((room) => {
          return (
            <RoomCard
              key={room._id}
              title={room.title}
              _id={room._id}
              handleRoomEntry={goToRoom}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
