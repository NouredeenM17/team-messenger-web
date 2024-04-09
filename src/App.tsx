import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout';
import ChatroomPage from './pages/ChatroomPage';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element = {<MainLayout />}>
          <Route path='/' index element={<HomePage />} />
          <Route path='/room' index element={<ChatroomPage />} />
        </Route>
        
        <Route path='/login' element={<LoginPage />} />
      </>
    )
  );

  return <RouterProvider router={router}/>
}

export default App