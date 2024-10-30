import React, { useState } from 'react';  
import { NavLink } from 'react-router-dom';  
import './Navbar.css'; // opcional para estilos  

const NavBar = () => {  
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleLinkClick = () => {
    setMenuVisible(false);
  };

  return (  
    <div>
      <button onClick={toggleMenu} className="menu-icon">
        &#9776; 
      </button>
      {menuVisible && (
        <nav>  
          <ul>  
            <li>  
              <NavLink to="/SuasRve" activeClassName="active" onClick={handleLinkClick}>Suas RVE</NavLink>  
            </li>   
            <li>  
              <NavLink to="/DocentList" activeClassName="active" onClick={handleLinkClick}>DocentList</NavLink>  
            </li> 
            <li>  
              <NavLink to="/Saida" activeClassName="active" onClick={handleLinkClick}>Saída</NavLink>  
            </li>  
            <li>  
              <NavLink to="/Rve" activeClassName="active" onClick={handleLinkClick}>RVE</NavLink>  
            </li>  
            <li>  
              <NavLink to="/CategoriaDocente" activeClassName="active" onClick={handleLinkClick}>Categoria Docente</NavLink>  
            </li>  
            <li>  
              <NavLink to="/CategoriaAdmin" activeClassName="active" onClick={handleLinkClick}>Categoria Admin</NavLink>  
            </li> 
            <li>  
              <NavLink to="/CadastroUsuarios" activeClassName="active" onClick={handleLinkClick}>Cadastro Usuarios</NavLink>  
            </li>   
            <li>  
              <NavLink to="/NotificacaoSec" activeClassName="active" onClick={handleLinkClick}>Notificação Secretaria</NavLink>  
            </li>  
          </ul>  
        </nav>
      )}
    </div>
  );  
};  

export default NavBar;