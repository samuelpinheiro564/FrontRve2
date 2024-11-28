import { useState, useEffect } from 'react';  
import { UltimaSaida, AllSaida } from '../../Data/server';

const NotificacaoSec = () => {
  const [saidaUnica, setSaidaUnica] = useState([]);
  const [saida, setsaida] = useState([]);
  const [historicoSaida, setHistoricoSaida] = useState(false);
  


  useEffect(() => {
    const handleUltimaSaida = async () => {
      try {
        const response = await UltimaSaida();
        const ultimaSaida = response[0];
        setSaidaUnica(ultimaSaida);
        console.log('Ultima saída:', saidaUnica); 
        historicoSaida(false);   
      } catch (error) {
        console.error('Erro ao buscar a última saída:', error);
      }
    };

    const handleAllSaida = async () => {
      try {
        const response = await AllSaida();
     setsaida(response);
     historicoSaida(true);
        console.log('Todas as saídas:', saida);
      } catch (error) {
        console.error('Erro ao buscar todas as saídas:', error);
      }
    };

    handleUltimaSaida();
    handleAllSaida();
  });

  const handleHistoricoSaida =  () => {
    console.log('Histórico de saídas');
    setHistoricoSaida(true);    
  }
  const handleUltimaSaida =  () => {
    console.log('Ultima saída');
    setHistoricoSaida(false);    
  }

  return (
    <div>
      {!saidaUnica.length > 0 ? (
        <>
          <div>
            <h1>Ultima Saída</h1>
                <h2>Nome do Aluno: {saidaUnica.nomealuno}</h2>
                <p>Curso: {saidaUnica.curso}</p>
                <p>Horário: {saidaUnica.horasaida}</p>
                <button type='submit' onClick={handleHistoricoSaida}>
                    Historico Saidas
                </button>
          </div>
        </>
      ) : (
        <>
        {saida.map((saida) => (
            <div key={saida.id}>
            <h2>Nome do Aluno: {saida.nomealuno}</h2>
            <p>Curso: {saida.curso}</p>
            <p>Horário: {saida.horasaida}</p>
          </div>
        ))}
        <button type='submit' onClick={handleUltimaSaida}>
            Ultima Saída
            </button>
        </>
      )}
    </div>
  );
};

export default NotificacaoSec;
