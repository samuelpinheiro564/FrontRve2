import React, { useEffect, useState } from "react";
import { MenorIdade } from "../../Data/server";
import styles from "./styles.module.css";

const SaidasNaoAssinadas = () => {
    const [menorIdade, setMenorIdade] = useState([]);

    useEffect(() => {
        const fetchMenorIdade = async () => {
            try {
                const response = await MenorIdade();
                setMenorIdade(response);
                console.log('Menor Idade:', response);
            } catch (error) {
                console.error('Erro ao buscar saídas não assinadas:', error);
            }
        };
        fetchMenorIdade();
    }, []);

    return (
        <div className={styles.container}>
            <h1>Saídas Não Assinadas</h1>
            <div container spacing={3}>
                {menorIdade.map((saida) => (
                    <div item xs={12} sm={6} md={4} key={saida.id}>
                        <div className={styles.card}>
                            <div>
                                <div variant="h5" component="div">
                                    {saida.nomealuno}
                                </div>
                                <div variant="body2" color="text.secondary">
                                    Curso: {saida.curso}
                                </div>
                                <div variant="body2" color="text.secondary">
                                    Turma: {saida.turma}
                                </div>
                                <div variant="body2" color="text.secondary">
                                    RA: {saida.alunora}
                                </div>
                                <div variant="body2" color="text.secondary">
                                    Data/Hora da Saída: {saida.datasaida} {saida.horasaida}
                                </div>
                                <div variant="body2" color="text.secondary">
                                    Justificativa: {saida.justificativa}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SaidasNaoAssinadas;
