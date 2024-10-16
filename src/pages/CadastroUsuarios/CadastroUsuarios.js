import React, { useState, useEffect } from "react";
import "../CadastroUsuarios/styles.modules.css";
import { CriarUser, EditarUser, DeleteUser, AllUsers, LoginUser } from "../../Data/server";

const UserRegistration = () => {
    const [nif, setNif] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const[tipo,setTipo]= useState('');
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
        setTipo(item.tipo);
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
        const res = await LoginUser(nif);
        if (res.length === 0) {
            const user ={
                nif: Number(nif),
                nome: nome,
                email: email,
                senha: senha,
                telefone: telefone,
                tipo: tipo
            }
            await CriarUser(user);
            alert('Usuário criado com sucesso');
            resetForm();
        } else {
            alert("nif já cadastrado");
            console.log("Usuário já cadastrado");
        }
   
    };

    const HandleEditar = async (e) => {
        e.preventDefault();
        if (nif && nome && email  && senha && telefone && tipo) {
            const user = {nome, email, senha, telefone, tipo};
            await EditarUser(nif,user);
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
            console.log("Deletando usuário:", itemSelecionado.nif);
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
       setTipo('');
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
            {!listarUsers ? (
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
                           <select
                         type="text"
                            value={tipo}
                            onChange={(e) => setTipo(e.target.value)}
                            required
                            className='input'

                        >
                            <option value="" disabled>Tipo de Usuario</option>
                            <option value="aluno">Aluno</option>
                            <option value="secretaria">Secretaria</option>
                            <option value="docente">Docente</option>
                            <option value="admin">Administrador</option>
                        </select>
                    <button type="submit" className="button" >
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
                                    name="tipo"
                                    placeholder="Tipo"
                                    value={tipo}
                                    onChange={(e) => setTipo(e.target.value)}
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