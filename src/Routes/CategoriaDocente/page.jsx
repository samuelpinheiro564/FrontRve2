import React from 'react';  
import styles from "../CategoriaDocente/docente.module.css";  
import { NavLink } from 'react-router-dom';
import userData from '../../Data/dadosUser';
import NavBar from '../../components/Navbar';


function App() {  
  const user = userData.getUsers();




  return (  
    <div className={styles.container}>  
    
      <div className={styles.banner}>  
        <h1>SENAI</h1>  
      </div>  
      <h2>Categorias</h2>  
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
          <NavLink to="/CadastroUsuarios" activeClassName={styles.active}>
          <div className={styles.card1}>  
          <i className={styles.icon}>👥</i>
            <p>Usuários</p>  
          </div>  
          </NavLink> 
          <NavLink to="/RenderSuasRve" activeClassName={styles.active}>
          <div className={styles.card2}>  
          <i className={styles.icon}>📃</i>
            <p>Render Rves</p>  
          </div>  
          </NavLink>
          <NavLink to="/NotificacaoSec" activeClassName={styles.active}>
          <div className={styles.card2}>  
          <i className={styles.icon}>📨</i>
            <p>Notificação Secretaria</p>  
          </div>  
          </NavLink>
         
        </div>  
      </div>  
    </div>
  );  
}  

export default App;


