import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home")
    }
    else {
      navigate("/")
    }
  }, [])

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "12345") {
      var randomToken = function () {
        return Math.random().toString(36).substr(2);
      };
      var token = function () {
        return randomToken() + randomToken() + randomToken();
      };
      const userToken = token()
      localStorage.setItem("token", userToken)
      navigate('/home');
    }
  }

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default Login