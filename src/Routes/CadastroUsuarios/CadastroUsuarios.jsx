import React, { useState, useEffect } from 'react';
import { CriarUser, AtualizaUser } from '../../Data/server';
import styles from './user.module.css';
import { useNavigate, useLocation } from 'react-router-dom';

const CadastroUsuarios = () => {
    const [nif, setNif] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [telefone, setTelefone] = useState('');
    const [tipo, setTipo] = useState('');
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const userToEdit = location.state?.user || null;

    useEffect(() => {
        if (userToEdit) {
            setNif(userToEdit.nif);
            setNome(userToEdit.nome);
            setEmail(userToEdit.email);
            setSenha(userToEdit.senha);
            setTelefone(userToEdit.telefone);
            setTipo(userToEdit.tipo);
        }
    }, [userToEdit]);

    const handleCadastro = async (e) => {
        e.preventDefault();
        try {
            if (userToEdit) {
                await AtualizaUser(nif, {  nome, email, senha, telefone, tipo });
                setMessage('Usuário atualizado com sucesso!');
            } else {
                await CriarUser({ nif, nome, email, senha, telefone, tipo });
                setMessage('Usuário cadastrado com sucesso!');
            }
            // Limpar os inputs
            setNif('');
            setNome('');
            setEmail('');
            setSenha('');
            setTelefone('');
            setTipo('');
            navigate('/ListaUsers');
        } catch (error) {
            console.error('Erro ao cadastrar/atualizar usuário:', error);
            setMessage('Erro ao cadastrar/atualizar usuário.');
        }
        setTimeout(() => {
            setMessage('');
        }, 3000); // Limpa a mensagem após 3 segundos
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const formatTelefone = (value) => {
        value = value.replace(/\D/g, ''); // Remove caracteres não numéricos
        if (value.length > 2) {
            value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        }
        if (value.length > 10) {
            value = `${value.slice(0, 9)}-${value.slice(9)}`;
        }
        return value.slice(0, 15); // Limita ao tamanho máximo do formato
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{userToEdit ? 'Editar Usuário' : 'Cadastro de Usuários'}</h1>
            <form className={styles.form} onSubmit={handleCadastro}>
                <input
                    type="text"
                    placeholder="NIF"
                    value={nif}
                    onChange={(e) => {
                        // Filtra para garantir que apenas números sejam digitados
                        const value = e.target.value.replace(/\D/g, '').slice(0, 9); // Remove caracteres não numéricos e limita a 9
                        setNif(value);
                      }}
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
                        onChange={(e) => {
                            // Filtra para garantir que apenas números sejam digitados
                            const value = e.target.value.replace(/\D/g, '').slice(0, 8); // Remove caracteres não numéricos e limita a 9
                            setSenha(value);
                          }}
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
                    onChange={(e) => setTelefone(formatTelefone(e.target.value))}
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
                    {userToEdit ? 'Atualizar' : 'Cadastrar'}
                </button>
                {message && <p className={styles.message}>{message}</p>}
            </form>
        </div>
    );
};

export default CadastroUsuarios;
