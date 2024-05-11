import { useState } from 'react';
import { toast } from 'react-toastify';

type Props = {
    userId: string;
    onClose: () => void;
}

const CreateRoomPopup = ({ userId, onClose }: Props) => {
  const [roomTitle, setRoomTitle] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission, e.g., create the room
    const roomId: string = await createRoom(roomTitle);
    joinRoom(roomId);
    toast.success('Room created successfully!');
    // Close the popup
    onClose();
  };

  const createRoom = async (roomTitle: string) => {
    try {
        const result = await fetch('/api/rooms', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: roomTitle, creatorId: userId})
          });
        const data = await result.json();
        
        return data._id;
    } catch (error) {
        console.error('Error creating room');
    }
    
}

const joinRoom = async (roomId: string) => {
    const result = await fetch('/api/users/addRoom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({roomId: roomId, userId: userId})
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
        <h2 className="text-2xl font-semibold mb-4">Create Room</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="roomTitle" className="block mb-1">Room Title:</label>
            <input
              type="text"
              id="roomTitle"
              value={roomTitle}
              onChange={(e) => setRoomTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="flex justify-between">
            <button type="button" onClick={onClose} className="w-24 bg-gray-300 text-gray-800 font-semibold py-2 rounded-md">Cancel</button>
            <button type="submit" className="w-24 bg-blue-500 text-white font-semibold py-2 rounded-md">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRoomPopup;
