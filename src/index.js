import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import SignIn from './components/sign-in/SignIn';  // Atualize o caminho aqui
import reportWebVitals from './reportWebVitals';
import SignUp from "./components/sign-up/SignUp";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </Router>
    </React.StrictMode>
);

reportWebVitals();
