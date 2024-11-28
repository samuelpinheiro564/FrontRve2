import React, { useState, useEffect } from "react";
import styles from "../RenderSuasRve/styles.module.css";
import {
  CriarCampoTexto,
  AllCamposTextoRve,
  UserName,
} from "../../Data/server";
import userData from "../../Data/dadosUser";
import rveData from "../../Data/DadosRve";

const RenderSuasRve = () => {
  const [campotexto, setCampoTexto] = useState("");
  const [msgs, setMsgs] = useState([]);
  const rveDados = rveData.getRve()[0][0];
  const userDados = userData.getUsers()[0];

  const handleCampoTexto = async (e) => {
    e.preventDefault();
    console.log("Conteúdo do campo texto:", campotexto); // Verificar valor antes do envio
    try {
      const nifusuario = userDados.nif;
      const data = new Date().toLocaleDateString();
      const hora = new Date().toLocaleTimeString();
      const idrve = rveDados.id;
      const conteudoCampo = {
        idrve,
        data,
        hora,
        nifusuario,
        nomeusuario: userDados.nome,
        campotexto,
      };
      console.log("Conteúdo enviado:", conteudoCampo);
      await CriarCampoTexto(conteudoCampo);
      setCampoTexto(""); // Limpa o campo de texto após envio
      fetchAllMsg(); // Atualiza as mensagens após o envio
    } catch (error) {
      console.error("Erro ao criar CampoTexto:", error);
      alert("Ocorreu um erro ao criar o CampoTexto.");
    }
  };

  const fetchAllMsg = async () => {
    try {
      const idrve = rveDados.id;
      const allMessages = await AllCamposTextoRve(Number(idrve));
      setMsgs(allMessages);
    } catch (error) {
      console.error("Erro ao buscar mensagens:", error);
    }
  };

  useEffect(() => {
    fetchAllMsg();
  }, [rveDados]);

  useEffect(() => {
    const fetchUserNames = async () => {
      try {
        const updatedMsgs = await Promise.all(
          msgs.map(async (msg) => {
            const user = await UserName(userDados.nome);
            return { ...msg, username: user[0].nome };
          })
        );
        setMsgs(updatedMsgs);
      } catch (error) {
        console.error("Erro ao buscar nomes dos usuários:", error);
      }
    };
    fetchUserNames();
  }, [msgs]); // Atualiza apenas quando msgs mudar

  return (
    <>
      <h1 className={styles.testeh1}>Chat</h1>
      <div>
        <h2 className={styles.h2}>{rveDados.estudante}</h2>
        <div className={styles.form}>
          {/* Informações do RVE */}
          <div className={styles.formGroup}>
            <p className={styles.input}>{rveDados.nifautor}</p>
          </div>
          <div className={styles.formGroup}>
            <p className={styles.input}>{rveDados.motivo}</p>
          </div>
          <div className={styles.formGroup}>
            <p className={styles.input}>{rveDados.descricaoocorrido}</p>
          </div>
          <div className={styles.formGroup}>
            <p className={styles.input}>{rveDados.curso}</p>
          </div>
          <div className={styles.formGroup}>
            <p className={styles.input}>{rveDados.turma}</p>
          </div>
          <div className={styles.formGroup}>
            <p className={styles.input}>{rveDados.data}</p>
          </div>
          <div className={styles.formGroup}>
            <p className={styles.input}>{rveDados.hora}</p>
          </div>
          <div className={styles.formGroup}>
            <p className={styles.input}>{rveDados.orientacoesestudante}</p>
          </div>
          <div className={styles.formGroup}>
            <p className={styles.input}>{rveDados.dificuldades}</p>
          </div>
          <div className={styles.formGroup}>
            <p className={styles.input}>{rveDados.presenca}</p>
          </div>
        </div>
      </div>

      {/* Mensagens */}
      {msgs.map((msg) => (
        <div key={msg.id}>
          <h3 className={styles.h3}>{msg.campotexto}</h3>
          <p className={styles.input}>{msg.hora}</p>
          <p className={styles.input}>{msg.username}</p>
        </div>
      ))}

      {/* Input para campo de texto */}
      <div className={styles.formGroup}>
        <input
          type="text"
          name="campoTexto"
          placeholder="Escreva comentário aqui"
          value={campotexto}
          onChange={(e) => setCampoTexto(e.target.value)}
          className={styles.input}
        />
      </div>
      <button
        type="button"
        className={styles.button}
        onClick={handleCampoTexto}
      >
        Enviar mensagem
      </button>
    </>
  );
};

export default RenderSuasRve;
