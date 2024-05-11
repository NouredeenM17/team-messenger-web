type Props = {
  connectedUsers: string[];
}

const ConnectedUserList = ({ connectedUsers }:Props) => {
  
  return (
    <div className="user-list bg-gray-100 p-4 h-full rounded-lg mr-5"
    style={{ maxHeight: "92vh", overflowY: "auto" }}
    >
      <div className="text-lg font-semibold m-2">
        Connected Users:
      </div>
          {connectedUsers.map(user => (
            <div key={user} className="user py-2 px-4 hover:bg-gray-200 rounded-md">
              {user}
            </div>
          ))}
        </div>
  )
}

export default ConnectedUserList