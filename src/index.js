import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Saida from "../src/Routes/Saida/page";
import Rve from "../src/Routes/Rve/Rve";
import Login from '../src/Routes/Login/Login';
import SaidaProfessor from "../src/Routes/saidaProfessor/page";
import CategoriaAdmin from './Routes/CategoriaAdmin/page';
// import CadastroUsuarios from '../src/Routes/CadastroUsuarios/CadastroUsuarios';
import AlunoAdm from "../src/Routes/alunosAdm/alunosAdm";
import CategoriDocente from "../src/Routes/CategoriaDocente/page";
import ErrorPage from './Routes/ErrorPage';

function App() {
  return (
    <div className="App">
      <Navbar />
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
        path: "CategoriDocente",
        element: <CategoriDocente />,
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
