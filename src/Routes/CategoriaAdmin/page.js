import React from "react";
import "./styles.modules.css"; 

const CategoriaAdmin = () => {
  return (
    <div>
      <div className="container">
        <div className="banner">
          <h1>SENAI</h1>
        </div>
        <h2>Categorias</h2>
        <div className="cards-background">
          <div className="grid">
            <div className="card active">
              <i className="icon">📝</i>
              <p>RVE</p>
            </div>
            <div className="card">
              <i className="icon">📤</i>
              <p>Saída</p>
            </div>
            <div className="card1">
              <i className="icon">👥</i>
              <p>Usuários</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriaAdmin;
