import React, { useEffect, useState } from 'react';
import { LoginUser } from '../../Data/server';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [userType, setUserType] = useState('');
    const [Nif, setNif] = useState('');
    const [userNotPassword, setUserNotPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            const userData = await LoginUser(Nif);
            console.log('Dados do usuário:', userData);
            alert('Logado com sucesso');
        } catch (error) {
            setErrorMessage('Erro ao tentar fazer login. Verifique as credenciais.');
            console.error('Erro na autenticação:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (userType === 'aluno' || userType === 'secretaria') {
            console.log('Não precisa de senha');
            setUserNotPassword(true);
        } else if (userType === 'docente' || userType === 'admin') {
            console.log('Precisa de senha');
            setUserNotPassword(false);
        }
    }, [userType]);

    const handleEnviar = (e) => {
        e.preventDefault(); // Prevent form submission
        if (userNotPassword === false) {
            handleLogin();
        } else {
            alert(`Logado com sucesso sem senha`);
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='container'>
            <header className='header'>
                <h1 className='title'>Login</h1>
            </header>
            <form className='form' onSubmit={handleEnviar}>
                {userNotPassword ? (
                    <>
                        <select
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                            required
                            className='input'
                        >
                            <option value="" disabled>Tipo de Usuario</option>
                            <option value="aluno">Aluno</option>
                            <option value="secretaria">Secretaria</option>
                            <option value="docente">Docente</option>
                            <option value="admin">Administrador</option>
                        </select>
                        <button type="submit" className='button'>
                            Entrar
                        </button>
                    </>
                ) : (
                    <>
                        <input
                            type="text"
                            placeholder="Nome"
                            required
                            className='input'
                            maxLength={50}
                        />
                        <select
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                            required
                            className='input'
                        >
                            <option value="" disabled>Tipo de Usuario Administrador</option>
                            <option value="admin">Administrador</option>
                            <option value="aluno">Aluno</option>
                            <option value="docente">Docente</option>
                            <option value="secretaria">Secretaria</option>
                        </select>
                        <input
                            type="email"
                            placeholder="Email"
                            required
                            className='input'
                            maxLength={100}
                        />
                        <input
                            type="number"
                            placeholder="Nif"
                            required
                            className='input'
                            maxLength={9}
                            value={Nif}
                            onChange={(e) => setNif(e.target.value)}
                        />
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Senha"
                                required
                                className='input'
                                maxLength={50}
                            />
                            <span
                                onClick={toggleShowPassword}
                                style={{
                                    position: 'absolute',
                                    right: 10,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    cursor: 'pointer'
                                }}
                            >
                                {showPassword ? '🙈' : '👁️'}
                            </span>
                        </div>
                        <button
                            type="submit"
                            className='button'
                            disabled={isLoading}
                        >
                            {isLoading ? 'Entrando...' : 'Entrar'}
                        </button>
                        {errorMessage && <p className='error'>{errorMessage}</p>}
                    </>
                )}
            </form>
        </div>
    );
};

export default Login;