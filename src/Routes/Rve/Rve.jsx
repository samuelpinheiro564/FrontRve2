import React, { useState, useEffect } from 'react';  
import { AllUsers, CriarRve, createrve_usuarios, UserName } from '../../Data/server';  
import userData from '../../Data/dadosUser';   
import rveData from '../../Data/DadosRve';  
import styles from "../Rve/rve.module.css";
import { useNavigate } from 'react-router-dom';

const Rve = () => {  
  const [nifautor, setNifAutor] = useState('');  
  const [estudante, setEstudante] = useState('');  
  const [curso, setCurso] = useState('');  
  const [turma, setTurma] = useState('');  
  const [data, setData] = useState('');  
  const [hora, setHora] = useState('');  
  const [motivo, setMotivo] = useState('');  
  const [orientacoesestudante, setOrientacoesEstudante] = useState('');  
  const [descricaoocorrido, setDescricaoOcorrido] = useState('');  
  const [docenteAtual, setDocenteAtual] = useState('');  
  const [nifdocentes, setNifDocentes] = useState([]);  
  const [assinaturas] = useState(null);  
  const [elogios, setElogios] = useState('');  
  const [dificuldades, setDificuldades] = useState('');  
  const [presenca, setPresenca] = useState('');  
  const [categorias, setCategorias] = useState('');  
  const [id, setId] = useState(0);  
  const [listaDocentes, setListaDocentes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {  
    const dadosUser = userData.getUsers();   
    if (dadosUser.length > 0) {  
      setNifAutor(dadosUser[0][0].nif);  
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
      if (nifdocentes.includes(docenteAtual)) {  
        alert('Este docente já está na lista de envolvidos.');  
        return; 
      }  
      setNifDocentes([...nifdocentes, docenteAtual]);  
      setDocenteAtual('');   
  
      console.log('Docentes Selecionados:', [...nifdocentes, docenteAtual]);  
    } else {  
      alert('Selecione um docente antes de adicionar.');  
    }  
  };    
  console.log('Docentes Envolvidos:', nifdocentes);

  const deleteDocente = (index) => {  
    const updatedDocentes = nifdocentes.filter((_, i) => i !== index);  
    setDocentesEnvolvidos(updatedDocentes);  
  };   
  console.log('Docentes Envolvidos2:', nifdocentes);

  const handleCriarRVE = async (e) => {  
    e.preventDefault();  
    try {  
      const rve = {  
        id,  
        nifautor,  
        estudante,  
        curso,  
        turma,  
        data,  
        hora,  
        motivo,  
        orientacoesestudante,  
        descricaoocorrido,  
        nifdocentes,
        assinaturas,  
        elogios,  
        dificuldades,  
        presenca,  
        categorias,  
      };  
      rveData.addRve(rve);
      console.log("rve", rve);
      await CriarRve(rve);
      console.log(id);
      for (let i = 0; i < docentesenvolvidos.length; i++) {
        const dadosUser = await UserName(docentesenvolvidos[i]);
        console.log(dadosUser);
        const rve4 = rveData.getRves();
        console.log(rve4[0].id);
        const id_rve = rve4[0].id;
        const usuario_nif = dadosUser[0].nif;
        const datarve_usuario = { id_rve, usuario_nif };
        console.log(datarve_usuario);
        const userRve = await createrve_usuarios(datarve_usuario);
        console.log('User rves', userRve);
      }  
      navigate('/SuasRve');  
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
            value={orientacoesestudante}  
            onChange={(e) => setOrientacoesEstudante(e.target.value)}  
            required  
            className={styles.textarea}
          />  
        </div>  
        <div className={styles.formGroup}>  
          <textarea  
            name="descricaoOcorrido"  
            placeholder="Descrição do Ocorrido"  
            value={descricaoocorrido}  
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
        {nifdocentes.length > 0 && (  
          <div className={styles.formGroup}>  
            <h3>Docentes Envolvidos:</h3>  
            <ul className={styles.list}>  
              {nifdocentes.map((docente, index) => (  
                <li key={index} className={styles.listItem}>  
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
      
        <button type="submit" className={styles.button}>Criar RVE</button>  
      </form>  
    </div>  
  );  
};  

export default Rve;
