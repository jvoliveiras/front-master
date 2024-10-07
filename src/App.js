import logo from './logo.svg';
import './App.css';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/signin');
  })
  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
          >
          </a>
        </header>
      </div>
  );
}

export default App;
