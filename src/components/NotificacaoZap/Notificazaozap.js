import { useState, useEffect } from 'react';  
import axios from 'axios';  
// import { parsePhoneNumberWithError } from 'libphonenumber-js';  

const url = 'http://localhost:4000/api/sendText';  


const Notificacaozap = (phone) => {  
    const [success, setSuccess] = useState(null); 
    const [umaVez] = useState(true); 

    const postData = async (data) => {  
        try {  
            const response = await axios.post(url, data);  
            return response;  
        } catch (error) {  
            console.error('Error during POST request:', error);  
            throw new Error(error.response?.data?.message || error.message);  
        }  
    };  

    for (let i = 0; i < 1; i++) {
   
        const handleSubmit = async () => {  
            try {  
                const phonePronto ={phone}.replace(/[^0-9]/g, '');
                const data = {  
                    chatId: `${phonePronto}@c.us`,  
                    text: `O senhor(a) foi convidado para comentar em uma rve6.`,   
                    session: 'default'  
                };  

               // Adjust the loop condition as needed
                    const response = await postData(data);  
                    if (umaVez && response.status === 200) {  
                        setSuccess('Mensagem enviada com sucesso!');           
                    }  
              
            } catch (error) {  
                console.error('Failed to send message:', error);  
            }  
        };  

        handleSubmit();    
    console.log(umaVez);
}
    useEffect(() => {  
        if (success) {  
            const timer = setTimeout(() => {  
                setSuccess(null);  
            }, 3000);  
            return () => clearTimeout(timer);  
        }  
    }, [success]);  
};   

export default Notificacaozap;