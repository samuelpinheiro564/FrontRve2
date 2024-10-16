import React, { useState, useEffect } from 'react';
import './styles.modules.css'; // Adjusted the path
import { CriarSaida, AllSaida, ObterSaidaPorId, EditarSaida, DeletarSaida } from '../../Data/server';

const App = () => {
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

    const fetchSaidaRecords = async () => {
        try {
            const records = await AllSaida();
            setHistorico(records);
        } catch (error) {
            console.error("Error fetching records:", error);
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
        };  

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
    };  

    const handleEdit = async (id) => {  
        const response = await ObterSaidaPorId(id);  
        setFormData({  
            ...response,  
            maioridade: response.maioridade ? 'true' : 'false'  
        });  
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
        <div className="container">  
            <h1>JUSTIFICATIVA SAÍDA</h1>  
            <form onSubmit={handleSubmit}>  
                <input type="text" name="nomealuno" placeholder="Aluno" value={formData.nomealuno} onChange={handleChange} />  
                <input type="text" name="curso" placeholder="Curso" value={formData.curso} onChange={handleChange} />  
                <input type="text" name="turma" placeholder="Turma" value={formData.turma} onChange={handleChange} />  
                <input type="text" name="alunora" placeholder="RA" value={formData.alunora} onChange={handleChange} />  

                <div>  
                    <label>Maior de Idade:</label>  
                    <label>  
                        <input type="radio" name="maioridade" value="true" onChange={handleChange} checked={formData.maioridade === 'true'} /> Sim  
                    </label>  
                    <label>  
                        <input type="radio" name="maioridade" value="false" onChange={handleChange} checked={formData.maioridade === 'false'} /> Não  
                    </label>  
                </div>  

                <input type="date" name="data" value={formData.data} onChange={handleChange} />  
                <input type="time" name="horasaida" value={formData.horasaida} onChange={handleChange} />  

                <textarea name="justificativa" placeholder="Justificativa" value={formData.justificativa} onChange={handleChange}></textarea>  

                <input type="text" name="assinaturaProf" placeholder="Assinatura do professor" value={formData.assinaturaProf} onChange={handleChange} />  
                <input type="text" name="assinaturaAnaq" placeholder="Assinatura do analista de qualidade" value={formData.assinaturaAnaq} onChange={handleChange} />  
                <button type="submit">{editId ? 'Editar Saída' : 'Enviar Saída'}</button>  
            </form>  

            <h2>Histórico de Saídas e Atestados</h2>  
            <table>  
                <thead>  
                    <tr>  
                        <th>Data/Hora da Saída</th>  
                        <th>Assinatura do Professor</th>  
                        <th>Assinatura do Analista</th>  
                        <th>Ações</th>  
                    </tr>  
                </thead>  
                <tbody>  
                    {historico.map((item) => (  
                        <tr key={item.id}>  
                            <td>{`${formatarData(item.datasaida)} ${item.horasaida}`}</td>  
                            <td>{item.assinaturaProf ? item.assinaturaProf : "Não disponível"}</td>  
                            <td>{item.assinaturaAnaq ? item.assinaturaAnaq : "Não disponível"}</td>  
                            <td>
                                <button onClick={() => handleEdit(item.id)}>Editar</button>
                                <button onClick={() => handleDelete(item.id)}>Deletar</button>
                            </td>  
                        </tr>  
                    ))}  
                </tbody>  
            </table>  
        </div>  
    );  
};  

export default App;