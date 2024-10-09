import React, { useState } from 'react';  
import './styles.modules.css';   
import { CriarAtestado } from '../../Data/server';  

const Atestado = () => {  
    const [aluno, setAluno] = useState('');  
    const [turma, setTurma] = useState('');  
    const [curso, setCurso] = useState('');  
    const [dataInicial, setDataInicial] = useState('');  
    const [dataFinal, setDataFinal] = useState('');  
    const [ra,setRa]= useState('');
    const [justificativa, setJustificativa] = useState('');  
    const [imagem, setImagem] = useState(null);  
    const [cid, setCid] = useState('');  
    const [successMessage, setSuccessMessage] = useState('');  
    const [errorMessage, setErrorMessage] = useState('');  

    const handleSubmit = async (e) => {  
        e.preventDefault(); // Impede o comportamento padrão do formulário  

        // Verificar se o campo "aluno" está vazio  
        if (!aluno) {  
            setErrorMessage('O campo Aluno é obrigatório');  
            return; // Impede o envio do formulário  
        }  

        try {   

            const atest ={aluno,curso,turma,ra,dataInicial,dataFinal,justificativa,imagem,cid}
            await CriarAtestado(atest);  
            setSuccessMessage('Usuário cadastrado com sucesso');  
            setErrorMessage('');   
         
            // Limpar os campos após o cadastro  
            setAluno('');  
            setTurma('');  
            setCurso('');  
            setDataInicial('');  
            setDataFinal('');  
            setJustificativa('');  
            setImagem(null);  
            setCid('');  
        } catch (error) {  
            console.error('Erro ao criar atestado:', error);  
            setErrorMessage(error.response?.data?.error || 'Ocorreu um erro ao criar o atestado');   
            setTimeout(() => {  
                setErrorMessage('');  
            }, 3000);  
        }  
    };  

    return (  
        <div className="container">  
            <h1>Atestado</h1>  
            {successMessage && <p className="success-message">{successMessage}</p>}  
            {errorMessage && <p className="error-message">{errorMessage}</p>}  
            <form onSubmit={handleSubmit}>  
                <div className="input-group">  
                    <label>Aluno:</label>  
                    <input type="text" name="aluno" value={aluno} onChange={(e) => setAluno(e.target.value)} required />  
                </div>  
                <div className="input-group">  
                    <label>Turma:</label>  
                    <input type="text" name="turma" value={turma} onChange={(e) => setTurma(e.target.value)} />  
                </div>  
                <div className="input-group">  
                    <label>Curso:</label>  
                    <input type="text" name="curso" value={curso} onChange={(e) => setCurso(e.target.value)} />  
                </div>  
                <div className="input-group">  
                    <label>Ra:</label>  
                    <input type="text" name="curso" value={ra} onChange={(e) => setRa(e.target.value)} />  
                </div>  
                <div className="date-group">  
                    <div className="input-group">  
                        <label>Data inicial:</label>  
                        <input type="date" name="dataInicial" value={dataInicial} onChange={(e) => setDataInicial(e.target.value)} />  
                    </div>  
                    <div className="input-group">  
                        <label>Data final:</label>  
                        <input type="date" name="dataFinal" value={dataFinal} onChange={(e) => setDataFinal(e.target.value)} />  
                    </div>  
                </div>  
                <div className="input-group">  
                    <label>Justificativa:</label>  
                    <textarea name="justificativa" value={justificativa} onChange={(e) => setJustificativa(e.target.value)} />  
                </div>  
                <div className="input-group">  
                    <label>CID:</label>  
                    <input type="text" name="cid" value={cid} onChange={(e) => setCid(e.target.value)} />  
                </div>  
                <div className="upload-group">  
                    <label>Imagem:</label>  
                    <input type="file" name="imagem" onChange={(e) => setImagem(e.target.files[0])} />  
                </div>  
                <button type="submit">Enviar</button>  
            </form>  
        </div>  
    );  
};  

export default Atestado;