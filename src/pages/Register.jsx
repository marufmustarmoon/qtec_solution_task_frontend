import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_URL from '../config';

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthor, setIsAuthor] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data for API call
    const data = {
      username,
      password,
      isAuthor,
    };

    try {
      // Make API call
      const response = await fetch(`${API_URL}/blog/api/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Handle response as needed
      const result = await response.json();
      console.log(result);

      // After successful registration, navigate to the login page
      navigate('/login');
    } catch (error) {
      console.log("error")
      console.error('Error:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="text-gray-600">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input mt-1 block w-full border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="text-gray-600">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input mt-1 block w-full border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="isAuthor" className="flex items-center">
              <input
                type="checkbox"
                id="isAuthor"
                name="isAuthor"
                checked={isAuthor}
                onChange={(e) => setIsAuthor(e.target.checked)}
                className="mr-2"
              />
              <span className="text-gray-700">Is Author</span>
            </label>
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800 w-full"
            >
              Register
            </button>
          </div>
        </form>
        
      </div>
    </div>
  );
};

export default Register;
