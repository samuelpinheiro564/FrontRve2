import React, { useState } from 'react';
import { CriarUser } from '../../Data/server';
import styles from './user.module.css';

const CadastroUsuarios = () => {
    const [nif, setNif] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [telefone, setTelefone] = useState('');
    const [tipo, setTipo] = useState('');
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleCadastro = async (e) => {
        e.preventDefault();
        try {
            await CriarUser({ nif, nome, email, senha, telefone, tipo });
            setMessage('Usuário cadastrado com sucesso!');
            // Limpar os inputs
            setNif('');
            setNome('');
            setEmail('');
            setSenha('');
            setTelefone('');
            setTipo('');
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            setMessage('Erro ao cadastrar usuário.');
        }
        setTimeout(() => {
            setMessage('');
        }, 3000); // Limpa a mensagem após 3 segundos
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Cadastro de Usuários</h1>
            <form className={styles.form} onSubmit={handleCadastro}>
                <input
                    type="text"
                    placeholder="NIF"
                    value={nif}
                    onChange={(e) => setNif(e.target.value)}
                    required
                    className={styles.input}
                />
                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                    className={styles.input}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={styles.input}
                />
                <div className={styles.passwordContainer}>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                        className={styles.input}
                    />
                    <span
                        onClick={togglePasswordVisibility}
                        className={styles.passwordToggle}
                    >
                        {showPassword ? '🙈' : '👁️'}
                    </span>
                </div>
                <input
                    type="text"
                    placeholder="Telefone"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    required
                    className={styles.input}
                />
                <select
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
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
                <button type="submit" className={styles.button}>
                    Cadastrar
                </button>
                {message && <p className={styles.message}>{message}</p>}
            </form>
        </div>
    );
};

export default CadastroUsuarios;
