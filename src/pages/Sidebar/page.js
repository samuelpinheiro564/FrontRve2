import React, { useState } from "react";
import "./styles.modules.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={toggleSidebar} className='toggleButton'>
        {isOpen ? "Fechar Menu" : "Abrir Menu"}
      </button>
      <div className={`${"sidebar"} ${isOpen ? "open" : ""}`}>
        <h2>Menu</h2>
        <ul>
          <li>
            <a href="/pages/Atestado/page.js">Atestado</a>
          </li>
          <li>
            <a href="/pages/CadastroUsuarios/page.js">Cadastro de Usuários</a>
          </li>
          <li>
            <a href="/pages/CategoriaAdmin/page.js">Categoria Admin</a>
          </li>
          <li>
            <a href="/pages/CategoriaDocente/page.js">Categoria Docente</a>
          </li>
          <li>
            <a href="/pages/Login.js">Login</a>
          </li>
          <li>
            <a href="/pages/NotificaçãoSec/page.js">Notificação Sec</a>
          </li>
          <li>
            <a href="/pages/Rve/page.js">Rve</a>
          </li>
          <li>
            <a href="/pages/Saida/page.js">Saída</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
