import  { useEffect} from 'react';
import axios from 'axios';


const Notificacaozap = (phone,nomeConvidado, rveId) => {
   
useEffect(() => {

    const postData = async (url, data) => {
        try {
            console.log('Sending to URL:', url);
            console.log('Data:', data);
            const response = await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Response:', response);
            return response;
        } catch (error) {
            console.error('Error response:', error.response);
            throw new Error(error.response?.data?.message || error.message);
        }
    };

    const handleSubmit = async () => {
        const url = 'http://localhost:3000/api/sendText';
        const data = {
            chatId: `${phone}@c.us`,
            text: `Você ${nomeConvidado} foi convidado para comentar em uma rve. Acesse o link: http://localhost:3000/rve/${rveId}`,
            session: 'default' // Usando a sessão padrão
        };

        await postData(url, data);
    };

    handleSubmit();
    postData();
}, [phone, nomeConvidado, rveId]);
};

export default Notificacaozap;