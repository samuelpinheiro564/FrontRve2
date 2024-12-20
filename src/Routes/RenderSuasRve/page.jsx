import React, { useState, useEffect } from "react";
import styles from "../RenderSuasRve/styles.module.css";
import { CriarCampoTexto, AllCamposTextoRve, assinarRve } from "../../Data/server";
import userData from "../../Data/dadosUser";
import rveData from "../../Data/DadosRve";
import { useNavigate } from "react-router-dom";

const RenderSuasRve = () => {
  const [campotexto, setCampoTexto] = useState("");
  const [msgs, setMsgs] = useState([]); // Todas as mensagens
  const [visibleMsgs, setVisibleMsgs] = useState([]); // Mensagens visíveis
  const [currentPage, setCurrentPage] = useState(1); // Página atual
  const MESSAGES_PER_PAGE = 70; // Limite de mensagens visíveis por vez
  const rveDados = rveData.getRve()[0][0];
  const navigate = useNavigate();
  const userDados = userData.getUsers()[0];

  const handleCampoTexto = async (e) => {
    e.preventDefault();
    if (!campotexto.trim()) {
      // Se o campo de texto estiver vazio, não faça nada
      return;
    }
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
        const messagesWithAuthorFlag = allMessages.map(msg => ({
          ...msg,
          isAuthor: msg.nifusuario === userDados.nif
        }));

        setMsgs(messagesWithAuthorFlag);
        setVisibleMsgs(messagesWithAuthorFlag.slice(0, MESSAGES_PER_PAGE));
      } catch (error) {
        console.error("Erro ao buscar mensagens:", error);
      }
    };
    fetchAllMsg();
  }); // Adicionei rveDados.id e userDados.nif como dependências para garantir que o efeito seja executado corretamente

  // Scroll Handler para carregar mais mensagens
  const handleScroll = (e) => {
    const container = e.target;
    if (
      container.scrollTop + container.clientHeight >=
      container.scrollHeight
    ) {
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

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleAssinarRve = async () => {
    try {
      const id = rveDados.id;
      console.log("ID RVE:", id);
      const assinatura = userDados.nome;
      console.log("NIF Usuario:", assinatura);
      await assinarRve(String(assinatura), id);
      console.log("RVE assinado com sucesso!");
      navigate("/SuasRve");
    } catch (error) {
      console.error("Erro ao assinar RVE:", error);
    }
  };

  return (
    <section className={styles.conteiner}>
      <h1 className={styles.testeh1}>Chat</h1>
      <div>
        <h2 className={styles.h2}>{rveDados.estudante}</h2>
        <div className={styles.form}>
          <div className={styles.formGroup}>
            <p className={styles.input}> Curso : {rveDados.curso}</p>
            <p className={styles.input}>{rveDados.nifautor}</p>
            <p className={styles.input}>Data : {formatDate(rveDados.data)}</p>
            <p className={styles.input}>Hora : {rveDados.hora}</p>
            <p className={styles.input}>Motivo : {rveDados.motivo}</p>
            <p className={styles.input}>Descrição : {rveDados.descricaoocorrido}</p>
            <p className={styles.input}>Dificuldados do Estudante : {rveDados.dificuldades}</p>
            <p className={styles.input}>Elogios : {rveDados.elogios}</p>
            <p className={styles.input}>Orientações para o estudante : {rveDados.orientacoesestudante}</p>
            <p className={styles.input}>Turma : {rveDados.turma}</p>
            
          </div>
        </div>
      </div>
      <div
        className={styles.messagesContainer}
        onScroll={handleScroll}
      >
        {visibleMsgs.map((msg) => (
          <div key={msg.id} className={msg.isAuthor ? styles.msgAutor : styles.msgOthers}>
            <div className={styles.div2}>
              <p className={styles.p2}>{msg.nomeusuario}</p>
              <p className={styles.p}>{msg.hora}</p>
            </div>
            <text className={styles.text}>{msg.campotexto}</text>
          </div>
        ))}
      </div>

      <div className={styles.formGroup}>
        <textarea
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

      <button
        type="button"
        className={styles.button}
        onClick={handleAssinarRve}
      >
        Assinar
      </button>
    </section>
  );
};

export default RenderSuasRve;
