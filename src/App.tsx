import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/'>
        <Route path='/' index element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router}/>
}

export default App