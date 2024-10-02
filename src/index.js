import React from 'react';
import ReactDOM from 'react-dom';
import Login from './pages/Login/page';
import CadastroUsuarios from './pages/CadastroUsuarios/page';
import Atestado from './pages/Atestado/page';
import CategoriaDocente from './pages/CategoriaDocente/page';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CategoriaDocente />
    <CadastroUsuarios />
    <Login />
    <Atestado />
  </React.StrictMode>
);
