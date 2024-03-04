// app.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'; // Import the CSS file

import Home from './components/Home.component';
import Login from './components/Login.component'; 
import Register from './components/Register.component';
import SlotAvailability from './components/SlotAvailability.component';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} /> {/* Route for home page */}
                <Route path="/login" element={<Login />} /> {/* Route for login page */}
                <Route path="/register" element={<Register />} /> {/* Route for login page */}
                <Route path="/slotavailability" element={<SlotAvailability />} /> {/* Route for login page */}
            </Routes>
        </Router>
    );
}

export default App;
