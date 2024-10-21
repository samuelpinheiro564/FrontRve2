import React, { useState, useEffect } from 'react';
import { CriarAtestado, AllAtestados } from '../../Data/server';

const Atestado = () => {
    const [atestado, setAtestado] = useState([]);
    const [nome_aluno, setNome_aluno] = useState('');
    const [turma, setTurma] = useState('');
    const [curso, setCurso] = useState('');
    const [ra, setRa] = useState('');
    const [data_inicial, setData_inicial] = useState('');
    const [data_final, setData_final] = useState('');
    const [imagem, setImagem] = useState(null);
    const [cid, setCid] = useState('');

    useEffect(() => {
        fetchAtestados();
    }, []);

    const fetchAtestados = async () => {
        const allAtestados = await AllAtestados();
        setAtestado(allAtestados);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const atest = {
            nome_aluno,
            turma,
            curso,
            ra,
            data_inicial,
            data_final,
            imagem, // A imagem deve ser uma string Base64
            cid
        };

        await CriarAtestado(atest);
        resetForm();
        fetchAtestados();
    };

    const resetForm = () => {
        setNome_aluno('');
        setTurma('');
        setCurso('');
        setRa('');
        setData_inicial('');
        setData_final('');
        setImagem(null);
        setCid('');
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagem(reader.result); // Converte a imagem para Base64
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <h1>Atestados</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="nome_aluno"
                    value={nome_aluno}
                    onChange={(e) => setNome_aluno(e.target.value)}
                    placeholder="Nome do Aluno"
                    required
                />
                <input
                    type="text"
                    name="turma"
                    value={turma}
                    onChange={(e) => setTurma(e.target.value)}
                    placeholder="Turma"
                    required
                />
                <input
                    type="text"
                    name="curso"
                    value={curso}
                    onChange={(e) => setCurso(e.target.value)}
                    placeholder="Curso"
                    required
                />
                <input
                    type="text"
                    name="ra"
                    value={ra}
                    onChange={(e) => setRa(e.target.value)}
                    placeholder="RA"
                    required
                />
                <input
                    type="date"
                    name="data_inicial"
                    value={data_inicial}
                    onChange={(e) => setData_inicial(e.target.value)}
                    required
                />
                <input
                    type="date"
                    name="data_final"
                    value={data_final}
                    onChange={(e) => setData_final(e.target.value)}
                    required
                />
                <input
                    type="file"
                    name="imagem"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                />
                <input
                    type="text"
                    name="cid"
                    value={cid}
                    onChange={(e) => setCid(e.target.value)}
                    placeholder="CID"
                    required
                />
                <button type="submit">Adicionar</button>
            </form>

            <h2>Lista de Atestados</h2>
            <ul>
                {atestado.map((atest, index) => (
                    <li key={index}>
                        <strong>Nome:</strong> {atest.nome_aluno} <br />
                        <strong>Curso:</strong> {atest.curso} <br />
                        <strong>Data Inicial:</strong> {atest.data_inicial} <br />
                        <strong>Data Final:</strong> {atest.data_final} <br />
                        <strong>CID:</strong> {atest.cid} <br />
                        <img src={atest.imagem} alt="Atestado" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Atestado;