import { useState, useEffect } from 'react';  
import { UltimaSaida } from '../../Data/server';

const NotificacaoSec = () => {
  const [saidaUnica, setSaidaUnica] = useState(null);
  const [saida, setSaida] = useState([]);
  const [historicoSaida, setHistoricoSaida] = useState(false);

  useEffect(() => {
    const handleUltimaSaida = async () => {
      try {
        const response = await UltimaSaida();
        const ultimaSaida = response;
        setSaidaUnica(ultimaSaida);
        console.log('Ultima saída:', ultimaSaida); 
      } catch (error) {
        console.error('Erro ao buscar a última saída:', error);
      }
    };



  const handleHistoricoSaida = () => {
    console.log('Histórico de saídas');
    setHistoricoSaida(true);    
  }


  return (
    <section>
        <>
          {saida.map((saida) => (
            <div key={saida.id}>
              <h2>Nome do Aluno: {saida.nomealuno}</h2>
              <p>Curso: {saida.curso}</p>
              <p>Horário: {saida.horasaida}</p>
            </div>
          ))}
          <button type='button' onClick={handleUltimaSaida}>
            Ultima Saída
          </button>
        </>
      
    </section>
  );
};

export default NotificacaoSec;
