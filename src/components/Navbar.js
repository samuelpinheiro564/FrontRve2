import React, { useState } from 'react';  
import { NavLink } from 'react-router-dom';  
import './Navbar.css'; // opcional para estilos  

const NavBar = () => {  
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (  
    <div>
      <button onClick={toggleMenu} className="menu-icon">
        &#9776; {/* Ícone de menu (hambúrguer) */}
      </button>
      {menuVisible && (
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
              <NavLink to="/CadastroUsuarios" activeClassName="active">Cadastro USer</NavLink>  
            </li>   
            <li>  
              <NavLink to="/NotificacaoSec" activeClassName="active">Notificação Sec</NavLink>  
            </li>  
          </ul>  
        </nav>
      )}
    </div>
  );  
};  

export default NavBar;