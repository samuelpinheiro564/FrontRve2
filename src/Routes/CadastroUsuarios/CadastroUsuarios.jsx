import React, { useState, useEffect } from 'react';
import { CriarUser, AllUsers, AtualizaUser, DeleteUser } from '../../Data/server';
import styles from '../CadastroUsuarios/user.module.css';

const CadastroUsuarios = () => {
    const [form, setForm] = useState({
        nif: '',
        nome: '',
        email: '',
        senha: '',
        telefone: '',
        tipo: ''
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const fetchAllUsers = async () => {
        try {
            const allUsers = await AllUsers();
            setUsers(allUsers);
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({ ...prevForm, [name]: value }));
    };

    const handleCadastro = async (e) => {
        e.preventDefault();
        const usersList = await AllUsers();
        const res = usersList.find(user => user.nif === form.nif);
        if (!editingUser && res) {
            setError('O campo NIF já existe');
            setTimeout(() => setError(''), 3000);
            return;
        }
        try {
            if (editingUser) {
                await AtualizaUser({ ...form, nif: editingUser.nif });
                setSuccessMessage('Usuário editado com sucesso');
            } else {
                await CriarUser(form);
                setSuccessMessage('Usuário cadastrado com sucesso');
            }
            fetchAllUsers();
            limparCampos();
            setError('');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            console.error('Erro ao salvar usuário:', error);
            setError('Erro ao cadastrar/editar usuário.');
            setTimeout(() => setError(''), 3000);
        }
    };

    const limparCampos = () => {
        setForm({
            nif: '',
            nome: '',
            email: '',
            senha: '',
            telefone: '',
            tipo: ''
        });
        setEditingUser(null);
    };

    const handleEditUser = (user) => {
        setForm(user);
        setEditingUser(user);
    };

    const handleDeleteUser = async (nif) => {
        try {
            await DeleteUser(nif);
            setSuccessMessage('Usuário deletado com sucesso');
            fetchAllUsers();
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
            setError('Erro ao deletar usuário.');
            setTimeout(() => setError(''), 3000);
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(prevShowPassword => !prevShowPassword);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Cadastro de Usuários</h1>
            <form className={styles.form} onSubmit={handleCadastro}>
                <div className={styles.formGroup}>
                    <label htmlFor="number" className={styles.label}>NIF:</label>
                    <input type="number" id="nif" name="nif" value={form.nif} onChange={handleInputChange} className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="nome" className={styles.label}>Nome:</label>
                    <input type="text" id="nome" name="nome" value={form.nome} onChange={handleInputChange} className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>Email:</label>
                    <input type="email" id="email" name="email" value={form.email} onChange={handleInputChange} className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="senha" className={styles.label}>Senha:</label>
                    <input type={showPassword ? "text" : "password"} id="senha" name="senha" value={form.senha} onChange={handleInputChange} className={styles.input} />
                    <span onClick={toggleShowPassword} className={styles.togglePassword}>{showPassword ? '🙈' : '👁️'}</span>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="telefone" className={styles.label}>Telefone:</label>
                    <input type="tel" id="telefone" name="telefone" value={form.telefone} onChange={handleInputChange} className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="tipo" className={styles.label}>Tipo:</label>
                    <input type="text" id="tipo" name="tipo" value={form.tipo} onChange={handleInputChange} className={styles.input} />
                </div>
                {error && <p className={styles.error}>{error}</p>}
                {successMessage && <p className={styles.success}>{successMessage}</p>}
                <button type="submit" className={styles.button}>{editingUser ? 'Salvar Alterações' : 'Cadastrar'}</button>
            </form>

            {users.length > 0 && (
                <div className={styles.userList}>
                    <h2>Lista de Usuários</h2>
                    <ul>
                        {users.map(user => (
                            <li key={user.nif} className={styles.userItem}>
                                <p><strong>NIF:</strong> {user.nif}</p>
                                <p><strong>Nome:</strong> {user.nome}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Telefone:</strong> {user.telefone}</p>
                                <p><strong>Tipo:</strong> {user.tipo}</p>
                                <button onClick={() => handleEditUser(user)} className={styles.editButton}>Editar</button>
                                <button onClick={() => handleDeleteUser(user.nif)} className={styles.deleteButton}>Deletar</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CadastroUsuarios;