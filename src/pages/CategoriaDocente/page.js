import React from 'react';  
import { FaFileAlt, FaDoorOpen, FaUserGraduate } from 'react-icons/fa';  
import '../CategoriaDocente/styles.modules.css';  

function App() {  
  return (  
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
        <div className="card">  
          <FaUserGraduate className="icon" />  
          <h2>Alunos</h2>  
        </div>  
      </div>  
    </div>  
  );  
}  

export default App;