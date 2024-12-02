import { useState, useEffect } from 'react';  
import { UltimaSaida } from '../../Data/server';
import { useNavigate } from 'react-router-dom';
import styles from '../NotificacaoSec/styles.module.css';
const NotificacaoSec = () => {
  const [saidaUnica, setSaidaUnica] = useState(null);

  const [historicoSaida, setHistoricoSaida] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleUltimaSaida = async () => {
      try {
        const response = await UltimaSaida();
        const ultimaSaida = response;
        setSaidaUnica(ultimaSaida);
        console.log('Ultima saída:', saidaUnica); 
      } catch (error) {
        console.error('Erro ao buscar a última saída:', error);
      }
    };
    if (!historicoSaida) {
      handleUltimaSaida();
    }
  });
  const handleHistoricoSaida = () => {
    console.log('Histórico de saídas');
    setHistoricoSaida(true);   
    navigate('/HistoricoSaida'); 
  }


  return (
    <section>

          <button type='button' onClick={handleHistoricoSaida} className={styles.button}>
            Ultima Saída
          </button>

    </section>
  );
};

export default NotificacaoSec;
