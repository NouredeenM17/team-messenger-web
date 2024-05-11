import { useState } from 'react';
import { toast } from 'react-toastify';

type Props = {
    userId: string;
    onClose: () => void;
}

const JoinRoomPopup = ({ userId, onClose }: Props) => {
  const [roomKey, setRoomKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission, join the room
    joinRoom(roomKey);
    toast.success('Room joined successfully!');
    // Close the popup
    onClose();
  };

  const joinRoom = async (roomKey: string) => {
        const result = await fetch('/api/users/addRoom', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({roomId: roomKey, userId: userId})
          });
        const data = await result.json();
        if(data.success === false){
            console.error(data.message);
        }
        return;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-80">
        <h2 className="text-2xl font-semibold mb-4">Join Room</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="roomTitle" className="block mb-1">Room Key:</label>
            <input
              type="text"
              id="roomKey"
              value={roomKey}
              onChange={(e) => setRoomKey(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="flex justify-between">
            <button type="button" onClick={onClose} className="w-24 bg-gray-300 text-gray-800 font-semibold py-2 rounded-md">Cancel</button>
            <button type="submit" className="w-24 bg-blue-500 text-white font-semibold py-2 rounded-md">Join</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinRoomPopup;
