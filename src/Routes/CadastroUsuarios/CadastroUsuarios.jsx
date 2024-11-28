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

    const [formErrors, setFormErrors] = useState({
        nif: "",
        nome: "",
        email: "",
        senha: "",
        telefone: "",
        tipo: "",
    });

    const [ setSuccessMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
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

    const validateForm = () => {
        let errors = {};

        // Validação do email
        const regexEmail = /@docente\.senai$|@gmail\.com$/;
        if (!regexEmail.test(form.email)) {
            errors.email = "O email deve terminar com @docente.senai ou @gmail.com";
        }

        // Validação da senha
        const regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!regexSenha.test(form.senha)) {
            errors.senha = "A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, uma minúscula, um número e um símbolo.";
        }

        // Validação do NIF (único)
        if (!editingUser) {
            const res = users.find((user) => user.nif === form.nif);
            if (res) { // Se encontrar um usuário com o mesmo NIF
                errors.nif = "NIF já cadastrado."; // Atribui a mensagem de erro para o campo NIF
            }
        }

        // Verificação de campos obrigatórios
        Object.keys(form).forEach((field) => {
            if (!form[field] && field !== "telefone") {
                errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} é obrigatório.`;
            }
        });

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleCadastro = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            setMessage("Por favor, preencha todos os campos corretamente.");
            setTimeout(() => setMessage(""), 3000);
            return;
        }

        try {
            if (editingUser) {
                await AtualizaUser(Number(form.nif), form);
                setSuccessMessage("Usuário editado com sucesso");
            } else {
                await CriarUser(form);
                setSuccessMessage("Usuário cadastrado com sucesso");
            }
            fetchAllUsers();
            limparCampos();
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (error) {
            console.error("Erro ao salvar usuário:", error);
            setMessage("Erro nif já cadastrado.");
            setTimeout(() => setMessage(""), 3000);
        }
    };
    const usersPerPage = 5; // Quantidade de usuários por página

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

    const handleViewUsers = () => {
        setShowUserList(true);
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
    };

    const handleGoBackToForm = () => {
        setShowUserList(false);
        setCurrentPage(1);
    };

    const startIndex = (currentPage - 1) * usersPerPage;
    const paginatedUsers = users.slice(startIndex, startIndex + usersPerPage);
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
        setFormErrors({});
    };

    const handleViewUsers = () => {
        setShowUserList(true);
    };

    const handleEditUser = (user) => {
        // Formata o telefone do usuário selecionado
        const telefoneFormatado = formatarTelefone(user.telefone);
    
        // Atualiza o estado do formulário com os dados do usuário selecionado
        setForm({ ...user, telefone: telefoneFormatado });
    
        // Define o usuário em edição
        setEditingUser(user);
    
        // Fecha a lista de usuários
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
            setMessage("Erro ao deletar usuário.");
            setTimeout(() => setMessage(""), 3000);
        }
    };

    // Função para formatar o telefone
    const formatarTelefone = (telefone) => {
        return telefone
            .replace(/\D/g, "") // Remove tudo que não é número
            .replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3") // Aplica o formato (XX) XXXXX-XXXX
            .slice(0, 15); // Limita o tamanho máximo de caracteres
    };

    const handleTelefoneChange = (e) => {
        const { value } = e.target;
        const telefoneFormatado = formatarTelefone(value);
        setForm((prevForm) => ({ ...prevForm, telefone: telefoneFormatado }));
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
                            type="text"
                            id="nif"
                            name="nif"
                            value={form.nif}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "").slice(0, 9);
                                handleInputChange({ target: { name: "nif", value } });
                            }}
                            className={styles.input}
                            disabled={!!editingUser}
                        />
                        {formErrors.nif && <div className={styles.error}>{formErrors.nif}</div>}
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
                        {formErrors.nome && <div className={styles.error}>{formErrors.nome}</div>}
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
                        {formErrors.email && <div className={styles.error}>{formErrors.email}</div>}
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
                        {formErrors.senha && <div className={styles.error}>{formErrors.senha}</div>}
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
                            onChange={handleTelefoneChange} // Atualiza com a função de formatação
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
                        {formErrors.tipo && <div className={styles.error}>{formErrors.tipo}</div>}
                    </div>

                    {message && <div className={styles.message}>{message}</div>}
                    <button type="submit" className={styles.button}>
                        {editingUser ? "Salvar Alterações" : "Cadastrar"}
                    </button>
                </form>
            )}
 {!showUserList ? (
                <>
                    <form className={styles.form}>
                        {/* Campos do formulário */}
                        <button type="submit" className={styles.button}>
                            {editingUser ? "Salvar Alterações" : "Cadastrar"}
                        </button>
                    </form>
                    <button onClick={handleViewUsers} className={styles.viewUsersButton}>
                        Ver Usuários
                    </button>
                </>
            ) : (
                <div className={styles.userList}>
                    <h2 className={styles.h21}>Lista de Usuários</h2>
                    {paginatedUsers.map((user) => (
                        <div key={user.nif} className={styles.userCard}>
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
                        </div>
                    ))}
                    <div className={styles.pagination}>
                        <button
                            onClick={handlePreviousPage}
                            className={styles.pageButton}
                            disabled={currentPage === 1}
                        >
                            Página Anterior
                        </button>
                        <button
                            onClick={handleNextPage}
                            className={styles.pageButton}
                            disabled={startIndex + usersPerPage >= users.length}
                        >
                            Próxima Página
                        </button>
                    </div>
                    <button
                        onClick={handleGoBackToForm}
                        className={styles.backButton}
                    >
                        Voltar ao Cadastro
                    </button>
                </div>
            )}
        </div>
    );
};

export default CadastroUsuarios;
