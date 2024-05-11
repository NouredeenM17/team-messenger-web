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
    <div className="m-20">
      <h1>Room Title: {roomData?.title}</h1>
      {userId === roomData?.creatorId ? <h1>Room ID: {roomId}</h1> : null}
      <Chatroom roomId={roomId!} />
    </div>
  );
};

export default ChatroomPage;
