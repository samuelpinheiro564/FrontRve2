import React, { useState, useEffect } from "react";
import "../CadastroUsuarios/styles.modules.css";
import { CriarUser, EditarUser,DeleteUser,AllUsers} from "../../Data/server";

const UserRegistration = () => {
 const [nif,setNif] = useState('');
    const [nome,setNome] = useState('');
    const [email,setEmail] = useState('');
    const [curso,setCurso] = useState('');
    const [senha,setSenha] = useState('');
    const [telefone,setTelefone] = useState('');
const [dados,setDados] = useState([]);
const [edit, setEdit] = useState(false);
const [userType, setUserType] = useState('');
const [abrirCard, setAbrirCard] = useState(false);
const [listarUsers, setListarUsers] = useState(false);
const [itemSelecionado, setItemSelecionado] = useState(null); 

const ListUsers =()=>{
  AllUsers().then((res)=>{
    setDados(res);
  })

}

  const handleItemClick = (item) => {  
    setItemSelecionado(item); // Define o item selecionado  
    setAbrirCard(true); // Abre o card  
  };

  const fecharCard = () => {  
    setAbrirCard(false); // Fecha o card  
    setItemSelecionado(null); // Limpa a seleção  
  }; 

  const HandleEnviar = (e) => {
      if (
        nif === "" ||
        nome === "" ||
        email === "" ||
        curso === "" ||
        senha === "" ||
        telefone === ""
      ) {
        console.log("Preencha todos os campos");
      } else {
        alert('Usuario criado com sucesso')
        CriarUser(nif, nome, email, curso, senha, telefone);
        setEdit(false);
      }
  };

  const HandleEditar = (e) => {
    setAbrirCard(true);
    if (
      nif !== "" ||
      nome !== "" ||
      email !== "" ||
      curso !== "" ||
      senha !== "" ||
      telefone !== ""
    ) {
      console.log("Preencha todos os campos");
    } else {
      alert('Usuario criado com sucesso')
      EditarUser(nif, nome, email, curso, senha, telefone);
      setEdit(true);
    }
  };


  const HandleDelete = (e) => {
    if (
        nif !== "" ||
        nome !== "" ||
        email !== "" ||
        curso !== "" ||
        senha !== "" ||
        telefone !== ""
    ) {
        console.log("Preencha todos os campos");
    } else {
        alert('Usuario criado com sucesso')
        DeleteUser(nif, nome, email, curso, senha, telefone);
        setEdit(false);
    }
  };
  return (
    <div className="container">
      {listarUsers ? (
        <form className="form">
          <h1 className="title">Usuários</h1>
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
          <select 
            className="input"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            required
          >
            <option value="" disabled>Selecione o Tipo de usuario</option>
            <option value="admin">Administrador</option>
            <option value="docente">Docente</option>
          </select>
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            maxLength="100"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
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
          <button className="button" onClick={HandleEnviar}>
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
              {ListUsers.map(item => (  
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
              <h3>Detalhes do Item</h3>  
              <p><strong>NIF:</strong> {itemSelecionado.nif}</p>  
              <p><strong>Nome:</strong> {itemSelecionado.nome}</p>  
              {/* Adicione mais campos aqui, se necessário */}  
              <button onClick={fecharCard} style={{  
                backgroundColor: '#007BFF',  
                color: 'white',  
                border: 'none',  
                padding: '8px 12px',  
                borderRadius: '4px',  
                cursor: 'pointer',  
              }}>  
                Fechar  
              </button>  
            </div>  
          )}  
        </div>  
      )}
    </div>
  );
};
export default UserRegistration;
