import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' index element={<LoginPage />} />
    )
  );

  return <RouterProvider router={router}/>
}

export default App