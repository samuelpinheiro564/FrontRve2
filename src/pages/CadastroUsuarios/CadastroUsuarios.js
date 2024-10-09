import React, { useState } from "react";  
import "../CadastroUsuarios/styles.modules.css";  
import { CriarUser } from "../../Data/server";  

const CadastroUsuarios = () => {  
    const [nif, setNif] = useState('');  
    const [nome, setNome] = useState('');  
    const [email, setEmail] = useState('');  
  //  const [curso, setCurso] = useState('');  
    const [senha, setSenha] = useState('');  
    const [telefone, setTelefone] = useState('');
    const [userType, setUserType] = useState('');  

    const handleCriarUser = async (e) => {  
        e.preventDefault();  
        try {  
            const user = {  
                nif: Number(nif), // Converter para número aqui  
                nome,  
                email,  
               // curso,  
                senha,  
                telefone,
                userType  
            };  
            await CriarUser(user);  
            alert('Usuário cadastrado com sucesso');  
            // Limpar os campos após o cadastro  
            fecharCard();  
        } catch (error) {  
            console.error('Erro ao criar usuário:', error);  
            alert('Erro ao cadastrar usuário');  
        }  
    };  

    const fecharCard = () => {  
        setNif('');  
        setNome('');  
        setEmail('');  
    //    setCurso('');  
        setSenha('');  
        setTelefone('');  
    };  

    return (  
        <div className="container">  
            <h1 className="title">Cadastro de Usuário</h1>  
            <form className="form" onSubmit={handleCriarUser}>  
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
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                            required
                            className='input'
                        >
                            <option value="" disabled>Tipo de Usuario</option>
                            <option value="aluno">Aluno</option>
                            <option value="secretaria">Secretaria</option>
                            <option value="docente">Docente</option>
                            <option value="admin">Administrador</option>
                        </select> 
                <button type="submit" className="button">Cadastrar</button>  
                <button type="button" className="button" onClick={fecharCard}>Cancelar</button>  
            </form>  
        </div>  
    );  
};  

export default CadastroUsuarios;