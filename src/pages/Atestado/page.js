import React, { useState, useEffect } from 'react';  
import './styles.modules.css'; 
import { CriarAtestado, AllAtestados, ObterAtestadoPorId, EditarAtestado, DeleteAtestado } from '../../Data/server';  

const Atestado = () => {  
    const [formData, setFormData] = useState({  
        aluno: '',  
        turma: '',  
        curso: '',  
        ra: '',  
        dataInicial: '',  
        dataFinal: '',  
        justificativa: '',  
        imagem: null, 
        cid: '', 
    });  

    const [successMessage, setSuccessMessage] = useState('');  
    const [errorMessage, setErrorMessage] = useState(''); 
    const [cards, setCards] = useState([]); 

    const handleChange = (e) => {  
        const { name, value, type, files } = e.target;  
        if (type === 'file') {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };  

    const handleSubmit = (e) => {  
        e.preventDefault();  

        if (!formData.aluno || !formData.turma || !formData.curso || !formData.ra || !formData.dataInicial || !formData.dataFinal || !formData.justificativa || !formData.imagem || !formData.cid) {
            setErrorMessage('Por favor, preencha todos os campos obrigatórios e anexe uma imagem.');
            return;
        }

        console.log('Form Data:', formData);  

        setSuccessMessage('Formulário enviado com sucesso!');
        setErrorMessage(''); 

        setCards(prevCards => [...prevCards, formData]);

        setFormData({  
            aluno: '',  
            turma: '',  
            curso: '',  
            ra: '',  
            dataInicial: '',  
            dataFinal: '',  
            justificativa: '',  
            imagem: null, 
            cid: '', 
        });

        setTimeout(() => {
            setSuccessMessage('');
        }, 3000);
    };  

    useEffect(() => {
        return () => {
            cards.forEach(card => {
                if (card.imagem) {
                    URL.revokeObjectURL(card.imagem);
                }
            });
        };
    }, [cards]);

    return (  
        <div className="container">  
            <h1>Atestado</h1>  
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>  
                <div className="input-group">  
                    <label>Aluno:</label>  
                    <input type="text" name="aluno" value={formData.aluno} onChange={handleChange} />  
                </div>  
                <div className="input-group">  
                    <label>Turma:</label>  
                    <input type="text" name="turma" value={formData.turma} onChange={handleChange} />  
                </div>  
                <div className="input-group">  
                    <label>Curso:</label>  
                    <input type="text" name="curso" value={formData.curso} onChange={handleChange} />  
                </div>  
                <div className="input-group">  
                    <label>RA:</label>  
                    <input type="text" name="ra" value={formData.ra} onChange={handleChange} />  
                </div>  
                <div className="date-group">  
                    <div className="input-group">  
                        <label>Data inicial</label>  
                        <input type="date" name="dataInicial" value={formData.dataInicial} onChange={handleChange} />  
                    </div>  
                    <div className="input-group">  
                        <label>Data final</label>  
                        <input type="date" name="dataFinal" value={formData.dataFinal} onChange={handleChange} />  
                    </div>  
                </div>  
                <div className="input-group">  
                    <label>Justificativa:</label>  
                    <textarea name="justificativa" value={formData.justificativa} onChange={handleChange} />  
                </div>  
                <div className="input-group">  
                    <label>CID:</label>  
                    <input type="text" name="cid" value={formData.cid} onChange={handleChange} />  
                </div>  
                <div className="upload-group">  
                    <label>Imagem:</label>  
                    <input type="file" name="imagem" onChange={handleChange} />  
                </div>  
                <button type="submit">Enviar</button>  
            </form>  

            <div className="cards-container">
                {cards.map((card, index) => (
                    <div key={index} className="card">
                        <h2>{card.aluno}</h2>
                        <p>Turma: {card.turma}</p>
                        <p>Curso: {card.curso}</p>
                        <p>RA: {card.ra}</p>
                        <p>Data Inicial: {card.dataInicial}</p>
                        <p>Data Final: {card.dataFinal}</p>
                        <p>Justificativa: {card.justificativa}</p>
                        <p>CID: {card.cid}</p>
                        {card.imagem && (
                            <div>
                                <img src={URL.createObjectURL(card.imagem)} alt="Imagem do Atestado" />
                                <a href={URL.createObjectURL(card.imagem)} download="imagem_atestado">Baixar Imagem</a>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>  
    );  
};  

export default Atestado;