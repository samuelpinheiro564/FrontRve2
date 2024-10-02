import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import Login from './pages/Login/page';
// import CadastroUsuarios from './pages/CadastroUsuarios/page.js';
import Atestado from './pages/Atestado/page';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Atestado />
    {/* <CadastroUsuarios /> */}
    {/* <Login /> */}
  </React.StrictMode>
);
