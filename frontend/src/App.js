import "./App.css";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import TradeHistory from "./pages/TradeHistory";
import AdminDashboard from "./pages/AdminDashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import Profile from "./pages/Profile";




function App() {
  return (
    <BrowserRouter>


      <Routes>
        {/* Home page with Signup/Login cards */}
        <Route path="/" element={<Home />} />

        {/* Auth routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* User pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<TradeHistory />} />

        {/* Admin panel */}
        <Route path="/admin" element={<AdminDashboard />} />
         

{/* other routes */}
  <Route path="/profile" element={<Profile />} />
        
      </Routes>
    </BrowserRouter>





    
  );
}

export default App;
