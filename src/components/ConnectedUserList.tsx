type Props = {
  connectedUsers: string[];
}

const ConnectedUserList = ({ connectedUsers }:Props) => {
  
  return (
    <div className="user-list bg-gray-100 p-4 rounded-lg">
          {connectedUsers.map(user => (
            <div key={user} className="user py-2 px-4 hover:bg-gray-200 rounded-md">
              {user}
            </div>
          ))}
        </div>
  )
}

export default ConnectedUserList