import React, { useState, useEffect } from 'react';
import styles from './rve.module.css'; // Assuming you have a CSS module for styles
import { AllUsers, CriarRve, UserName, createrve_usuarios, AllCamposTextoRve, CriarCampoTexto } from '../../Data/server'; // Adjust the import paths as necessary
import rveData from '../../Data/DadosRve'; // Adjust the import path as necessary
import userData from '../../Data/dadosUser'; // Adjust the import path as necessary
import Notificacaozap from '../../components/NotificacaoZap/Notificazaozap'; // Adjust the import path as necessary

const Rve = () => {
  const [estudante, setEstudante] = useState("");
  const [curso, setCurso] = useState("");
  const [turma, setTurma] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [motivo, setMotivo] = useState("");
  const [orientacoesestudante, setOrientacoesEstudante] = useState("");
  const [descricaoocorrido, setDescricaoocorrido] = useState("");
  const [docenteAtual, setDocenteAtual] = useState("");
  const [docentesenvolvidos, setDocentesenvolvidos] = useState([]);
  const [elogios, setElogios] = useState("");
  const [dificuldades, setDificuldades] = useState("");
  const [presenca, setPresenca] = useState("");
  const [categorias, setCategorias] = useState("");
  const [listaDocentes, setListaDocentes] = useState([]);
  const [chatAtivo, setChatAtivo] = useState(false);
  const [campotexto, setCampoTexto] = useState("");
  const [msgs, setMsgs] = useState([]);

  useEffect(() => {
    const fetchDocentes = async () => {
      try {
        const docents = await AllUsers();
        console.log("Docentes:", docents);
        if (Array.isArray(docents)) {
          setListaDocentes(docents);
        } else {
          console.error("Expected an array but got:", docents);
        }
      } catch (error) {
        console.error("Erro ao buscar docentes:", error);
      }
    };
    fetchDocentes();
  }, []);

  const categories = [
    "Aprendizagem",
    "Atitude/postura/comportamento",
    "Frequência",
    "Oficina/Segurança",
    "Relacionamento interpessoal",
    "Rendimento",
    "Saúde física",
    "Saúde mental",
    "Outras",
  ];

  const addDocente = () => {
    if (docenteAtual) {
      if (docentesenvolvidos.includes(docenteAtual)) {
        alert("Este docente já está na lista de envolvidos.");
        return;
      }
      setDocentesenvolvidos([...docentesenvolvidos, docenteAtual]);
      setDocenteAtual("");
      console.log("Docentes Selecionados:", docentesenvolvidos);
    } else {
      alert("Selecione um docente antes de adicionar.");
    }
  };

  const deleteDocente = (index) => {
    const updatedDocentes = docentesenvolvidos.filter((_, i) => i !== index);
    setDocentesenvolvidos(updatedDocentes);
  };

  const handleRve = async () => {
    try {
      const rve = rveData.getRve();
      console.log("RVE Data:", rve);
    } catch (error) {
      console.error("Erro ao buscar RVE:", error);
    }
  };

  const generateCampoTextoId = () => Math.floor(Math.random() * 1000000);

  const handleCriarRVE = async (e) => {
    e.preventDefault();
    try {
      const id = generateCampoTextoId();
      const user = userData.getUsers();
      console.log("User Data:", user);
      const nifautor = user[0][0].nif;
      console.log(nifautor);
      const nomeAutor = user[0][0].nome;
      console.log(nomeAutor);
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
        dificuldades,
        presenca,
      };
      rveData.addRve(rve);
      await CriarRve(rve);
      console.log("RVE created:", rve);
      docentesenvolvidos.push(nomeAutor);
      for (let i = 0; i < docentesenvolvidos.length; i++) {
        console.log("Docente:", docentesenvolvidos[i]);
        console.log("Docentes", docentesenvolvidos);
        const dadosUser = await UserName(docentesenvolvidos[i]);
        console.log("Dados do Docente:", dadosUser);
        const rveId = rveData.getRve()[0].id;
        console.log("RVE ID:", rveId);
        const usuario_nif = dadosUser[0].nif;
        console.log("NIF do Docente:", usuario_nif);
        const datarve_usuario = { id_rve: rveId, usuario_nif };
        await createrve_usuarios(datarve_usuario);
        console.log('Telefone', dadosUser[0].telefone);
        console.log('Nome do Convidado', docentesenvolvidos[i]);
        console.log('ID do RVE', rveId);
        <Notificacaozap phone={dadosUser[0].telefone} nomeConvidado={docentesenvolvidos[i]} rveId={rveId} />
      }
      setChatAtivo(true);
      handleRve();
    } catch (error) {
      console.error("Erro ao criar RVE:", error);
      alert("Ocorreu um erro ao criar o RVE.");
    }
  };

  const handleCampoTexto = async (e) => {
    e.preventDefault();
    try {
      const id = generateCampoTextoId();
      const rve = rveData.getRve();
      console.log("RVE Data:", rve);
      const idrve = rve[0].id;
      console.log(idrve);
      const user = userData.getUsers();
      const nifusuario = user[0][0].nif;
      console.log(nifusuario);
      const data = new Date().toLocaleDateString();
      console.log(data);
      const hora = new Date().toLocaleTimeString();
      console.log(hora);
      const conteudoCampo = {
        id,
        idrve,
        data,
        hora,
        nifusuario,
        campotexto,
      };
      console.log(conteudoCampo);
      await CriarCampoTexto(conteudoCampo);
      console.log("CampoTextoRve created:", conteudoCampo);
      setCampoTexto("");
    } catch (error) {
      console.error("Erro ao criar CampoTexto:", error);
      alert("Ocorreu um erro ao criar o CampoTexto.");
    }
  };

  useEffect(() => {
    if (!chatAtivo) return;
      const fetchAllMsg = async () => {
        const idrve = rveData.getRve()[0].id;
        const allMessages = await AllCamposTextoRve(idrve);
        setMsgs(allMessages);
     
      };

      fetchAllMsg();

  });

  const rveDados = rveData.getRve();

  return (
    <div className={styles.container}>
      {!chatAtivo ? (
        <>
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
                <h3>Docentes Envolvidos:</h3>
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
        </>
      ) : (
        <>
          <h1>Chat</h1>
          <div>
            {rveDados.map((item) => (
              <div key={item.id}>
                <h2>{item.estudante}</h2>
                <div  className={styles.form}>
                <div className={styles.formGroup}>
                  <p className={styles.input}>{item.nifautor}</p>
                </div>
                <div className={styles.formGroup}>
                  <p className={styles.input}>{item.motivo}</p>
                </div>
                <div className={styles.formGroup}>
                  <p className={styles.input}>{item.descricaoocorrido}</p>
                </div>
                <div className={styles.formGroup}>
                  <p className={styles.input}>{item.curso}</p>
                </div>
                <div className={styles.formGroup}>
                  <p className={styles.input}>{item.turma}</p>
                </div>
                <div className={styles.formGroup}>
                  <p className={styles.input}>{item.data}</p>
                </div>
                <div className={styles.formGroup}>
                  <p className={styles.input}>{item.hora}</p>
                </div>
                <div className={styles.formGroup}>
                  <p className={styles.input}>{item.orientacoesestudante}</p>
                </div>
                <div className={styles.formGroup}>
                  <p className={styles.input}>{item.dificuldades}</p>
                </div>
                <div className={styles.formGroup}>
                  <p className={styles.input}>{item.presenca}</p>
                </div>
              </div>
              </div>
            ))}
          </div>
          {msgs.map((msg) => (
            <div key={msg.id}>
              <h3>{msg.campoTexto}</h3>
              <p>{msg.hora}</p>
              <p>{msg.nifusuario}</p>
            </div>
          ))}
          <div className={styles.formGroup}>
            <input
              type="text"
              name="campoTexto"
              placeholder="Escreva comentario aqui"
              value={campotexto}
              onChange={(e) => setCampoTexto(e.target.value)}
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.button} onClick={handleCampoTexto}>
            Enviar mensagem
          </button>
        </>
      )}
    </div>
  );
};

export default Rve;
