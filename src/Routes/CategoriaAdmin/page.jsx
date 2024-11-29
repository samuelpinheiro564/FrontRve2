import React from "react";
import styles from "../CategoriaAdmin/admin.module.css";
import { NavLink } from "react-router-dom";

const CategoriaAdmin = () => {
  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <h1>SENAI</h1>
      </div>
      
      <div className={styles.cardsBackground}>
        <div className={styles.grid}>
          <NavLink to="/Rve" activeClassName={styles.active}>
            <div className={`${styles.card} ${styles.active}`}>
              <i className={styles.icon}>📝</i>
              <p>RVE</p>
            </div>
          </NavLink>
          <NavLink to="/Saida" activeClassName={styles.active}>
            <div className={styles.card}>
              <i className={styles.icon}>📤</i>
              <p>Saída</p>
            </div>
          </NavLink>
          <NavLink to="/CadastroUsuarios" activeClassName={styles.active}>
            <div className={styles.card1}>
              <i className={styles.icon}>👥</i>
              <p>Usuários</p>
            </div>
          </NavLink>
          <NavLink to="/HistoricoSaida" activeClassName={styles.active}>
            <div className={styles.card2}>
              <i className={styles.icon}>📃</i>
              <p>Historico Saida</p>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default CategoriaAdmin;