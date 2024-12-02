import React, { useEffect, useState } from 'react';
import { LoginUser } from '../../Data/server';
import userData from '../../Data/dadosUser';
import { useNavigate } from 'react-router-dom';
import styles from '../Login/login.module.css';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState('');
  const [Nif, setNif] = useState('');
  const [senha, setPassword] = useState('');
  const [userNotPassword, setUserNotPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Função de login
  const handleLogin = async () => {
    setIsLoading(true);
    setMessage('');
    try {
      if (userType === 'secretaria') {
        localStorage.setItem('userType', userType);
        navigate('/NotificacaoSec');
      }
      const response = await LoginUser(Nif, senha);
      console.log('Resposta:', response);

      // Verifica se a resposta existe e se a requisição foi bem-sucedida
      if (response && response.status === 200) {
        console.log('200');
        const data = response.data[0];
        console.log('Data:', data);
        userData.addUser(data);
        if (data.tipo !== userType) {
          setMessage('Tipo de usuário errado.');
          return;
        } else {
          localStorage.setItem('userType', userType);
          alert('Logado com sucesso');
          // Redireciona com base no tipo de usuário
          switch (userType) {
            case 'admin':
              navigate('/CategoriaAdmin');
              break;
            case 'docente':
              navigate('/CategoriaDocente');
              break;
            case 'anaq':
              navigate('/CategoriaAdmin');
              break;
            default:
              console.error('Tipo de usuário desconhecido:', userType);
          }
        }
      } else if (response && response.status === 400) {
        console.log('400');
        setMessage('Credenciais inválidas. Verifique o NIF e a senha.');
      }
    } catch (error) {
      console.error('Erro na autenticação:', error.response);
      setMessage('Erro ao conectar com o servidor. Verifique sua conexão.');
    } finally {
      setIsLoading(false);
    }
  };

  // Alterar a visibilidade da senha
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Atualizar estado do campo senha, dependendo do tipo de usuário
  useEffect(() => {
    setUserNotPassword(userType === 'secretaria');
  }, [userType]);

  // Função para prevenir o envio do formulário
  const handleEnviar = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Login</h1>
      </header>
      <form className={styles.form} onSubmit={handleEnviar}>
        <select
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          required
          className={styles.input}
        >
          <option value="" disabled>
            Tipo de Usuário
          </option>
          <option value="admin">Administrador</option>
          <option value="docente">Docente</option>
          <option value="secretaria">Secretaria</option>
          <option value="anaq">Analista de Qualidade</option>
        </select>

        {!userNotPassword && (
          <>
            <input
              type="text"
              placeholder="Nif"
              required
              className={styles.input}
              maxLength={9}
              value={Nif}
              onChange={(e) => {
                // Filtra para garantir que apenas números sejam digitados
                const value = e.target.value.replace(/\D/g, '').slice(0, 9); // Remove caracteres não numéricos e limita a 9
                setNif(value);
              }}
            />
            <div className={styles.passwordContainer}>
              <input
                type={showPassword ? 'text' : 'password'}
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
                {showPassword ? '🙈' : '👁️'}
              </span>
            </div>
          </>
        )}

        <button type="submit" className={styles.button} disabled={isLoading}>
          {isLoading ? 'Entrando...' : 'Entrar'}
        </button>
        {message && <p className={styles.error}>{message}</p>}
      </form>
    </div>
  );
};

export default Login;
