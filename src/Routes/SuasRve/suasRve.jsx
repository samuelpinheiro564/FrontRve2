import React, { useState, useEffect } from "react";
import userData from "../../Data/dadosUser";
import { getAllUsersrve_usuarios, ObterRvePorID, ObterRvesSemAssinatura, ObterRvesCompletascomoautor } from "../../Data/server";
import styles from "../SuasRve/styles.module.css"; // Importando o CSS
import { useNavigate } from "react-router-dom";
import rveData from "../../Data/DadosRve";

const SuasRve = () => {
  const [listRve, setListRve] = useState([]);
  const [filteredRve, setFilteredRve] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filtro, setFiltro] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState("estudante");
  const ITEMS_PER_PAGE = 5;
  const navigate = useNavigate(); // Inicializa o hook useNavigate

  useEffect(() => {
    const handleRves = async () => {
      const userNif = userData.getUsers();
      console.log("User NIF:", userNif[0].nif);
      console.log("Nome User", userNif[0].nome); // Log user NIF for debugging
      const rves = await getAllUsersrve_usuarios(userNif[0].nif);
      console.log("Fetched RVE data:", rves); // Log fetched data
      try {
        const assinatura = userNif[0].nome;
        console.log("Assinatura:", assinatura); // Log user signature for debugging
        const rveDetails = await ObterRvesSemAssinatura(assinatura);

        setListRve(rveDetails);
        setFilteredRve(rveDetails);
        console.log("Detailed RVE data:", rveDetails); // Log detailed RVE data for debugging
      } catch (error) {
        console.error("Erro ao buscar RVEs:", error);
      }
    };
    handleRves();
  }, []); // Empty dependency array ensures this runs only once

  useEffect(() => {
    const filterRves = () => {
      let filtered = listRve;
      if (filtro !== "") {
        switch (tipoFiltro) {
          case "estudante":
            filtered = listRve.filter(
              (rve) =>
                rve.estudante &&
                rve.estudante.toLowerCase().includes(filtro.toLowerCase())
            );
            break;
          case "curso":
            filtered = listRve.filter(
              (rve) =>
                rve.curso &&
                rve.curso.toLowerCase().includes(filtro.toLowerCase())
            );
            break;
          case "turma":
            filtered = listRve.filter(
              (rve) =>
                rve.turma &&
                rve.turma.toLowerCase().includes(filtro.toLowerCase())
            );
            break;
            case "assinadas":
             
              break;
          default:
        }
      }
      setFilteredRve(filtered);
    };
    filterRves();
  }, [filtro, tipoFiltro, listRve]);
  

  const Assinadas = async (e) => {
    const assinatura = userData.getUsers()[0].nome;
    console.log("Assinatura:", assinatura); // Log user signature for debugging
    const rvesautor = await ObterRvesCompletascomoautor(assinatura);
    console.log("Rves autor:", rvesautor)
    setListRve(rvesautor);
    setFilteredRve(rvesautor);
  };



  const handleOrdenarPorDataeHoraMaisRecente = () => {
    const sorted = [...filteredRve].sort(
      (a, b) => new Date(b.data) - new Date(a.data)
    );
    setFilteredRve(sorted);
    console.log("Sorted RVE data:", sorted); // Log sorted RVE data for debugging
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - ITEMS_PER_PAGE, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + ITEMS_PER_PAGE, filteredRve.length - ITEMS_PER_PAGE)
    );
  };

  const handleRve = async (id) => {
    if (!id) {
      console.error("ID is null or undefined");
      return;
    }
    localStorage.setItem("selectedRveId", id);
    console.log("Selected RVE ID:", id); // Log selected RVE ID for debugging
    const rveSelected = await ObterRvePorID(id);
    console.log("Selected RVE:", rveSelected); // Log selected RVE for debugging
    rveData.addRve(rveSelected); // Wrap the result in an array
    navigate("/RenderSuasRve"); // o chatAtivo é um parâmetro que indica que o chat está ativo
  };

  const currentItems = filteredRve.slice(
    currentIndex,
    currentIndex + ITEMS_PER_PAGE
  );
  console.log("Current RVE data:", currentItems); // Log current RVE data for debugging

  return (
    <div className={styles.container}>
      <div className={styles.filter}>
        <input
          type="text"
          placeholder={`Buscar por ${tipoFiltro}`}
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className={styles.input}
        />
        <select
          value={tipoFiltro}
          onChange={(e) => setTipoFiltro(e.target.value)}
          className={styles.input}
        >
          <option value="estudante">Estudante</option>
          <option value="curso">Curso</option>
          <option value="turma">Turma</option>
        </select>
        <button
          onClick={handleOrdenarPorDataeHoraMaisRecente}
          className={styles.button}
        >
          Ordenar por Data e Hora (Mais Recente)
        </button>


        <button
          onClick={Assinadas}
          className={styles.button}
        >
         RVES já Assinadas
        </button>
      </div>
      {filteredRve.length > 0 ? (
        <div>
          {currentItems.map((rveItem, index) => (
            <button
              key={index}
              onClick={() => handleRve(rveItem.id)}
              className={styles.cardButton}
            >
            
              <div className={styles.card}>
                <p className={styles.cardText}>
                  Estudante: {rveItem.estudante}
                </p>
                <p className={styles.cardText}>Curso: {rveItem.curso}</p>
                <p className={styles.cardText}>
                  Data: {new Date(rveItem.data).toLocaleDateString()}
                </p>
                <p className={styles.cardText}>Hora: {rveItem.hora}</p>
                <p className={styles.cardText}>
                  Descrição: {rveItem.descricaoocorrido}
                </p>
                <p className={styles.cardText}>Motivo: {rveItem.motivo}</p>
                <p className={styles.cardText}>
                  Assinaturas: {rveItem.assinaturas.join(", ")}
                </p>
              </div>
            </button>
          ))}
          <div className={styles.pagination}>
            <button
              className={styles.button}
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              Previous
            </button>
            <button
              className={styles.button}
              onClick={handleNext}
              disabled={currentIndex + ITEMS_PER_PAGE >= filteredRve.length}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <p className={styles.noData}>No RVE data available.</p>
      )}
    </div>
  );
};

export default SuasRve;
