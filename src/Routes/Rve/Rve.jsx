import React, { useState, useEffect } from 'react';
import styles from '../Rve/styles.module.css'; // CSS modules
import { AllUsersNif, CriarRve, UserName, createrve_usuarios } from '../../Data/server'; // APIs
import rveData from '../../Data/DadosRve'; // RVE data handling
import userData from '../../Data/dadosUser'; // User data
import Notificacaozap from '../../components/NotificacaoZap/Notificazaozap'; // Notification component
import { useNavigate } from 'react-router-dom';

const Rve = () => {
  const [estudante, setEstudante] = useState('');
  const [curso, setCurso] = useState('');
  const [turma, setTurma] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [motivo, setMotivo] = useState('');
  const [orientacoesestudante, setOrientacoesEstudante] = useState('');
  const [descricaoocorrido, setDescricaoocorrido] = useState('');
  const [docenteAtual, setDocenteAtual] = useState('');
  const [docentesenvolvidos, setDocentesenvolvidos] = useState([]);
  const [elogios, setElogios] = useState('');
  const [dificuldades, setDificuldades] = useState('');
  const [presenca] = useState('');
  const [categorias, setCategorias] = useState('');
  const [listaDocentes, setListaDocentes] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch docentes ao carregar o componente
    const fetchDocentes = async () => {
      try {
        const userDados = userData.getUsers()[0];
        const docents = await AllUsersNif(userDados.nif);
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
      if (docentesenvolvidos.includes(docenteAtual)) {
        alert('Este docente já está na lista de envolvidos.');
        return;
      }
      setDocentesenvolvidos([...docentesenvolvidos, docenteAtual]);
      setDocenteAtual('');
    } else {
      alert('Selecione um docente antes de adicionar.');
    }
  };

  const deleteDocente = (index) => {
    const updatedDocentes = docentesenvolvidos.filter((_, i) => i !== index);
    setDocentesenvolvidos(updatedDocentes);
  };

  const generateCampoTextoId = () => Math.floor(Math.random() * 1000000);

  const handleCriarRVE = async (e) => {
    e.preventDefault();

    const currentDate = new Date();
    const selectedDate = new Date(`${data}T${hora}`);
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    if (selectedDate > currentDate) {
      alert('A data e hora não podem ser maiores que a data e hora atuais.');
      return;
    }

    if (selectedDate < oneYearAgo) {
      alert('A data e hora não podem ser menores que um ano atrás.');
      return;
    }

    try {
      const id = generateCampoTextoId();
      const user = userData.getUsers();
      const nifautor = user[0].nif;
      const nomeAutor = user[0].nome;
      docentesenvolvidos.push(nomeAutor);

      const dadosUser1 = [];
      for (const docente of docentesenvolvidos) {
        const dadosUser12 = await UserName(docente);
        dadosUser1.push(dadosUser12[0].nif);
      }

      const rve = {
        id,
        nifautor,
        nifsusuarios: dadosUser1,
        estudante,
        curso,
        turma,
        data,
        hora,
        motivo,
        orientacoesestudante,
        descricaoocorrido,
        dificuldades,
        presenca,
        elogios,
        assinaturas: [],
        numberusers: docentesenvolvidos.length,
      };

      rveData.addRve([rve]);
      await CriarRve(rve);

      for (const docente of docentesenvolvidos) {
        const dadosUser = await UserName(docente);
        const id_rve = rve.id;
        const usuario_nif = dadosUser[0].nif;
console.log('id_rve:', id_rve);
console.log('usuario_nif:', usuario_nif);
        await createrve_usuarios(id_rve, usuario_nif);

        <Notificacaozap
          phone={`55${dadosUser[0].telefone}`}
          message={'Você foi convidado para comentar em uma nova RVE.'}
        />;
      }

      navigate('/RenderSuasRve');
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
            name="descricaoocorrido"
            placeholder="Descrição do Ocorrido"
            value={descricaoocorrido}
            onChange={(e) => setDescricaoocorrido(e.target.value)}
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
              <option key={docente.nif} value={`${docente.nome}`}>
                {docente.nome}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={addDocente}
            className={styles.button}
          >
            Adicionar Docente
          </button>
        </div>
        {docentesenvolvidos.length > 0 && (
          <div className={styles.formGroup}>
            <h3 className={styles.h3}>Docentes Envolvidos:</h3>
            <ul className={styles.list}>
              {docentesenvolvidos.map((docente, index) => (
                <li key={index} className={styles.listItem}>
                  {docente}
                  <button
                    type="button"
                    onClick={() => deleteDocente(index)}
                    className={styles.button}
                  >
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
          <select
            name="categorias"
            value={categorias}
            onChange={(e) => setCategorias(e.target.value)}
            required
            className={styles.select}
          >
            <option value="">Selecione uma categoria</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className={styles.button}>
          Criar RVE
        </button>
      </form>
    </div>
  );
};

export default Rve;
