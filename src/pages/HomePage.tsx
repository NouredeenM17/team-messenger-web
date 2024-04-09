import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

const HomePage = () => {
    const token = localStorage.getItem("tm-auth-token");
    const userId = localStorage.getItem("tm-user-id");

    const navigate = useNavigate();

    useEffect(() => {
        if (!token){
            return navigate('/login');
        }
      }, []);
    
    const logout = () => {
        localStorage.removeItem("tm-auth-token");
        localStorage.removeItem("tm-user-id");
        return navigate('/login');
    }

    const goToRoom = () => {
        return navigate('/room');
    }
  
    return (
        <>
            <div>Welcome user: { userId }</div>
            <div onClick={ goToRoom }>Go to room</div>
            <div onClick={ logout }>Logout</div>
        </>
    
  )
}

export default HomePage