import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginForm = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Please enter both username and password.');
            return;
          }
          login(username, password);
    };

    const login = async (username: string, password: string) => {
        try {
          const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
          });
      
          if (!response.ok) {
            // Handle server errors and invalid credentials
            const errorData = await response.json();
            setError(errorData.error || 'An error occured during login.');
            return;
          }
      
          // Login successful
          const data = await response.json();

          // Extracting token and ID
          const { token: authToken, userId: userId } = data;
          
          // Saving token to local storage
          localStorage.setItem("tm-auth-token", JSON.stringify(authToken));
          localStorage.setItem("tm-user-id", JSON.stringify(userId));
          localStorage.setItem("tm-username", JSON.stringify(username));

          setError('');
          toast.success('Login successful!');

          return navigate('/');

        } catch (error: any) {
          // Handle network errors or other exceptions
          console.error('Login failed:', error.message);
          throw error;
        }
      };

      const register = async () => {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        
        if (!response.ok) {
            // Handle server errors
            const errorData = await response.json();
            toast.error(errorData.error || 'An error occured during registration.');
            return;
        }
        toast.success('User created successfully!');
        
        return;
      };

  return (
    <form onSubmit={handleSubmit} className="w-64 mx-auto mt-8 p-4 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label htmlFor="username" className="block mb-1">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block mb-1">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md">Login</button>
      <div className="mt-5 mb-5 ">No account?</div>
      <button type="button" onClick={ register } className="w-full bg-blue-700 text-white font-semibold py-2 rounded-md">Register</button>
    </form>
  )
}

export default LoginForm