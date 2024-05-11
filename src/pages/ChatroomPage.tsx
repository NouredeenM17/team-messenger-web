import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Chatroom from "../components/Chatroom";
import { IRoom } from "../interfaces/IRoom";
import { toast } from "react-toastify";

const ChatroomPage = () => {
  const userIdInStorage: string =
    localStorage.getItem("tm-user-id") || '"userId"';
  const userId: string = userIdInStorage.substring(
    1,
    userIdInStorage.length - 1
  );

  const navigate = useNavigate();
  const { roomId } = useParams();
  const [roomData, setRoomData] = useState<IRoom>();

  useEffect(() => {
    fetchRoomData(roomId!);
  }, []);

  const fetchRoomData = async (roomId: string) => {
    try {
      console.log(roomId);

      const result = await fetch(`/api/rooms/${roomId}`);
      const data: IRoom = await result.json();
      if (data.error) {
        throw new Error();
      }

      setRoomData(data);
      return;
    } catch (error) {
      console.error("An error has occured while fetching room info:", error);
      toast.error("Room does not exist!");
      return navigate("/");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center space-x-4 mt-5">
        <div className="text-lg mr-5">
          <span className="font-semibold">Room Title:</span> {roomData?.title}
        </div>
        {userId === roomData?.creatorId && (
          <div className="text-lg ml-5">
            <span className="font-semibold">Room ID:</span> {roomId}
          </div>
        )}
      </div>
      <div className="ml-20 mr-20 mt-5 mb-5">
        <Chatroom roomId={roomId!} />
      </div>
    </div>
  );
};

export default ChatroomPage;
