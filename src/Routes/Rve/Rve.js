import React, { useState, useEffect } from 'react';  
import { CriarRve } from '../../Data/server';  
import userData from '../../Data/dadosUser';  
import styles from '../Rve/rve.module.css';  

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
  const [docenteAtual, setDocenteAtual] = useState(''); // Estado para o input do docente atual  
  const [docentesEnvolvidos, setDocentesEnvolvidos] = useState([]); // Lista de docentes envolvidos  
  const [assinaturas, setAssinaturas] = useState('');  
  const [elogios, setElogios] = useState('');  
  const [dificuldades, setDificuldades] = useState('');  
  const [presenca, setPresenca] = useState('');  
  const [categorias, setCategorias] = useState('');  
  const [id, setId] = useState('');

  useEffect(() => {  
    const dadosUser = userData.getUsers();   
    console.log(dadosUser[0][0].nif);   
    setAutor(dadosUser[0][0].nif);  

    // Gerar ID aleatório ao montar o componente  
    const gerarIdNumber = () => {  
      const randomId = Math.floor(Math.random() * 1000000); // Gera um número aleatório  
      setId(randomId); // Armazena o ID no estado  
    };  

    gerarIdNumber(); // Chama a função para gerar o ID  
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
    if (docenteAtual.trim() !== '') {  
      setDocentesEnvolvidos([...docentesEnvolvidos, docenteAtual]);  
      setDocenteAtual(''); // Limpa o campo após adicionar  
    }  
  };  

  const deleteDocente = (index) => {  
    const updatedDocentes = docentesEnvolvidos.filter((_, i) => i !== index);  
    setDocentesEnvolvidos(updatedDocentes);  
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
        elogios,  
        dificuldades,  
        presenca,  
        categorias,  
      };  
      console.log('RVE:', rve);
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
      setAssinaturas('');  
      setElogios('');  
      setDificuldades('');  
      setPresenca('');  
      setCategorias('');  
      setDocenteAtual(''); // Limpa o campo do docente ao criar RVE  
    } catch (error) {  
      console.error('Erro ao criar RVE:', error);  
      alert('Erro ao cadastrar RVE');  
    }  
  };  

  return (  
    <div className={styles.container}>  
      <h1 className={styles.title}>Registro de Vida Escolar</h1>  
      <div className={styles.formContainer}>  
        <form onSubmit={handleCriarRVE} className={styles.form}>  
          <div className={styles.formGroup}>  
            <input  
              type="text"  
              name="estudante"  
              placeholder="Estudante"  
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
              placeholder="Curso"  
              value={curso}  
              onChange={(e) =>setCurso(e.target.value)}  
              required  
              className={styles.input}  
            />  
          </div>  
          <div className={styles.formGroup}>  
            <input  
              type="text"  
              name="turma"  
              placeholder="Turma"  
              value={turma}  
              onChange={(e) => setTurma(e.target.value)}  
              required  
              className={styles.input}  
            />  
          </div>  
          <div className={styles.formGroup}>  
            <input  
              type="date"  
              name="data"  
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
            <input  
              type="text"  
              name="motivo"  
              placeholder="Motivo"  
              value={motivo}  
              onChange={(e) => setMotivo(e.target.value)}  
              required  
              className={styles.input}  
            />  
          </div>  
          <div className={styles.formGroup}>  
            <textarea  
              name="orientacoesEstudante"  
              placeholder="Orientações ao Estudante"  
              value={orientacoesEstudante}  
              onChange={(e) => setOrientacoesEstudante(e.target.value)}  
              required  
              className={`${styles.input} ${styles.textarea}`}  
            />  
          </div>  
          <div className={styles.formGroup}>  
            <textarea  
              name="descricaoOcorrido"  
              placeholder="Descrição do Ocorrido"  
              value={descricaoOcorrido}  
              onChange={(e) => setDescricaoOcorrido(e.target.value)}  
              required  
              className={`${styles.input} ${styles.textarea}`}  
            />  
          </div>  
          <div className={styles.formGroup}>  
            <input  
              type="text"  
              name="docenteAtual"  
              placeholder="Adicionar Docente"  
              value={docenteAtual}  
              onChange={(e) => setDocenteAtual(e.target.value)}  
              className={styles.input}  
            />  
            <button type='button' onClick={AddDocente} className={styles.button}>  
              Adicionar Docente  
            </button>  
          </div>  
          {docentesEnvolvidos.length > 0 && (  
            <div className={styles.docenteList}>  
              <h3>Docentes Envolvidos:</h3>  
              <ul>  
                {docentesEnvolvidos.map((docente, index) => (  
                  <li key={index}>  
                    {docente}   
                    <button onClick={() => deleteDocente(index)} className={styles.deleteButton}>  
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
              name="assinaturas"  
              placeholder="Assinaturas"  
              value={assinaturas}  
              onChange={(e) => setAssinaturas(e.target.value)}  
              required  
              className={styles.input}  
            />  
          </div>  
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
              className={styles.input}  
            >  
              <option value="">Selecione uma categoria</option>  
              {categories.map((category, index) => (  
                <option key={index} value={category}>{category}</option>  
              ))}  
            </select>  
          </div>  
          <button type="submit" className={styles.submitButton}>Criar RVE</button>  
        </form>  
      </div>  
    </div>  
  );  
};  

export default Rve;