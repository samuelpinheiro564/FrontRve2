import React, { useState, useEffect, useRef } from 'react';  
import { NavLink } from 'react-router-dom';  
import './Navbar.css';  

const NavBar = () => {  
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleLinkClick = () => {
    setMenuVisible(false);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuVisible(false);
    }
  };

  useEffect(() => {
    if (menuVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuVisible]);

  return (  
    <div ref={menuRef}>
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