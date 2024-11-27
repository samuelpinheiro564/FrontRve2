import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AllSaida, DeletarSaida } from '../../Data/server';
import styles from './historicoSaida.module.css';

const HistoricoSaida = () => {
    const [historico, setHistorico] = useState([]);
    const [message, setMessage] = useState({ type: '', text: '' });
    const navigate = useNavigate();

    useEffect(() => {
        fetchSaidaRecords();
    }, []);

    useEffect(() => {
        if (message.text) {
            const timer = setTimeout(() => {
                setMessage({ type: '', text: '' });
            }, 3000); // 3 seconds

            return () => clearTimeout(timer);
        }
    }, [message]);

    const fetchSaidaRecords = async () => {
        try {
            const records = await AllSaida();
            setHistorico(records);
        } catch (error) {
            console.error("Error fetching records:", error);
            setMessage({ type: 'error', text: 'Erro ao buscar registros.' });
        }
    };

    const handleDelete = async (id) => {
        try {
            await DeletarSaida(id);
            fetchSaidaRecords();
            setMessage({ type: 'success', text: 'Saída deletada com sucesso.' });
        } catch (error) {
            console.error("Error deleting record:", error);
            setMessage({ type: 'error', text: 'Erro ao deletar registro.' });
        }
    };

    const handleEdit = (id) => {
        navigate(`/saida`);
    };

    const formatarData = (dataString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dataString).toLocaleDateString(undefined, options);
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.subtitle}>Histórico de Saídas</h2>
            {message.text && (
                <div className={message.type === 'error' ? styles.error : styles.success}>
                    {message.text}
                </div>
            )}
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
                                <button onClick={() => handleEdit(item.id)} className={styles.buttonEditar}>Editar</button>
                                <button onClick={() => handleDelete(item.id)} className={styles.buttonDeletar}>Deletar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={() => navigate('/Saida')} className={styles.buttonVoltar}>Voltar para Saída</button>
        </div>
    );
};

export default HistoricoSaida;