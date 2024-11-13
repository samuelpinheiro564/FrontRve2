import { useState, useEffect } from 'react';  
import axios from 'axios';  
import { parsePhoneNumber } from 'libphonenumber-js'; // Biblioteca para formatação e validação de números  

const Page = () => {  
    const [phone, setPhone] = useState('');  
    const [message, setMessage] = useState('');  
    const [success, setSuccess] = useState(null);  
    const [error, setError] = useState(null);  
    const [loading, setLoading] = useState(false);  

    const postData = async (url, data) => {  
        try {  
            const response = await axios.post(url, data, {  
                headers: {  
                    'Content-Type': 'application/json'  
                }  
            });  
            return response;  
        } catch (error) {  
            throw new Error(error.response?.data?.message || error.message);  
        }  
    };  

    const handleSubmit = async (e) => {  
        e.preventDefault();
        if (!phone || !message) {  
            setError('Por favor, preencha todos os campos.');  
            return;  
        }  

        // Validação e formatação do número  
        try {  
            const phoneNumber = parsePhoneNumber(phone, 'BR'); // 'BR' é o código do Brasil  
            if (!phoneNumber.isValid()) {  
                setError('Número de telefone inválido.');  
                return;  
            }  
            const formattedPhone = phoneNumber.formatInternational(); // Formato internacional: ex: +55 11 91234-5678  

            const url = 'http://localhost:4000/api/sendText';  
            const data = {  
                chatId: `${formattedPhone.replace(/\s+/g, '').replace(/-/g, '')}@c.us`, // Remove espaços e hifens  
                text: message,  
                session: 'default'  
            };  

            setLoading(true);  
            setError(null);  

            try {  
                const response = await postData(url, data);  
                    const response = await postData(url, data);  
                    if (response.status === 200) {  
                        setSuccess('Mensagem enviada com sucesso!');  
                        setMessage('');  
                        setPhone('');  
                    } else {  
                        setError('Mensagem enviada, mas houve um problema.');  
                    }  
                } catch (err) {  
                    setError('Erro ao enviar a mensagem: ' + (err.message));  
                } finally {  
                    setLoading(false);  
                }  
            } catch (err) {  
                setError('Erro ao formatar o número: ' + err.message);  
            }  
        };

        handleSubmit();
    }, [phone, message]);

    useEffect(() => {  
        if (success) {  
            const timer = setTimeout(() => {  
                setSuccess(null);  
            }, 3000);  
            return () => clearTimeout(timer);  
        }  
    }, [success]);  efault Page;
    return (  

    );  
};  