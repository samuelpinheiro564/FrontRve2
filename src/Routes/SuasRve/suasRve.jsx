import React, { useState, useEffect } from "react";
import userData from "../../Data/dadosUser";
import { getAllUsersrve_usuarios, RveById } from "../../Data/server";
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
      console.log("User NIF:", userNif[0].nif); // Log user NIF for debugging
      const rves = await getAllUsersrve_usuarios(userNif[0].nif);
      console.log("Fetched RVE data:", rves); // Log fetched data

      if (Array.isArray(rves)) {
        const detailedRves = await Promise.all(
          rves.map(async (rve) => {
            const rveDetails = await RveById(rve.id_rve);
            return { ...rve, ...rveDetails };
          })
        );
        setListRve(detailedRves);
        setFilteredRve(detailedRves);
        console.log("Detailed RVE data:", detailedRves); // Log detailed RVE data for debugging
      } else {
        setListRve([]);
        setFilteredRve([]);
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
            console.log("List RVE data:", listRve); // Log list RVE data for debugging
            filtered = listRve.filter(
              (rve) =>
                rve[0].estudante &&
                rve[0].estudante.toLowerCase().includes(filtro.toLowerCase())
            );
            console.log("Filtered RVE data:", filtered); // Log filtered RVE data for debugging
            break;
          case "curso":
            filtered = listRve.filter(
              (rve) =>
                rve[0].curso &&
                rve[0].curso.toLowerCase().includes(filtro.toLowerCase())
            );
            console.log("Filtered RVE data:", filtered); // Log filtered RVE data for debugging
            break;
          case "turma":
            filtered = listRve.filter(
              (rve) =>
                rve[0].turma &&
                rve[0].turma.toLowerCase().includes(filtro.toLowerCase())
            );
            console.log("Filtered RVE data:", filtered); // Log filtered RVE data for debugging
            break;
          default:
        }
      }
      setFilteredRve(filtered);
    };
    filterRves();
  }, [filtro, tipoFiltro, listRve]);

  const handleOrdenarPorDataeHoraMaisRecente = () => {
    const sorted = [...filteredRve].sort(
      (a, b) => new Date(b[0].data ) - new Date(a[0].data)
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
    localStorage.setItem("selectedRveId", id);
    console.log("Selected RVE ID:", id); // Log selected RVE ID for debugging
    const rveSelected = await RveById(id);
    console.log("Selected RVE:", rveSelected); // Log selected RVE for debugging
    rveData.addRve(rveSelected); // Wrap the result in an array
    navigate("/RenderSuasRve"); // o chatAtivo é um parâmetro que indica que o chat está ativo
  };

  const currentItems = filteredRve.slice(
    currentIndex,
    currentIndex + ITEMS_PER_PAGE
  );

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
      </div>
      {filteredRve.length > 0 ? (
        <div>
          {currentItems.map((rveItem, index) => (
            <button
              key={index}
              onClick={() => handleRve(rveItem.id_rve)}
              className={styles.cardButton}
            >
              <div className={styles.card}>
                <p className={styles.cardText}>ID: {rveItem.id_rve}</p>
                <p className={styles.cardText}>
                  Estudante: {rveItem[0].estudante}
                </p>
                <p className={styles.cardText}>Curso: {rveItem.curso}</p>
                <p className={styles.cardText}>
                  Data: {new Date(rveItem[0].data).toLocaleDateString()}
                </p>
                <p className={styles.cardText}>Hora: {rveItem[0].hora}</p>
                <p className={styles.cardText}>
                  Descrição: {rveItem.descricaoocorrido}
                </p>
                <p className={styles.cardText}>
                  Dificuldades: {rveItem.dificuldades}
                </p>
                <p className={styles.cardText}>Elogios: {rveItem.elogios}</p>
                <p className={styles.cardText}>Motivo: {rveItem.motivo}</p>
                <p className={styles.cardText}>
                  Orientações: {rveItem.orientacoesestudante}
                </p>
                <p className={styles.cardText}>Presença: {rveItem.presenca}</p>
                <p className={styles.cardText}>Turma: {rveItem.turma}</p>
                <p className={styles.cardText}>
                  Assinaturas:{" "}
                  {rveItem.assinaturas ? rveItem.assinaturas.join(", ") : "N/A"}
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
