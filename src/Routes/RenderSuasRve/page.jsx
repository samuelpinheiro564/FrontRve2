import React, { useState, useEffect } from 'react';
import styles from "../RenderSuasRve/styles.module.css";
import { CriarCampoTexto, AllCamposTextoRve ,LoginUser} from '../../Data/server';
import userData from '../../Data/dadosUser';
import rveData from '../../Data/DadosRve';

const RenderSuasRve = () => {
    const [campotexto, setCampoTexto] = useState("");
    const [msgs, setMsgs] = useState([]);
    const rveDados = rveData.getRve();
    const currentUser = userData.getUsers()[0][0];

    const handleCampoTexto = async (e) => {
        e.preventDefault();
        try {
            const nifusuario = currentUser.nif;
            const data = new Date().toLocaleDateString();
            const hora = new Date().toLocaleTimeString();
            const idrve = rveDados[0][0].id;
            const conteudoCampo = {
                idrve,
                data,
                hora,
                nifusuario,
                campotexto
            };
            await CriarCampoTexto(conteudoCampo);
            setCampoTexto("");
        } catch (error) {
            console.error("Erro ao criar CampoTexto:", error);
            alert("Ocorreu um erro ao criar o CampoTexto.");
        }
    };

    useEffect(() => {
        const fetchAllMsg = async () => {
            const idrve = rveDados[0][0].id;
            const allMessages = await AllCamposTextoRve(Number(idrve));
            setMsgs(allMessages);
        };
        fetchAllMsg();
    }, [rveDados]);

    useEffect(() => {
        const fetchUserNames = async () => {
            try {
                const updatedMsgs = await Promise.all(
                    msgs.map(async (msg) => {
                        const user = await LoginUser(msg.nifusuario);
                        return { ...msg, username: user[0].nome };
                    })
                );
                setMsgs(updatedMsgs);
            } catch (error) {
                console.error("Erro ao buscar nomes dos usuários:", error);
            }
        };
        fetchUserNames();
    }, [msgs]);

    return (
        <>
            <h1 className={styles.testeh1}>Chat</h1>
            <div>
                {rveDados.map((item) => (
                    <div key={item.id}>
                        <h2 className={styles.h2}>{item.estudante}</h2>
                        <div className={styles.form}>
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
                    <h3 className={styles.h3}>{msg.campotexto}</h3>
                    <p className={styles.input}>{msg.hora}</p>
                    <p className={styles.input}>{msg.username}</p>
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
    );
};

export default RenderSuasRve;
