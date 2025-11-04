import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from './Component/Navbar';
import SignIn from './Component/SignIn';
import LoginIn from './Component/LoginIn';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/login" element={<LoginIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
