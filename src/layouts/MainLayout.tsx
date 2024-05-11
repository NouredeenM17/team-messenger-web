import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar';
import 'react-toastify/dist/ReactToastify.css'

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default MainLayout