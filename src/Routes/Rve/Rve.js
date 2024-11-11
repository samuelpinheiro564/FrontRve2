import React, { useState, useEffect } from 'react';  
import { AllUsers, CriarRve, createrve_usuarios } from '../../Data/server';  
import userData from '../../Data/dadosUser';   
import rveData from '../../Data/DadosRve';  
import { useNavigate } from 'react-router-dom';
import styles from "../Rve/rve.module.css";

const Rve = () => {  
  const [autor, setAutor] = useState('');  
  const [estudante, setEstudante] = useState('');  
  const [curso, setCurso] = useState('');  
  const [turma, setTurma] = useState('');  
  const [data, setData] = useState('');  
  const [hora, setHora] = useState('');  
  const [motivo, setMotivo] = useState('');  
  const [orientacoesEstudante, setOrientacoesEstudante] = useState('');  
  const [descricaoOcorrido, setDescricaoOcorrido] = useState('');  
  const [docenteAtual, setDocenteAtual] = useState('');  
  const [docentesEnvolvidos, setDocentesEnvolvidos] = useState([]);  
  const [assinaturas] = useState(null);  
  const [elogios, setElogios] = useState('');  
  const [dificuldades, setDificuldades] = useState('');  
  const [presenca, setPresenca] = useState('');  
  const [categorias, setCategorias] = useState('');  
  const [id, setId] = useState('');  
  const [listaDocentes, setListaDocentes] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {  
    const dadosUser = userData.getUsers();   
    if (dadosUser.length > 0) {  
      setAutor(dadosUser[0][0].nif);  
    }  

    const gerarIdNumber = () => {  
      const randomId = Math.floor(Math.random() * 1000000);   
      setId(randomId);   
    };  
    gerarIdNumber();  
  }, []);   

  useEffect(() => {  
    const fetchDocentes = async () => {  
        try {  
            const docents = await AllUsers();  
            console.log('Docentes:', docents);  
            if (Array.isArray(docents)) {  
                setListaDocentes(docents);  
            } else {  
                console.error('Expected an array but got:', docents);  
            }  
        } catch (error) {  
            console.error('Erro ao buscar docentes:', error);  
        }   
    };  
    fetchDocentes();  
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

  const addDocente = () => {  
    if (docenteAtual) {  
      if (docentesEnvolvidos.includes(docenteAtual)) {  
        alert('Este docente já está na lista de envolvidos.');  
        return; 
      }  
      
      setDocentesEnvolvidos([...docentesEnvolvidos, docenteAtual]);  
      setDocenteAtual('');   
  
      console.log('Docentes Selecionados:', [...docentesEnvolvidos, docenteAtual]);  
    } else {  
      alert('Selecione um docente antes de adicionar.');  
    }  
  };    
  console.log('Docentes Envolvidos:', docentesEnvolvidos);

  const deleteDocente = (index) => {  
    const updatedDocentes = docentesEnvolvidos.filter((_, i) => i !== index);  
    setDocentesEnvolvidos(updatedDocentes);  
  };   

  const handleUSerRve = async (e) => {
    e.preventDefault();
    console.log(docentesEnvolvidos);
    let userRve = rveData.getRves();
    console.log(userRve);
    for (let i = 0; i < docentesEnvolvidos.length; i++) {
      const userRveResponse = await createrve_usuarios(userRve[0].id, docentesEnvolvidos[i].nif);
      console.log(userRveResponse);
    }
  };

  const handleCriarRVE = async (e) => {  
    e.preventDefault();  
    try {  
      const rve = {  
        id,  
        autor,  
        estudante,  
        curso,  
        turma,  
        data,  
        hora,  
        motivo,  
        orientacoesEstudante,  
        descricaoOcorrido,  
        docentesEnvolvidos,
        assinaturas: Array(assinaturas),  
        elogios,  
        dificuldades,  
        presenca,  
        categorias,  
      };  

      const res = rveData.addRve(rve);
      console.log(res);
      handleUSerRve(e);
      await CriarRve(rve);
      console.log(rveData.getRves());      
      alert('RVE criado com sucesso!');  
      navigate('/SuasRve');

      setEstudante('');  
      setCurso('');  
      setTurma('');  
      setData('');  
      setHora('');  
      setMotivo('');  
      setOrientacoesEstudante('');  
      setDescricaoOcorrido('');  
      setDocentesEnvolvidos([]);  
      setElogios('');  
      setDificuldades('');  
      setPresenca('');  
      setCategorias('');  
    } catch (error) {  
      console.error('Erro ao criar RVE:', error);  
      alert('Ocorreu um erro ao criar o RVE.');  
    }  
  };  

  return (  
    <div className={styles.container}>  
      <h1 className={styles.title}>Criar RVE</h1>  
      <form onSubmit={handleCriarRVE} className={styles.form}>  
        <div className={styles.formGroup}>  
          <input  
            type="text"  
            name="estudante"  
            placeholder="Nome do Estudante"  
            value={estudante}  
            onChange={(e) => setEstudante(e.target.value)}  
            required  
            className={styles.input}
          />  
        </div>  
        <div className={styles.formGroup}>  
          <input  
            type="text"  
            name="curso"  
            placeholder="Curso do Estudante"  
            value={curso}  
            onChange={(e) => setCurso(e.target.value)}  
            required  
            className={styles.input}
          />  
        </div>  
        <div className={styles.formGroup}>  
          <textarea  
            name="turma"  
            placeholder="Turma do Estudante"  
            value={turma}  
            onChange={(e) => setTurma(e.target.value)}  
            required  
            className={styles.textarea}
          />  
        </div>  
        <div className={styles.formGroup}>  
          <input  
            type="date"  
            name="data"  
            placeholder="Data"  
            value={data}  
            onChange={(e) => setData(e.target.value)}  
            required  
            className={styles.input}
          />  
        </div>  
        <div className={styles.formGroup}>  
          <input  
            type="time"  
            name="hora"  
            placeholder="Hora"  
            value={hora}  
            onChange={(e) => setHora(e.target.value)}  
            required  
            className={styles.input}
          />  
        </div>  
        <div className={styles.formGroup}>  
          <textarea  
            name="motivo"  
            placeholder="Motivo"  
            value={motivo}  
            onChange={(e) => setMotivo(e.target.value)}  
            required  
            className={styles.textarea}
          />  
        </div>  
        <div className={styles.formGroup}>  
          <textarea  
            name="orientacoesEstudante"  
            placeholder="Orientações ao Estudante"  
            value={orientacoesEstudante}  
            onChange={(e) => setOrientacoesEstudante(e.target.value)}  
            required  
            className={styles.textarea}
          />  
        </div>  
        <div className={styles.formGroup}>  
          <textarea  
            name="descricaoOcorrido"  
            placeholder="Descrição do Ocorrido"  
            value={descricaoOcorrido}  
            onChange={(e) => setDescricaoOcorrido(e.target.value)}  
            required  
            className={styles.textarea}
          />  
        </div>  
        <div className={styles.formGroup}>  
          <select  
            name="docenteAtual"  
            value={docenteAtual}  
            onChange={(e) => setDocenteAtual(e.target.value)}  
            className={styles.select}
          >  
            <option value="">Selecione um Docente</option>  
             {listaDocentes.map((docente) => (  
              <option key={docente.nif} value={`${docente.nome}`}>{docente.nome}</option>  
            ))}   
          </select>  
          <button type='button' onClick={addDocente} className={styles.button}>  
            Adicionar Docente  
          </button>  
        </div>  
        {docentesEnvolvidos.length > 0 && (  
          <div className={styles.formGroup}>  
            <h3>Docentes Envolvidos:</h3>  
            <ul className={styles.list}>  
              {docentesEnvolvidos.map((docente, index) => (  
                <li key={docente.nif} className={styles.listItem}>  
                  {docente}  
                  <button type="button" onClick={() => deleteDocente(index)} className={styles.button}>  
                    Remover  
                  </button>  
                </li>  
              ))}  
            </ul>  
          </div>  
        )}  
        <div className={styles.formGroup}>  
          <input  
            type="text"  
            name="elogios"  
            placeholder="Elogios"  
            value={elogios}  
            onChange={(e) => setElogios(e.target.value)}  
            className={styles.input}
          />  
        </div>  
        <div className={styles.formGroup}>  
          <input  
            type="text"  
            name="dificuldades"  
            placeholder="Dificuldades"  
            value={dificuldades}  
            onChange={(e) => setDificuldades(e.target.value)}  
            className={styles.input}
          />  
        </div>  
        <div className={styles.formGroup}>  
          <input  
            type="text"  
            name="presenca"  
            placeholder="Presença"  
            value={presenca}  
            onChange={(e) => setPresenca(e.target.value)}  
            className={styles.input}
          />  
        </div>  
        <div className={styles.formGroup}>  
          <select  
            name="categorias"  
            value={categorias}  
            onChange={(e) => setCategorias(e.target.value)}  
            required  
            className={styles.select}
          >  
            <option value="">Selecione uma categoria</option>  
            {categories.map((category, index) => (  
              <option key={index} value={category}>{category}</option>  
            ))}  
          </select>  
        </div>  
      
        <button type="submit" onClick={handleCriarRVE} className={styles.button}>Criar RVE</button>  
      </form>  
    </div>  
  );  
};  

export default Rve;