import React, { useEffect, useState } from 'react';
import './styles.css';
import {LoginUser} from '../../server/server';	

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [userType, setUserType] = useState('');
    const  [Nif, setNif] = useState('');


    useEffect(() => {
    if(userType === 'aluno' || userType === 'secretaria' ) {
      console.log('Não precisa de senha');
    }else if(userType === 'docente' || userType === 'admin' ){
      console.log('Precisa de senha');
      LoginUser(Nif)
    }

    }, [userType,Nif]);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='container'>
            <header className='header'>
                <h1 className='title'>Login</h1>
            </header>
            <form className='form'>
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
                >
                    Entrar
                </button>
            </form>
        </div>
    );
};

export default Login;