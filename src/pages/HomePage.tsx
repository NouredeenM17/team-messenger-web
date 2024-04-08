import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
  
    return (
        <>
            <div>Welcome user: { userId }</div>
            <div onClick={ logout }>Logout</div>
        </>
    
  )
}

export default HomePage