import React from 'react';  
import { FaFileAlt, FaDoorOpen, FaUserGraduate } from 'react-icons/fa';  
import styles from "../CategoriaDocente/docente.module.css";  

function App() {  
  return (  
    <div className={styles.container}>  
      <div className={styles.banner}>  
        <h1>SENAI</h1>  
      </div>  
      <h2>Categorias</h2>  
      <div className={styles.cardsBackground}>  
        <div className={styles.grid}>  
          <div className={`${styles.card} ${styles.active}`}>  
            <FaFileAlt className={styles.icon} />  
            <p>RVE</p>  
          </div>  
          <div className={styles.card}>  
            <FaDoorOpen className={styles.icon} />  
            <p>Saída</p>  
          </div>  
          <div className={styles.card1}>  
            <FaUserGraduate className={styles.icon} />  
            <p>Usuários</p>  
          </div>  
        </div>  
      </div>  
    </div>
  );  
}  

export default App;


