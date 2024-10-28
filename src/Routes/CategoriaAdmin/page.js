import React from "react";
import styles from "../CategoriaAdmin/admin.module.css"; 

const CategoriaAdmin = () => {
  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <h1>SENAI</h1>
      </div>
      <h2>Categorias</h2>
      <div className={styles.cardsBackground}>
        <div className={styles.grid}>
          <div className={`${styles.card} ${styles.active}`}>
            <i className={styles.icon}>📝</i>
            <p>RVE</p>
          </div>
          <div className={styles.card}>
            <i className={styles.icon}>📤</i>
            <p>Saída</p>
          </div>
          <div className={styles.card1}>
            <i className={styles.icon}>👥</i>
            <p>Usuários</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriaAdmin;
