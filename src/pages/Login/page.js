import React, { useState } from 'react';
import styles from './styles.modules.css';

const LoginAdim = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [userType, setUserType] = useState('');

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Login</h1>
            </header>
            <form className={styles.form}>
                <input
                    type="text"
                    placeholder="Nome"
                    required
                    className={styles.input}
                    maxLength={50}
                />
                <select
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                    required
                    className={styles.input} // Classe CSS para select
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
                    className={styles.input}
                    maxLength={100}
                />
                <input
                    type="number"
                    placeholder="Nif"
                    required
                    className={styles.input}
                    maxLength={9}
                />
                <div style={{ position: 'relative' }}>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Senha"
                        required
                        className={styles.input}
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
                    className={styles.button}
                >
                    Entrar
                </button>
            </form>
        </div>
    );
};

export default LoginAdim;