import React, { useState } from 'react';  
import './styles.modules.css';  
import { CriarAtestado } from '../../Data/server';  

const Atestado = () => {  
    // Estado inicial  
    const [aluno, setAluno] = useState('');  
    const [turma, setTurma] = useState('');  
    const [curso, setCurso] = useState('');  
    const [dataInicial, setDataInicial] = useState('');  
    const [dataFinal, setDataFinal] = useState('');  
    const [ra, setRa] = useState('');  
    const [justificativa, setJustificativa] = useState('');  
    const [imagem, setImagem] = useState(null);  
    const [cid, setCid] = useState('');  
    const [successMessage, setSuccessMessage] = useState('');  
    const [errorMessage, setErrorMessage] = useState('');  

    const handleSubmit = async (e) => {  
        e.preventDefault();  

        if (!aluno) {  
            setErrorMessage('O campo Aluno é obrigatório');  
            return;  
        }  

        if (!dataInicial) {  
            setErrorMessage('O campo Data Inicial é obrigatório');  
            return;  
        }  

        if (!dataFinal) {  
            setErrorMessage('O campo Data Final é obrigatório');  
            return;  
        }  

        try {  
            // Formatar as datas usando a função formatData  
            const atest = {  
                aluno,  
                curso,  
                turma,  
                ra,  
                dataInicial: formatData(dataInicial),  // Formata a data inicial  
                dataFinal: formatData(dataFinal),      // Formata a data final  
                justificativa,  
                imagem,  
                cid  
            };  

            await CriarAtestado(atest);  
            setSuccessMessage('Atestado criado com sucesso');  
            setErrorMessage('');  

            // Resetar os campos do formulário  
            resetForm();  
        } catch (error) {  
            console.error('Erro ao criar atestado:', error);  
            console.error('error.response:', error.response);  
            setErrorMessage(error.response?.data?.error || 'Ocorreu um erro ao criar o atestado');  
            setTimeout(() => {  
                setErrorMessage('');  
            }, 3000);  
        }  
    };  

    const resetForm = () => {  
        setAluno('');  
        setTurma('');  
        setCurso('');  
        setDataInicial('');  
        setDataFinal('');  
        setJustificativa('');  
        setImagem(null);  
        setCid('');  
    };  

    const formatData = (data) => {  
        const date = new Date(data);  
        if (isNaN(date.getTime())) { // Verifica se a data é válida  
            return null; // Retorna nulo se a data não for válida  
        }  
        let day = String(date.getDate()).padStart(2, '0'); // Adiciona zero à esquerda  
        let month = String(date.getMonth() + 1).padStart(2, '0'); // Adiciona zero à esquerda  
        let year = date.getFullYear();  
        return `${day}/${month}/${year}`; // Formato: DD/MM/YYYY  
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
                    <label>RA:</label>  
                    <input type="text" name="ra" value={ra} onChange={(e) => setRa(e.target.value)} />  
                </div>  
                <div className="date-group">  
                    <div className="input-group">  
                        <label>Data inicial:</label>  
                        <input type="date" name="dataInicial" value={dataInicial} onChange={(e) => setDataInicial(e.target.value)} required />  
                    </div>  
                    <div className="input-group">  
                        <label>Data final:</label>  
                        <input type="date" name="dataFinal" value={dataFinal} onChange={(e) => setDataFinal(e.target.value)} required />  
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