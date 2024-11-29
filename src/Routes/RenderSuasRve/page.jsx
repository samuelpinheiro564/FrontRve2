import React, { useState, useEffect } from "react";
import styles from "../RenderSuasRve/styles.module.css";
import {
  CriarCampoTexto,
  AllCamposTextoRve,
} from "../../Data/server";
import userData from "../../Data/dadosUser";
import rveData from "../../Data/DadosRve";

const RenderSuasRve = () => {
  const [campotexto, setCampoTexto] = useState("");
  const [msgs, setMsgs] = useState([]); // Todas as mensagens
  const [visibleMsgs, setVisibleMsgs] = useState([]); // Mensagens visíveis
  const [currentPage, setCurrentPage] = useState(1); // Página atual
  const MESSAGES_PER_PAGE = 7; // Limite de mensagens visíveis por vez
  const rveDados = rveData.getRve()[0][0];
  const userDados = userData.getUsers()[0];

  const handleCampoTexto = async (e) => {
    e.preventDefault();
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
      await CriarCampoTexto(conteudoCampo);
      setCampoTexto(""); // Limpa o campo de texto após envio
    } catch (error) {
      console.error("Erro ao criar CampoTexto:", error);
    }
  };

  // Fetch inicial de mensagens
  useEffect(() => {
    const fetchAllMsg = async () => {
      try {
        const idrve = rveDados.id;
        const allMessages = await AllCamposTextoRve(Number(idrve));
        setMsgs(allMessages);
        setVisibleMsgs(allMessages.slice(0, MESSAGES_PER_PAGE));
      } catch (error) {
        console.error("Erro ao buscar mensagens:", error);
      }
    };
    fetchAllMsg();
  });

  // Scroll Handler para carregar mais mensagens
  const handleScroll = (e) => {
    const container = e.target;
    if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
      loadMoreMessages();
    }
  };

  // Carregar mais mensagens
  const loadMoreMessages = () => {
    const nextPage = currentPage + 1;
    const startIndex = currentPage * MESSAGES_PER_PAGE;
    const endIndex = startIndex + MESSAGES_PER_PAGE;
    const newVisibleMsgs = msgs.slice(0, endIndex);

    setVisibleMsgs(newVisibleMsgs);
    setCurrentPage(nextPage);
  };


  return (
    <>
      <h1 className={styles.testeh1}>Chat</h1>
      <div>
        <h2 className={styles.h2}>{rveDados.estudante}</h2>
        <div className={styles.form}>
          <div className={styles.formGroup}>
            <p className={styles.input}>{rveDados.nifautor}</p>
          </div>
          {/* ...outros campos... */}
        </div>
      </div>

      {/* Contêiner de mensagens */}
      <div
        className={styles.messagesContainer}
        style={{
          height: "500px", // Altura fixa para o contêiner (ajuste conforme necessário)
          overflowY: "auto",
        }}
        onScroll={handleScroll}
      >
        {visibleMsgs.map((msg) => (
          <div key={msg.id} className={styles.msg}>
            <h3 className={styles.h3}>{msg.campotexto}</h3>
            <p className={styles.input}>{msg.hora}</p>
            <p className={styles.input}>{msg.nomeusuario}</p>
          </div>
        ))}
      </div>

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
