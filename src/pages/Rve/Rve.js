import React, { useState, useEffect } from 'react';  
import { CriarRve } from '../../Data/server';
import '../Rve/styles.css';  
import userData from '../../Data/dadosUser';

const Rve = () => {
  const [autor, setAutor] = useState('');
  const [estudante, setEstudante] = useState('');
  const [curso, setCurso] = useState('');
  const [turma, setTurma] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [motivo, setMotivo] = useState('');
  const [orientacoesestudante, setOrientacoesEstudante] = useState('');
  const [descricaoocorrido, setDescricaoOcorrido] = useState('');
  const [docentesenvolvidos, setDocentesEnvolvidos] = useState('');
  const [assinaturas, setAssinaturas] = useState([]);
  const [elogios, setElogios] = useState('');
  const [dificuldades, setDificuldades] = useState('');
  const [presenca, setPresenca] = useState('');
  const [categorias, setCategorias] = useState('');  
  const [arrayDocente] = useState([]);

  
  useEffect(() => {
    const dadosUser = userData.getUsers();
    setAutor(dadosUser.nif);
  }, []);

  const categories = [  
    'Aprendizagem',  
    'Atitude/postura/comportamento',  
    'Frequência',  
    'Oficina/Segurança',  
    'Relacionamento interpessoal',  
    'Rendimento',  
    'Saúde física',  
    'Saúde mental',  
    'Outras',  
  ];
  const AddDocente = () => {
 arrayDocente.push(docentesenvolvidos);

  };
  const deleteDocente = (index) => {
    arrayDocente.splice(index, 1);
  };
  
  const handleCriarRVE = async (e) => {  
    e.preventDefault();  
    try {  
      const rve = { 
        autor,
        estudante,
        curso, 
        turma,
        data, 
        hora, 
        motivo, 
        orientacoesestudante,
        descricaoocorrido, 
        docentesenvolvidos, 
        assinaturas, 
        elogios,
        dificuldades, 
        presenca,
        categorias
      };
      await CriarRve(rve);
      alert('Usuário cadastrado com sucesso');
      // Limpar os campos após o cadastro
      setEstudante('');
      setCurso('');
      setTurma('');
      setData('');
      setHora('');
      setMotivo('');
      setOrientacoesEstudante('');
      setDescricaoOcorrido('');
      setDocentesEnvolvidos([]);
      setAssinaturas([]);
      setElogios('');
      setDificuldades('');
      setPresenca('');
      setCategorias('');
      
    } catch (error) {  
      console.error('Erro ao criar RVE:', error);  
      alert('Erro ao cadastrar usuário');  
    }  
  };  

  return (  
    <div className="container">  
      <h1>Registro de vida escolar</h1> 
      <form onSubmit={handleCriarRVE}>
        <div>
          <input  
            type="text"  
            name="estudante"  
            placeholder="Estudante"  
            value={estudante}  
            onChange={(e) => setEstudante(e.target.value)}  
            required  
            className="input"  
          />  
        </div>
        <div>
          <input  
            type="text"  
            name="curso"  
            placeholder="Curso"  
            value={curso}  
            onChange={(e) => setCurso(e.target.value)}  
            required  
            className="input"  
          />  
        </div>
        <div>
          <input  
            type="text"  
            name="turma"  
            placeholder="Turma"  
            value={turma}  
            onChange={(e) => setTurma(e.target.value)}  
            required  
            className="input"  
          />  
        </div>
        <div>
          <input  
            type="date"  
            name="data"  
            placeholder="Data"  
            value={data}  
            onChange={(e) => setData(e.target.value)}  
            required  
            className="input"  
          />  
        </div>
        <div>
          <input  
            type="time"  
            name="hora"  
            placeholder="Hora"  
            value={hora}  
            onChange={(e) => setHora(e.target.value)}  
            required  
            className="input"  
          />  
        </div>
        <div>
          <input  
            type="text"  
            name="motivo"  
            placeholder="Motivo"  
            value={motivo}  
            onChange={(e) => setMotivo(e.target.value)}  
            required  
            className="input"  
          />  
        </div>
        <div>
          <textarea  
            name="orientacoesEstudante"  
            placeholder="Orientações ao Estudante"  
            value={orientacoesestudante}  
            onChange={(e) => setOrientacoesEstudante(e.target.value)}  
            required  
            className="input"  
          />  
        </div>
        <div>
          <textarea  
            name="descricaoOcorrido"  
            placeholder="Descrição do Ocorrido"  
            value={descricaoocorrido}  
            onChange={(e) => setDescricaoOcorrido(e.target.value)}  
            required  
            className="input"  
          />  
        </div>
        <div>
          <input  
            type="text"  
            name="docentesEnvolvidos"  
            placeholder="Docentes Envolvidos"  
            value={docentesenvolvidos}  
            onChange={(e) => setDocentesEnvolvidos(e.target.value)}  
            required  
            className="input"  
          />  
          <button type='button' onClick={AddDocente}>Adicionar Docente</button>
        </div>
        {arrayDocente.length > 0 && (
          <div>
            <h3>Docentes Envolvidos:</h3>
            <ul>
              {arrayDocente.map((docente, index) => (
                <div>
                <li key={index}>{docente}</li>
                <button type='button' onClick={deleteDocente(index)}>x</button>
                </div>
              ))}
            </ul>
          </div>
        )}
        <div>
          <input  
            type="text"  
            name="assinaturas"  
            placeholder="Assinaturas"  
            value={assinaturas}  
            onChange={(e) => setAssinaturas(e.target.value)}  
            required  
            className="input"  
          />  
        </div>
        <div>
          <input  
            type="text"  
            name="elogios"  
            placeholder="Elogios"  
            value={elogios}  
            onChange={(e) => setElogios(e.target.value)}  
            className="input"  
          />  
        </div>
        <div>
          <input  
            type="text"  
            name="dificuldades"  
            placeholder="Dificuldades"  
            value={dificuldades}  
            onChange={(e) => setDificuldades(e.target.value)}  
            className="input"  
          />  
        </div>
        <div>
          <input  
            type="text"  
            name="presenca"  
            placeholder="Presença"  
            value={presenca}  
            onChange={(e) => setPresenca(e.target.value)}  
            className="input"  
          />  
        </div>
        <div>
          <select  
            name="categorias"  
            value={categorias}  
            onChange={(e) => setCategorias(e.target.value)}  
            required  
            className="input"  
          >  
            <option value="">Selecione uma categoria</option>  
            {categories.map((category, index) => (  
              <option key={index} value={category}>{category}</option>  
            ))}  
          </select>  
        </div>
        <button 
          type="submit"
        >Criar RVE</button>
      </form>
    </div>  
  );  
};  

export default Rve;
