import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/")
    }
    else {
      navigate("/home")
    }
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    navigate('/');
  };

  return (
    <div>
      <h2>Home Page</h2>
      <img src='https://st2.depositphotos.com/3591429/12552/i/450/depositphotos_125524360-stock-photo-diversity-friends-near-wall-with.jpg' />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
