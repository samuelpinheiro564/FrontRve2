import React, { useState, useEffect } from "react";
import "../CadastroUsuarios/styles.modules.css";
import { CriarUser, EditarUser, DeleteUser, AllUsers } from "../../Data/server";

const UserRegistration = () => {
    const [nif, setNif] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [curso, setCurso] = useState('');
    const [senha, setSenha] = useState('');
    const [telefone, setTelefone] = useState('');
    const [dados, setDados] = useState([]);

    const [itemSelecionado, setItemSelecionado] = useState(null);
    const [listarUsers, setListarUsers] = useState(false);

    const fetchUsers = async () => {
        try {
            const datas = await AllUsers();
            setDados(datas);
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleCriarUser = async () => {
        try {
            await CriarUser(nif, nome, email, curso, senha, telefone);
            alert('Criado com sucesso');
            fetchUsers(); // Refresh user list
            fecharCard();
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
        }
    };

    const handleEditarUser = async () => {
        try {
            await EditarUser(nif, nome, email, curso, senha, telefone);
            alert('Editado com sucesso');
            fetchUsers(); // Refresh user list
            fecharCard();
        } catch (error) {
            console.error('Erro ao editar usuário:', error);
        }
    };

    const handleDeleteUser = async () => {
        try {
            await DeleteUser(nif);
            alert('Deletado com sucesso');
            fetchUsers(); // Refresh user list
            fecharCard();
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
        }
    };

    const handleItemClick = (item) => {

        setItemSelecionado(item);
        setNif(item.nif);
        setNome(item.nome);
        setEmail(item.email);
        setCurso(item.curso);
        setSenha(item.senha);
        setTelefone(item.telefone);
    };

    const fecharCard = () => {

        setItemSelecionado(null);
        setNif('');
        setNome('');
        setEmail('');
        setCurso('');
        setSenha('');
        setTelefone('');
    };

    const handleEnviar = (e) => {
        e.preventDefault();
        if (itemSelecionado) {
            handleEditarUser();
        } else {
            handleCriarUser();
        }
    };

    return (
        <div className="container">
            <button onClick={() => setListarUsers(!listarUsers)}>
                {listarUsers ? 'Cadastrar Usuário' : 'Listar Usuários'}
            </button>
            {!listarUsers ? (
                <form className="form" onSubmit={handleEnviar}>
                    <h1 className="title">{itemSelecionado ? 'Editar Usuário' : 'Cadastro de Usuário'}</h1>
                    <input
                        type="number"
                        name="nif"
                        placeholder="NIF"
                        value={nif}
                        onChange={(e) => setNif(e.target.value)}
                        maxLength="12"
                        required
                        className="input"
                    />
                    <input
                        type="text"
                        name="nome"
                        placeholder="Nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        maxLength="100"
                        required
                        className="input"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        maxLength="100"
                        required
                        className="input"
                    />
                    <input
                        type="text"
                        name="curso"
                        placeholder="Curso"
                        value={curso}
                        onChange={(e) => setCurso(e.target.value)}
                        maxLength="100"
                        required
                        className="input"
                    />
                    <input
                        type="password"
                        name="senha"
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        maxLength="150"
                        required
                        className="input"
                    />
                    <input
                        type="text"
                        name="telefone"
                        placeholder="Telefone"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        maxLength="15"
                        required
                        className="input"
                    />
                    <button type="submit" className="button">
                        {itemSelecionado ? 'Salvar Alterações' : 'Cadastrar'}
                    </button>
                    {itemSelecionado && (
                        <button type="button" className="button" onClick={handleDeleteUser}>
                            Deletar
                        </button>
                    )}
                    <button type="button" className="button" onClick={fecharCard}>
                        Cancelar
                    </button>
                </form>
            ) : (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>NIF</th>
                                <th>Nome</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dados.map((item) => (
                                <tr key={item.nif} onClick={() => handleItemClick(item)} style={{ cursor: 'pointer' }}>
                                    <td>{item.nif}</td>
                                    <td>{item.nome}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UserRegistration;