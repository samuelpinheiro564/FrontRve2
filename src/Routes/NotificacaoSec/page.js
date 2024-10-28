import React, { useState } from 'react';
import axios from 'axios';
import styles from '../NotificacaoSec/notic.module.css';

const Page = () => {
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

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
            text: message,
            session: 'default' // Usando a sessão padrão
        };

        try {
            const response = await postData(url, data);
            if (response.status === 200) {
                setSuccess('Mensagem enviada com sucesso!');
                setError(null);
                // Limpar os campos após o envio
                setPhone('');
                setMessage('');
            } else {
                setError('Mensagem enviada.');
            }
        } catch (err) {
            setError('Erro ao enviar a mensagem: ' + (err.response?.data?.message || err.message));
            setSuccess(null);
            console.error('Erro:', err);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.header}>Enviar Mensagem para WhatsApp</h2>
            <div className={styles.formGroup}>
                <label htmlFor="phone">Número (formato internacional):</label>
                <input
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="message">Mensagem:</label>
                <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </div>
            <button onClick={handleSubmit} className={styles.button}>Enviar</button>
            {success && <p className={styles.success}>{success}</p>}
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
};

export default Page;