import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet, NavLink } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Saida from "../src/Routes/Saida/page";
import Rve from "../src/Routes/Rve/Rve";
import Login from '../src/Routes/Login/Login';
import SaidaProfessor from "../src/Routes/saidaProfessor/page";
import CategoriaAdmin from './Routes/CategoriaAdmin/page';
// import CadastroUsuarios from '../src/Routes/CadastroUsuarios/CadastroUsuarios';
import AlunoAdm from "../src/Routes/alunosAdm/alunosAdm";
import CategoriaDocente from "../src/Routes/CategoriaDocente/page";
import ErrorPage from './Routes/ErrorPage';
import './index.css';

function App() {
  return (
    <div>
      <Navbar />
      <nav>
        <NavLink to="/">Login</NavLink>
        <NavLink to="/Saida">Saida</NavLink>
        <NavLink to="/Rve">Rve</NavLink>
        <NavLink to="/SaidaProfessor">Saida Professor</NavLink>
        <NavLink to="/CategoriaDocente">Categoria Docente</NavLink>
        <NavLink to="/CategoriaAdmin">Categoria Admin</NavLink>
        <NavLink to="/AlunoAdm">Aluno Adm</NavLink>
      </nav>
      <Outlet />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "Saida",
        element: <Saida />,
      },
      {
        path: "Rve",
        element: <Rve />,
      },
      {
        path: "SaidaProfessor",
        element: <SaidaProfessor />,
      },
      // {
      //   path: "CadastroUsuarios",
      //   element: <CadastroUsuarios />,
      // },
      {
        path: "CategoriaDocente",
        element: <CategoriaDocente />,
      },
      {
        path: "CategoriaAdmin",
        element: <CategoriaAdmin />,
      },
      {
        path: "AlunoAdm",
        element: <AlunoAdm />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

export default App;
