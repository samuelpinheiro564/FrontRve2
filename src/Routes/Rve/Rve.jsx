import React, { useState, useEffect } from "react";
import {
  AllUsers,
  CriarRve,
  createrve_usuarios,
  UserName,
  CriarCampoTexto,
  AllCamposTextoRve

} from "../../Data/server";
import userData from "../../Data/dadosUser";
import rveData from "../../Data/DadosRve";
import styles from "../Rve/rve.module.css";

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
  const [Dadosrve] = useState([]);
  const [campoTexto, setCampoTexto] = useState("");
  const [msgs]=useState([]);

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

      console.log("Docentes Selecionados:", [
        ...docentesenvolvidos,
        docenteAtual,
      ]);
    } else {
      alert("Selecione um docente antes de adicionar.");
    }
  };
  console.log("Docentes Envolvidos:", docentesenvolvidos);

  const deleteDocente = (index) => {
    const updatedDocentes = docentesenvolvidos.filter((_, i) => i !== index);
    setDocentesenvolvidos(updatedDocentes);
  };
  console.log("Docentes Envolvidos2:", docentesenvolvidos);

  const handleRve = (e) => {
    Dadosrve(rveData.getRve());
    console.log(Dadosrve());
  };
  const generateCampoTextoId = () => {
    return Math.floor(Math.random() * 1000000);
  };

  const handleCriarRVE = async (e) => {
    e.preventDefault();
    try {
      const id = generateCampoTextoId();
      const user = userData.getUsers();
      console.log("user", user);
      const nifautor = user[0][0].nif;
      console.log("nifautor", nifautor);
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
        presenca
      };
      rveData.addRve(rve);
      console.log("rve", rve);
      await CriarRve(rve);
      console.log(id);
      const dataUser = userData.getUsers();
      console.log("dataUser:", dataUser[0][0].nome);
      const updatedDocentesEnvolvidos = [...docentesenvolvidos, dataUser[0][0].nome];
      console.log(updatedDocentesEnvolvidos);
      for (let i = 0; i < updatedDocentesEnvolvidos.length; i++) {
        console.log(updatedDocentesEnvolvidos);
        const dadosUser = await UserName(updatedDocentesEnvolvidos[i].nome);
        console.log(dadosUser);
        const rve4 = rveData.getRve();
        console.log(rve4[0]);
        console.log(rve4[0].id);
        const id_rve = rve4[0].id;
        const usuario_nif = dadosUser[0].nif;
        const datarve_usuario = { id_rve, usuario_nif };
        console.log(datarve_usuario);
        const userRve = await createrve_usuarios(datarve_usuario);
        console.log("User rves", userRve);
        console.log(i);
      }
      setChatAtivo(true);
      handleRve(e);
    } catch (error) {
      console.error("Erro ao criar RVE:", error);
      alert("Ocorreu um erro ao criar o RVE.");
    }
  };

  const handleCampoTexto = async (e) => {
    e.preventDefault();
    try {
      const  id = generateCampoTextoId();
      const rve = rveData.getRve();
      const Idrve = rve[0][0].id;
      console.log("rve", rve);
      const user = userData.getUsers();
      const nifusuario = user[0][0].nif;
      console.log("nifusuario", nifusuario);
      console.log("Idrve", Idrve);
      const conteudoCampo = {
        id,
        Idrve,
        data,
        hora,
        nifusuario,
        campoTexto
      };
      console.log("CampoTextoRve", conteudoCampo);
     const CriarCampo= await CriarCampoTexto(conteudoCampo);
      console.log("CampoTextoRve", CriarCampo);
    } catch (error) {
      console.error("Erro ao criar CampoTexto:", error);
      alert("Ocorreu um erro ao criar o CampoTexto.");
    }
  };

  useEffect(() => {
    if(chatAtivo === true){
    const AllMsg = async () => {

        msgs(await AllCamposTextoRve());
  


    };}

    AllMsg();
  });
  
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
            {Dadosrve.map((item) => (
              <div key={item.id}>
                <h2>{item.estudante}</h2>
                <p>{item.motivo}</p>
                <p>{item.descricaoocorrido}</p>
                <p>{item.curso}</p>
                <p>{item.turma}</p>
                <p>{item.data}</p>
                <p>{item.hora}</p>
                <p>{item.orientacoesEstudante}</p>
                <p>{item.docentesenvolvidos.join(", ")}</p>
                <p>{item.elogios}</p>
                <p>{item.dificuldades}</p>
                <p>{item.presenca}</p>
                <p>{item.categorias}</p>
              </div>
            ))}
          </div>

          <div className={styles.formGroup}>
            <input
              type="text"
              name="campoTexto"
              placeholder="Escreva comentario aqui"
              value={campoTexto}
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
