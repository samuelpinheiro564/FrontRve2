
import React from 'react';  
import './styles.modules.css'; // Import the CSS file for styling  



const alunosAdm = () => {  
  return (  
    <div className="container">  
      <header className="header">  
        <h1>SENAI</h1>  
      </header>  
      <div className="search-bar">  
        <input type="text" placeholder="🔍 Search..." />  
      </div>  
      <div className="button-container">  
        <button>Mecanica</button>  
        <button>TDS1</button>  
        <button>TDS2</button>  
        <button>TE1</button>  
        <button>TE2</button>  
        <button>ADM</button>  
      </div>  
      <div className="not-found">  
        <h2>Não encontrado</h2>  
      </div>  
    </div>  
  );  
};  


export default alunosAdm;