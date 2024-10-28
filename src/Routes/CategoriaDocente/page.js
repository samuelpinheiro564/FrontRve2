import React from 'react';  
import { FaFileAlt, FaDoorOpen, FaUserGraduate } from 'react-icons/fa';  
import styles from "../CategoriaDocente/docente.module.css";

function App() {  
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>SENAI</h1>
      </header>
      <div className={styles.container}>
        <div className={styles.card}>
          <FaFileAlt className={styles.icon} />
          <h2>RVE</h2>
        </div>
        <div className={styles.card}>
          <FaDoorOpen className={styles.icon} />
          <h2>Saída</h2>
        </div>
        <div className={styles.card}>
          <FaUserGraduate className={styles.icon} />
          <h2>Alunos</h2>
        </div>
      </div>
    </div>
  );  
}  

export default App;
