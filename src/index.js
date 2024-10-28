import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

import Navbar from "./components/Navbar";
import Saida from "./Routes/Saida/page";
import Rve from "./Routes/Rve/Rve";
import Login from './Routes/Login/Login';
import SaidaProfessor from "./Routes/saidaProfessor/page";
import CategoriaAdmin from './Routes/CategoriaAdmin/page';
import AlunosAdm from "./Routes/AlunosAdm/AlunosAdm";
import CategoriaDocente from "./Routes/CategoriaDocente/page";
import ErrorPage from './Routes/ErrorPage';
import './index.css';

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
      {
        path: "CategoriaDocente",
        element: <CategoriaDocente />,
      },
      {
        path: "CategoriaAdmin",
        element: <CategoriaAdmin />,
      },
      {
        path: "AlunosAdm",
        element: <AlunosAdm />,
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
