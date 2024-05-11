type Props = {
    _id: string;
    title: string;
    handleRoomEntry: (_id: string) => void
}

const RoomCard = ({ _id, title, handleRoomEntry }: Props) => {

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md"
        onClick={() => handleRoomEntry(_id)}
        >Enter</button>
      </div>
  )
}

export default RoomCard