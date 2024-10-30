import React from 'react';  
import ReactDOM from 'react-dom/client';  
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';  
import Saida from "../src/Routes/Saida/page";  
import Rve from "../src/Routes/Rve/Rve";  
import SuasRve from "../src/Routes/SuasRve/suasRve";  
import Login from '../src/Routes/Login/Login';  
import CadastroUsuarios from '../src/Routes/CadastroUsuarios/CadastroUsuarios';
import CategoriaAdmin from './Routes/CategoriaAdmin/page';  
import CategoriaDocente from "../src/Routes/CategoriaDocente/page";  
import NotificacaoSec from "../src/Routes/NotificacaoSec/page";  
import ErrorPage from './Routes/ErrorPage';  
import { useLocation } from 'react-router-dom';  
import NavBar from '../src/components/Navbar'; // Importe o NavBar  
import DocentList from '../src/Routes/DocentList/DocentList';
import Forum from '../src/Routes/Forum/Forum';

function App() {  
  const location = useLocation(); // Obtém a localização atual  

  return (  
    <div>  
      {location.pathname !== '/DocentList' && <NavBar />} {/* Renderiza o NavBar apenas se não estiver na rota "/Login" */}  
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
        element: <Navigate to="/Login" replace />, 
      },  
      {  
        path: "Login",  
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
        path: "DocentList",  
        element: <DocentList />,  
      },  
      {  
        path: "SuasRve",  
        element: <SuasRve />,  
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
        path: "CadastroUsuarios",  
        element: <CadastroUsuarios/>,  
      },  
      {  
        path: "NotificacaoSec",  
        element: <NotificacaoSec />,  
      },  
      {  
        path: "Forum",  
        element: <Forum />,  
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