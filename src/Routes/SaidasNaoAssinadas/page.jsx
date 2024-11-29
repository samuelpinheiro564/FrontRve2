import React, { useEffect, useState } from "react";
import { getMenorIdade, postAssinaturaAnaq } from "../../Data/server";
import styles from "./styles.module.css";
import userData from "../../Data/dadosUser";

const SaidasNaoAssinadas = () => {
    const [menorIdade, setMenorIdade] = useState([]);

    useEffect(() => {
        const fetchMenorIdade = async () => {
            try {
                const response = await getMenorIdade();
                console.log('Menor Idade:', response);
                setMenorIdade(response);
            } catch (error) {
                console.error('Erro ao buscar saídas não assinadas:', error);
            }
        };
        fetchMenorIdade();
    }, []); // Adicionei um array vazio para garantir que o useEffect seja executado apenas uma vez

    const handleAssinaturaAnaq = async (id) => {
        try {
            const assinaturaanaq = userData.getUsers()[0].nome;
            console.log(assinaturaanaq);
            await postAssinaturaAnaq(id, { assinaturaanaq }); // Passe um objeto com a assinatura
            console.log('id:', id);
            window.location.reload(); // Force the page to reload
        } catch (error) {
            console.error('Erro ao enviar assinatura Anaq:', error);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Saídas Não Assinadas</h1>
            <div className={styles.container}>
                {menorIdade.map((saida) => (
                    <div key={saida.id}>
                        <div className={styles.card}>
                            <div>
                                <div>{saida.nomealuno}</div>
                                <div>Curso: {saida.curso}</div>
                                <div>Turma: {saida.turma}</div>
                                <div>RA: {saida.alunora}</div>
                                <div>Data/Hora da Saída: {saida.datasaida}</div>
                                <div>Justificativa: {saida.justificativa}</div>
                                <button type="button" onClick={() => handleAssinaturaAnaq(saida.id)}>
                                    Assinar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SaidasNaoAssinadas;
