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
    const [abrirCard, setAbrirCard] = useState(false);
    const [itemSelecionado, setItemSelecionado] = useState(null);
    const [listarUsers, setListarUsers] = useState(false);

    useEffect(() => {
        if (listarUsers) {
            ListUsers();
        }
    }, [listarUsers]);

    const ListUsers = async () => {
        const res = await AllUsers();
        setDados(res);
    };

    const handleItemClick = (item) => {
        setItemSelecionado(item);
        setNif(item.nif);
        setNome(item.nome);
        setEmail(item.email);
        setCurso(item.curso);
        setSenha(item.senha);
        setTelefone(item.telefone);
        setAbrirCard(true);
    };

    const fecharCard = () => {
        setAbrirCard(false);
        setItemSelecionado(null);
    };

    const HandleEnviar = async (e) => {
        e.preventDefault();
        if (nif && nome && email && curso && senha && telefone) {
            await CriarUser(nif, nome, email, curso, senha, telefone);
            alert('Usuário criado com sucesso');
            resetForm();
            ListUsers(); // Refresh the user list
        } else {
            console.log("Preencha todos os campos");
        }
    };

    const HandleEditar = async (e) => {
        e.preventDefault();
        if (nif && nome && email && curso && senha && telefone) {
            await EditarUser(nif, nome, email, curso, senha, telefone);
            alert('Usuário editado com sucesso');
            resetForm();
            ListUsers(); // Refresh the user list
            fecharCard();
        } else {
            console.log("Preencha todos os campos");
        }
    };

    const HandleDelete = async () => {
        if (itemSelecionado) {
            await DeleteUser(itemSelecionado.nif);
            alert('Usuário deletado com sucesso');
            resetForm();
            ListUsers(); // Refresh the user list
            fecharCard();
        } else {
            console.log("Nenhum usuário selecionado para deletar");
        }
    };

    const resetForm = () => {
        setNif('');
        setNome('');
        setEmail('');
        setCurso('');
        setSenha('');
        setTelefone('');
        setItemSelecionado(null);
        setAbrirCard(false);
    };

    return (
        <div className="container">
            <button onClick={() => setListarUsers(!listarUsers)}>
                {listarUsers ? 'Cadastrar Usuário' : 'Listar Usuários'}
            </button>
            {listarUsers ? (
                <form className="form" onSubmit={HandleEnviar}>
                    <h1 className="title">Cadastro de Usuário</h1>
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
                        Enviar
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
                            {dados.map(item => (
                                <tr key={item.nif} onClick={() => handleItemClick(item)} style={{ cursor: 'pointer' }}>
                                    <td>{item.nif}</td>
                                    <td>{item.nome}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {abrirCard && itemSelecionado && (
                        <div className="card" style={{
                            border: '1px solid #ccc',
                            padding: '16px',
                            marginTop: '16px',
                            borderRadius: '8px',
                            backgroundColor: '#f9f9f9',
                        }}>
                            <h3>Editar Usuário</h3>
                            <form onSubmit={HandleEditar}>
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
                                <button type="submit" className="button">Salvar Alterações</button>
                                <button type="button" className="button" onClick={HandleDelete}>Deletar</button>
                                <button type="button" className="button" onClick={fecharCard}>Fechar</button>
                            </form>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserRegistration;