import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const NavBar = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [userType, setUserType] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    // Recupera o tipo de usuário do localStorage
    const storedUserType = localStorage.getItem('userType');
    setUserType(storedUserType);
  }, []);

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

  // Menus dinâmicos para cada tipo de usuário
  const getMenuItems = () => {
    switch (userType) {
      case 'admin':
        return [
          {label:'Saida', to:'/Saida'},
          {label:'Rve', to:'/Rve'},
          {label:'Suas RVE', to:'/SuasRve'},
          {label:'Cadastro Usuarios', to:'/CadastroUsuarios'},
          { label: 'Notificação Secretaria', to: '/NotificacaoSec' },
          { label: 'Histórico de Saída', to: '/HistoricoSaida' },
        ];
      case 'docente':
        return [
          { label: 'Suas RVE', to: '/SuasRve' },
          { label: 'Saída', to: '/Saida' },
          { label: 'RVE', to: '/Rve' },
          {label:'Histórico de Saída', to:'/HistoricoSaida'} 
        ];
      case 'secretaria':
        return [
          { label: 'Notificação Secretaria', to: '/NotificacaoSec' },
          { label: 'Histórico de Saída', to: '/HistoricoSaida' },
        ];
      default:
        return []; // Caso nenhum `userType` seja encontrado
    }
  };

  const menuItems = getMenuItems();

  return (
    <div ref={menuRef}>
      <button onClick={toggleMenu} className="menu-icon">
        &#9776; 
      </button>
      {menuVisible && (
        <nav>
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.to}
                  activeClassName="active"
                  onClick={handleLinkClick}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default NavBar;
