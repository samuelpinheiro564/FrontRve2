import React, { useState } from 'react';  

const WhatsAppSender = () => {  
    const [phone, setPhone] = useState('');  
    const [message, setMessage] = useState('');  

    const handleSend = () => {  
        if (!phone || !message) {  
            alert('Por favor, preencha todos os campos.');  
            return;  
        }  

        const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase());  
        const url = isMobile   
            ? `whatsapp://send?phone=${encodeURIComponent(phone)}&text=${encodeURIComponent(message)}`  
            : `https://api.whatsapp.com/send?phone=${encodeURIComponent(phone)}&text=${encodeURIComponent(message)}`;  

        window.open(url, '_blank');  
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