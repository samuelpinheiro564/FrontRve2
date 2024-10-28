import React from 'react';  
import { FaFileAlt, FaDoorOpen } from 'react-icons/fa';  
import './styles.modules.css';  

function App() {  
  return (
    <div>
      <div className="app">
        <header className="header">
          <h1>SENAI</h1>
        </header>
        <div className="container">
          <div className="card">
            <FaFileAlt className="icon" />
            <h2>RVE</h2>
          </div>
          <div className="card">
            <FaDoorOpen className="icon" />
            <h2>Saída</h2>
          </div>
        </div>
      </div>
    </div>
  );  
}  

export default App;