import React, { useState } from 'react';
import axios from 'axios';

const WhatsAppSender = () => {
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSend = async () => {
        if (!phone || !message) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        try {
            // Envia a mensagem
            const response = await postData('http://localhost:3001/api/sendText', {
                phone,
                message,
            });

            // Verifica se a resposta é bem-sucedida
            if (response.status === 200) {
                setSuccess('Mensagem enviada com sucesso!');
                setError(null);
                // Limpar os campos após o envio
                setPhone('');
                setMessage('');
            } else {
                setError('Erro ao enviar a mensagem.');
            }
        } catch (err) {
            setError('Erro ao enviar a mensagem: ' + (err.response?.data?.message || err.message));
            setSuccess(null);
            console.error('Erro:', err);
        }
    };

    const postData = async (url, data) => {
        try {
            const response = await axios.post(url, data);
            return response;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Enviar Mensagem para WhatsApp</h2>
            <div style={styles.formGroup}>
                <label htmlFor="phone">Número (formato internacional):</label>
                <input
                    type="text"
                    id="phone"
                    placeholder="e.g. 5511999999999"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={styles.input}
                />
            </div>
            <div style={styles.formGroup}>
                <label htmlFor="message">Mensagem:</label>
                <textarea
                    id="message"
                    rows="3"
                    placeholder="Digite sua mensagem aqui"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={styles.textArea}
                />
            </div>
            <button onClick={handleSend} style={styles.button}>Enviar</button>
            {success && <p style={{ color: 'green' }}>{success}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '500px',
        margin: 'auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    header: {
        textAlign: 'center',
    },
    formGroup: {
        marginBottom: '15px',
    },
    input: {
        width: '100%',
        padding: '8px',
        boxSizing: 'border-box',
    },
    textArea: {
        width: '100%',
        padding: '8px',
        boxSizing: 'border-box',
    },
    button: {
        backgroundColor: '#28a745',
        color: 'white',
        padding: '10px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        width: '100%',
    },
};

export default WhatsAppSender;
