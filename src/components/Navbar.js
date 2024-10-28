import React from 'react';  
import { NavLink } from 'react-router-dom';  
import './Navbar.css'; // opcional para estilos  

const NavBar = () => {  
  return (  
    <nav>  
      <ul>  
        <li>  
          <NavLink to="/SuasRve" activeClassName="active">Suas RVE</NavLink>  
        </li>  
        <li>  
          <NavLink to="/Saida" activeClassName="active">Saída</NavLink>  
        </li>  
        <li>  
          <NavLink to="/Rve" activeClassName="active">RVE</NavLink>  
        </li>  
        <li>  
          <NavLink to="/CategoriaDocente" activeClassName="active">Categoria Docente</NavLink>  
        </li>  
        <li>  
          <NavLink to="/CategoriaAdmin" activeClassName="active">Categoria Admin</NavLink>  
        </li> 
        <li>  
          <NavLink to="/CadastroUsuarios" activeClassName="active">Cadastro Users</NavLink>  
        </li>   
        <li>  
          <NavLink to="/NotificacaoSec" activeClassName="active">Notificação Sec</NavLink>  
        </li>  
      </ul>  
    </nav>  
  );  
};  
export default NavBar;