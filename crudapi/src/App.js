import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import RegisterPage from "./components/RegisterPage";
import Navbar from "./Navbar";
import Form from "./components/Form";

export default function App() {
  return <>
    <Navbar />

    <Routes>
      <Route path="/" element={<LoginPage />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
      <Route path="/register" element={<RegisterPage />}></Route>
      <Route path="/form" element={<Form/>}></Route>
    </Routes>
  </>
}