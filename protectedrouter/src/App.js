import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (

      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={<ProtectedRoute Component={Home}/>}/>
      </Routes>

  );
}

export default App;
