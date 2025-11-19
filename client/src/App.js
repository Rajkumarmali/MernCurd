import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from './Component/Navbar';
import SignIn from './Component/SignIn';
import LoginIn from './Component/LoginIn';
import Student from './Component/Student';
import Profile from './Component/Profile';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/login" element={<LoginIn />} />
        <Route path='/student' element={<Student />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
