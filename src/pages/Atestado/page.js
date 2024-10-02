import React, { useState } from 'react';  
import '../Atestado/styles.modules.css';   

const Atestado = () => {  
    const [formData, setFormData] = useState({  
        aluno: '',  
        turma: '',  
        curso: '',  
        ra: '',  
        dataInicial: '',  
        dataFinal: '',  
        justificativa: '',  
    });  

    const [successMessage, setSuccessMessage] = useState('');  

    const handleChange = (e) => {  
        const { name, value } = e.target;  
        setFormData({ ...formData, [name]: value });  
    };  

    const handleSubmit = (e) => {  
        e.preventDefault();  
        console.log(formData);  
        // Add logic to handle form submission  

        // Show success message
        setSuccessMessage('Formulário enviado com sucesso!');

        // Clear form inputs
        setFormData({  
            aluno: '',  
            turma: '',  
            curso: '',  
            ra: '',  
            dataInicial: '',  
            dataFinal: '',  
            justificativa: '',  
        });

        // Hide success message after 3 seconds
        setTimeout(() => {
            setSuccessMessage('');
        }, 3000);
    };  

    return (  
        <div className="container">  
            <h1>Atestado</h1>  
            {successMessage && <p className="success-message">{successMessage}</p>}
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
                    <div className="input-group"    >  
                        <label>Data final</label>  
                        <input type="date" name="dataFinal" value={formData.dataFinal} onChange={handleChange} />  
                    </div>  
                </div>  
                <div className="input-group">  
                    <label>Justificativa:</label>  
                    <textarea name="justificativa" value={formData.justificativa} onChange={handleChange} />  
                </div>  
                <div className="upload-group">  
                    <label>Imagem:</label>  
                    <input type="file" />  
                </div>  
                <button type="submit">Enviar</button>  
            </form>  
        </div>  
    );  
};  

export default Atestado;