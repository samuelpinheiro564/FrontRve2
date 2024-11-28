import React, { useEffect, useState } from 'react';  
import { LoginUser } from '../../Data/server';  
import userData from '../../Data/dadosUser';  
import { useNavigate } from 'react-router-dom'; 


import styles from '../Login/login.module.css';

const Login = () => {
  const navigate = useNavigate();  // Inicializa o hook useNavigate  
  const [showPassword, setShowPassword] = useState(false);  
  const [userType, setUserType] = useState("");  
  const [Nif, setNif] = useState("");  
  const [senha, setPassword] = useState("");
  const [userNotPassword, setUserNotPassword] = useState(false);  
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);  
  const [dados, setDados] = useState([]);  

  const handleLogin = async () => {  
    setIsLoading(true);  
    try {  
      const data = await LoginUser(Nif,senha);  
      console.log('Dados do usuário:', data);  
      userData.addUser(data);  
      setDados(data);  
      console.log('Dados do usuário:', dados);  
      alert('Logado com sucesso');  
      
      // Navegação para a categoria apropriada após o login  
      switch (userType) {  
        case 'admin':  
          navigate('/CategoriaAdmin');  
          break;  
        case 'docente':  
          navigate('/CategoriaDocente');  
          break;  
        case 'secretaria':  
          navigate('/NotificacaoSec');  
          break;  
        default:  
          console.error('Tipo de usuário desconhecido:', userType);  
      }  
      
    } catch (error) {  
      setMessage('Erro ao tentar fazer login. Verifique as credenciais.');  
      console.error('Erro na autenticação:', error);  
    } finally {  
      setIsLoading(false);  
    }  
  };  

  useEffect(() => {  
    if (userType === "secretaria") {  
      console.log("Não precisa de senha");  
      setUserNotPassword(true);  
    } else if (userType === "docente" || userType === "admin") {  
      console.log("Precisa de senha");  
      setUserNotPassword(false);  
    }  
  }, [userType]);  

  const handleEnviar = (e) => {  
    e.preventDefault(); // Prevent form submission  

    if (userNotPassword === false) {  
      handleLogin(); // Chama a função de login  
    } else {  
      alert(`Logado com sucesso sem senha`);  
      handleLogin(); // Adiciona esta chamada para lidar com a situação sem senha  
    }  
  };  

  const toggleShowPassword = () => {  
    setShowPassword(!showPassword);  
  };  

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Login</h1>
      </header>
      <form className={styles.form} onSubmit={handleEnviar}>
        {userNotPassword ? (
          <>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              required
              className={styles.input}
            >
              <option value="" disabled>
                Tipo de Usuario
              </option>
              <option value="secretaria">Secretaria</option>
              <option value="docente">Docente</option>
              <option value="admin">Administrador</option>
            </select>
        
            <button type="submit" className={styles.button}>
              Entrar
            </button>
          </>
        ) : (
          <>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              required
              className={styles.input}
            >
              <option value="" disabled>
                Tipo de Usuario Administrador
              </option>
              <option value="admin">Administrador</option>
              <option value="docente">Docente</option>
              <option value="secretaria">Secretaria</option>
            </select>
            <input
              type="number"
              placeholder="Nif"
              required
              className={styles.input}
              maxLength={9}
              value={Nif}
              onChange={(e) => setNif(e.target.value)}
            />
            <div className={styles.passwordContainer}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                required
                className={styles.input}
                maxLength={50}
                value={senha}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                onClick={toggleShowPassword}
                className={styles.togglePassword}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
            <button type="submit" className={styles.button} disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar"}
            </button>
            {message && <p className={styles.error}>{message}</p>}
          </>
        )}
      </form>
    </div>
  );
};

export default Login;
