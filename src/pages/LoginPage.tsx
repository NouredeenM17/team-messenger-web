import LoginForm from "../components/LoginForm"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem("tm-auth-token");

    // If user is already logged in, redirect to homepage
    useEffect(() => {
        if (token){
            return navigate('/');
        }
      }, []);

  return (
    <>
        <div className="mx-auto w-64 mt-8 text-3xl font-bold">Welcome</div>
        <LoginForm />
    </>
  )
}

export default LoginPage