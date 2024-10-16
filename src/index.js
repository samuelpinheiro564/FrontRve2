import React from 'react';
import ReactDOM from 'react-dom';

// import CadastroUsuarios from '../src/pages/CadastroUsuarios/CadastroUsuarios' 
import UserList from '../src/components/UserList';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

     {/* <CadastroUsuarios />  */}
     <UserList />
  </React.StrictMode>
);
