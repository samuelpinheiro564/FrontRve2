import React, { useState, useEffect } from 'react';  
import { useNavigate, useLocation } from 'react-router-dom';  
import { CriarSaida, EditarSaida } from '../../Data/server';  
import styles from '../Saida/saida.module.css';  

const Saida = () => {  
    const [formData, setFormData] = useState({  
        nomealuno: '',  
        curso: '',  
        turma: '',  
        alunora: '',  
        data: '',  
        horasaida: '',  
        maioridade: '',  
        justificativa: '',  
        assinaturaProf: '',  
        assinaturaAnaq: '',  
    });  
    const [editId, setEditId] = useState(null);  
    const [message, setMessage] = useState({ type: '', text: '' });  
    const navigate = useNavigate();  
    const location = useLocation();  

    useEffect(() => {  
        if (location.state?.item) {  
            const item = location.state.item;  
            setEditId(item.id); // Set the ID for editing  
            setFormData({  
                nomealuno: item.nomealuno,  
                curso: item.curso,  
                turma: item.turma,  
                alunora: item.alunora,  
                data: item.datasaida.split('T')[0],  
                horasaida: item.horasaida,  
                maioridade: item.maioridade ? 'true' : 'false',  
                justificativa: item.justificativa,  
                assinaturaProf: item.assinaturaprof,  
                assinaturaAnaq: item.assinaturaanaq,  
            });  
        }  
    }, [location.state]);  

    useEffect(() => {  
        if (message.text) {  
            const timer = setTimeout(() => {  
                setMessage({ type: '', text: '' });  
            }, 3000); // 3 seconds  

            return () => clearTimeout(timer);  
        }  
    }, [message]);  

    const handleChange = ({ target: { name, value } }) => {  
        setFormData({ ...formData, [name]: value });  
    };  

    const handleSubmit = async (e) => {  
        e.preventDefault();  

        if (!formData.data) {  
            alert("A data de saída deve ser preenchida.");  
            return;  
        }  

        const submissionData = {  
            ...formData,  
            datasaida: formData.data,  
            horasaida: formData.horasaida,  
            assinaturaanaq: formData.assinaturaAnaq,  
            assinaturaprof: formData.assinaturaProf,  
        };  

        try {  
            if (editId) {  
                await EditarSaida(editId, submissionData);  
                setMessage({ type: 'success', text: 'Saída editada com sucesso.' });  
            } else {  
                await CriarSaida(submissionData);  
                setMessage({ type: 'success', text: 'Saída criada com sucesso.' });  
            }  
            // Limpa os dados do formulário  
            setFormData({  
                nomealuno: '',  
                curso: '',  
                turma: '',  
                alunora: '',  
                data: '',  
                horasaida: '',  
                maioridade: '',  
                justificativa: '',  
                assinaturaProf: '',  
                assinaturaAnaq: '',  
            });  
            setEditId(null); // Limpa o ID de edição para nova entrada, se necessário  
        } catch (error) {  
            console.error("Error submitting form:", error);  
            setMessage({ type: 'error', text: 'Erro ao enviar formulário.' });  
        }  
    };  

    return (  
        <div className={styles.container}>  
            <h1 className={styles.title}>JUSTIFICATIVA SAÍDA</h1>  
            <form onSubmit={handleSubmit} className={styles.form}>  
                <input type="text" name="nomealuno" placeholder="Aluno" value={formData.nomealuno} onChange={handleChange} required className={styles.input} />  
                <input type="text" name="curso" placeholder="Curso" value={formData.curso} onChange={handleChange} required className={styles.input} />  
                <input type="text" name="turma" placeholder="Turma" value={formData.turma} onChange={handleChange} required className={styles.input} />  
                <input className={`${styles.input} ${styles.ra}`} type="number" name="alunora" placeholder="RA" value={formData.alunora} onChange={handleChange} required />  

                <div className={styles.radioGroup}>  
                    <label>Maior de Idade:</label>  
                    <label>  
                        <input type="radio" name="maioridade" value="true" onChange={handleChange} checked={formData.maioridade === 'true'} required /> Sim  
                    </label>  
                    <label>  
                        <input type="radio" name="maioridade" value="false" onChange={handleChange} checked={formData.maioridade === 'false'} required /> Não  
                    </label>  
                </div>  

                <input type="date" name="data" value={formData.data} onChange={handleChange} required className={styles.input} />  
                <input type="time" name="horasaida" value={formData.horasaida} onChange={handleChange} required className={styles.input} />  

                <textarea name="justificativa" placeholder="Justificativa" value={formData.justificativa} onChange={handleChange} required className={styles.textarea}></textarea>  

                <input type="text" name="assinaturaProf" placeholder="Assinatura do professor" value={formData.assinaturaProf} onChange={handleChange} required className={styles.input} />  
                <input type="text" name="assinaturaAnaq" placeholder="Assinatura do analista de qualidade" value={formData.assinaturaAnaq} onChange={handleChange} required className={styles.input} />  
                <button type="submit" className={styles.button}>{editId ? 'Editar Saída' : 'Enviar Saída'}</button>  
            </form>  
            {message.text && (  
                <div className={message.type === 'error' ? styles.error : styles.success}>  
                    {message.text}  
                </div>  
            )}  
            <button onClick={() => navigate('/HistoricoSaida')} className={styles.button}>Ver Histórico de Saídas</button>  
        </div>  
    );  
};  

export default Saida;