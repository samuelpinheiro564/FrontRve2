import React from 'react';  
import styles from "../CategoriaDocente/docente.module.css";  
import { NavLink } from 'react-router-dom';


function App() {  
  return (  
    <div className={styles.container}>  

      <div className={styles.banner}>  
        <h1>SENAI</h1>  
      </div>  
      <div className={styles.cardsBackground}>  
        <div className={styles.grid}>  
          <div className={`${styles.card} ${styles.active}`}>
            <NavLink to="/Rve" activeClassName={styles.active}>  
          <i className={styles.icon}>📝</i>  
            <p>RVE</p>  
           </NavLink>
          </div>  
          <NavLink to="/Saida" activeClassName={styles.active}>
          <div className={styles.card}>  
          <i className={styles.icon}>📤</i> 
            <p>Saída</p>  
          </div>  
          </NavLink>
          <NavLink to="/HistoricoSaida" activeClassName={styles.active}>
          <div className={styles.card1}>  
          <i className={styles.icon}>📃</i>
            <p>Historico de Saidas</p>  
          </div>  
          </NavLink> 
          <NavLink to="/SuasRve" activeClassName={styles.active}>
          <div className={styles.card2}>  
          <i className={styles.icon}>📂</i>
            <p>Suas Rves</p>  
          </div>  
          </NavLink>
         
        </div>  
      </div>  
    </div>
  );  
}  

export default App;


