import React, { useState, useEffect } from 'react';
import { CriarSaida, AllSaida, ObterSaidaPorId, EditarSaida, DeletarSaida } from '../../Data/server';
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
    const [historico, setHistorico] = useState([]);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchSaidaRecords();
    }, []);

    useEffect(() => {
        if (editId) {
            fetchSaidaById(editId);
        }
    }, [editId]);

    const fetchSaidaRecords = async () => {
        try {
            const records = await AllSaida();
            setHistorico(records);
        } catch (error) {
            console.error("Error fetching records:", error);
        }
    };

    const fetchSaidaById = async (id) => {
        try {
            const response = await ObterSaidaPorId(id);
            setFormData({
                nomealuno: response.nomealuno,
                curso: response.curso,
                turma: response.turma,
                alunora: Number(response.alunora),
                data: response.datasaida,
                horasaida: response.horasaida,
                maioridade: response.maioridade ? 'true' : 'false',
                justificativa: response.justificativa,
                assinaturaProf: response.assinaturaprof,
                assinaturaAnaq: response.assinaturaanaq,
            });
        } catch (error) {
            console.error("Error fetching record for edit:", error);
        }
    };

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
                setEditId(null);
            } else {
                await CriarSaida(submissionData);
            }
            fetchSaidaRecords();
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
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const handleEdit = (id) => {
        setEditId(id);
    };

    const handleDelete = async (id) => {
        try {
            await DeletarSaida(id);
            fetchSaidaRecords();
        } catch (error) {
            console.error("Error deleting record:", error);
        }
    };

    const formatarData = (dataString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dataString).toLocaleDateString(undefined, options);
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

            <h2 className={styles.subtitle}>Histórico de Saídas e Atestados</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Nome do Aluno</th>
                        <th>Curso</th>
                        <th>Turma</th>
                        <th>RA</th>
                        <th>Maioridade</th>
                        <th>Data/Hora da Saída</th>
                        <th>Justificativa</th>
                        <th>Assinatura do Professor</th>
                        <th>Assinatura do Analista</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {historico.map((item) => (
                        <tr key={item.id}>
                            <td>{item.nomealuno}</td>
                            <td>{item.curso}</td>
                            <td>{item.turma}</td>
                            <td>{item.alunora}</td>
                            <td>{item.maioridade ? 'Sim' : 'Não'}</td>
                            <td>{`${formatarData(item.datasaida)} ${item.horasaida}`}</td>
                            <td>{item.justificativa}</td>
                            <td>{item.assinaturaprof}</td>
                            <td>{item.assinaturaanaq}</td>
                            <td>
                                <button onClick={() => handleEdit(item.id)} className={styles.button}>Editar</button>
                                <button onClick={() => handleDelete(item.id)} className={styles.button}>Deletar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Saida;
