import React, { useState, useEffect } from "react";
import {
    CriarUser,
    AllUsers,
    AtualizaUser,
    DeleteUser,
} from "../../Data/server";
import styles from "../CadastroUsuarios/user.module.css";

const CadastroUsuarios = () => {
    const [form, setForm] = useState({
        nif: "",
        nome: "",
        email: "",
        senha: "",
        telefone: "",
        tipo: "",
    });
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [showUserList, setShowUserList] = useState(false);

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const fetchAllUsers = async () => {
        try {
            const users = await AllUsers();
            setUsers(users);
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    const toggleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleCadastro = async (e) => {
        e.preventDefault();
        if (!editingUser) {
            const res = users.find((user) => user.nif === form.nif);
            if (res) {
                setError("O campo NIF já existe");
                setTimeout(() => setError(""), 3000);
                return;
            }
        }
        try {
            if (editingUser) {
                await AtualizaUser({ ...form, nif: editingUser.nif });
                setSuccessMessage("Usuário editado com sucesso");
            } else {
                await CriarUser(form);
                setSuccessMessage("Usuário cadastrado com sucesso");
            }
            fetchAllUsers();
            limparCampos();
            setError("");
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (error) {
            console.error("Erro ao salvar usuário:", error);
            setError("Erro ao cadastrar/editar usuário.");
            setTimeout(() => setError(""), 3000);
        }
    };

    const limparCampos = () => {
        setForm({
            nif: "",
            nome: "",
            email: "",
            senha: "",
            telefone: "",
            tipo: "",
        });
        setEditingUser(null);
    };

    const handleViewUsers = () => {
        setShowUserList(true);
    };

    const handleEditUser = (user) => {
        setForm(user);
        setEditingUser(user);
        setShowUserList(false);
    };

    const handleDeleteUser = async (nif) => {
        try {
            await DeleteUser(nif);
            setSuccessMessage("Usuário deletado com sucesso");
            fetchAllUsers();
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (error) {
            console.error("Erro ao deletar usuário:", error);
            setError("Erro ao deletar usuário.");
            setTimeout(() => setError(""), 3000);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Cadastro de Usuários</h1>
            {!showUserList && (
                <form className={styles.form} onSubmit={handleCadastro}>
                    <div className={styles.formGroup}>
                        <label htmlFor="nif" className={styles.label}>
                            NIF:
                        </label>
                        <input
                            type="number"
                            id="nif"
                            name="nif"
                            value={form.nif}
                            onChange={handleInputChange}
                            className={styles.input}
                            disabled={!!editingUser}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="nome" className={styles.label}>
                            Nome:
                        </label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            value={form.nome}
                            onChange={handleInputChange}
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.label}>
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleInputChange}
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="senha" className={styles.label}>
                            Senha:
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="senha"
                            name="senha"
                            value={form.senha}
                            onChange={handleInputChange}
                            className={styles.input}
                        />
                        <span
                            onClick={toggleShowPassword}
                            className={styles.togglePassword}
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </span>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="telefone" className={styles.label}>
                            Telefone:
                        </label>
                        <input
                            type="tel"
                            id="telefone"
                            name="telefone"
                            value={form.telefone}
                            onChange={handleInputChange}
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="tipo" className={styles.label}>
                            Tipo de Usuario:
                        </label>
                        <select
                            id="tipo"
                            name="tipo"
                            value={form.tipo}
                            onChange={handleInputChange}
                            className={styles.input}
                            required
                        >
                            <option value="" disabled>
                                Selecione o tipo de usuário
                            </option>
                            <option value="secretaria">Secretaria</option>
                            <option value="docente">Docente</option>
                            <option value="admin">Administrador</option>
                        </select>
                    </div>

                    {error && <div className={styles.error}>{error}</div>}
                    {successMessage && <div className={styles.success}>{successMessage}</div>}
                    <button type="submit" className={styles.button}>
                        {editingUser ? "Salvar Alterações" : "Cadastrar"}
                    </button>
                </form>
            )}

            {!showUserList && (
                <button onClick={handleViewUsers} className={styles.viewUsersButton}>
                    Ver Usuários
                </button>
            )}

            {showUserList && (
                <div className={styles.userList}>
                    <h2 className={styles.h21}>Lista de Usuários</h2>
                    <ul>
                        {users.map((user) => (
                            <li key={user.nif} className={styles.userItem}>
                                <p>
                                    <strong>NIF:</strong> {user.nif}
                                </p>
                                <p>
                                    <strong>Nome:</strong> {user.nome}
                                </p>
                                <p>
                                    <strong>Email:</strong> {user.email}
                                </p>
                                <p>
                                    <strong>Telefone:</strong> {user.telefone}
                                </p>
                                <p>
                                    <strong>Tipo:</strong> {user.tipo}
                                </p>
                                <button
                                    onClick={() => handleEditUser(user)}
                                    className={styles.editButton}
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDeleteUser(user.nif)}
                                    className={styles.deleteButton}
                                >
                                    Deletar
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={() => setShowUserList(false)}
                        className={styles.backButton}
                    >
                        Voltar
                    </button>
                </div>
            )}
        </div>
    );
};

export default CadastroUsuarios;
