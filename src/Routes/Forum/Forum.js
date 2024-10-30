// Forum.js  
import React, { useState, useEffect } from 'react';  
import {  getCampostextoRve,AllForum } from '../../Data/server'; // Lembre-se de criar esse serviço  
import './styles.css'; // Para estilizações, se você quiser
import rveData from '../../Data/DadosRve';  

const Forum = () => {  
    const [messages, setMessages] = useState([]); // Estado para armazenar mensagens  
    const [texto, setTexto] = useState(''); // Estado para nova mensagem 
    const [ setId] = useState(0); // Estado para armazenar ID de cada mensagem 
   // const [nif ] = useState(0); // Estado para armazenar NIF do usuário
    const [forum,setForum] = useState([]); // Estado para armazenar o forum
    const dadosRve = rveData.getRves();
    console.log(dadosRve);

    // Fetch messages when the component mounts  
    useEffect(() => {  
      const dadosRve = rveData.getRves();
      console.log(dadosRve);
      const allForum = async () => {
        try{
          const fetchedAllForum = await AllForum();
          setForum(fetchedAllForum);
          console.log('Forum:', forum);
        } catch (error) {
          console.error('Erro ao buscar RVE:', error);
        }
      }
      //chama todos os foruns e armazena no estado forum
        const loadMessages = async () => {  
            try {  
              const rve = rveData.getRves();
              console.log('RVE:', rve);
                const fetchedMessages = await getCampostextoRve(); // Chamando a função para buscar mensagens  
                setMessages(fetchedMessages);  
                console.log('Mensagens:', messages);
            } catch (error) {  
                console.error('Erro ao buscar mensagens:', error);  
            }  
        }; 
        //armazena todas as mensagens no estado messages 
        // Função para gerar um ID aleatório
        const gerarIdNumber = () => {  
          const randomId = Math.floor(Math.random() * 1000000);   
          setId(randomId);   
        };  
        gerarIdNumber();  
        loadMessages();  
        allForum();
    });  
console.log('Forum:', forum);
console.log('Mensagens:', messages);
console.log('Texto:', texto);
console.log('ID:', dadosRve.IdRVE);
  
   
    // Função para enviar uma nova mensagem  
    const handleSendMessage = async (e) => {  
      e.preventDefault(); // Previne o comportamento padrão do form  
  
      // Verificando se o texto está vazio  
      if (texto === '') return; // Não envia mensagens vazias  
  
      try {   
          // Verifica se o ID da RVE está no array do forum  
          const isIdValid = forum.some(IdRVE => IdRVE.id === IdRVE); // Verifica se existe um RVE no forum com o mesmo ID  
          
          if (!isIdValid) {  
              console.error('ID da RVE não encontrado no forum.');  
              alert('Não é possível enviar a mensagem. O ID da RVE não está associado a nenhum tópico do forum.'); // Mensagem de erro simples  
              return; // Saia da função se o ID não for válido  
          }  
  
       
          setMessages([...messages]); // Adiciona nova mensagem à lista  
          setTexto(''); // Limpa o campo de nova mensagem  
          setId(''); // Limpa o ID   
      } catch (error) {  
          console.error('Erro ao enviar mensagem:', error);  
      }  
  };

    return (  
        <div>  
            <h1>Fórum</h1>  
            <div className="messages-container">  
                <ul>  
                    {messages.map((msg, index) => (  
                        <li key={index}>{msg}</li> // Mostrando cada mensagem  
                    ))}  
                </ul>  
            </div>  
            <form onSubmit={handleSendMessage}>  
                <textarea  
                    value={texto}  
                    onChange={(e) => setTexto(e.target.value)}  
                    placeholder="Digite sua mensagem aqui"  
                    required  
                />  
                <button type="submit">Enviar</button>  
            </form>  
        </div>  
    );  
};  

export default Forum;