import React, { useState } from 'react';  
import { CriarUser, AllUsers } from '../../Data/server';  // Certifique-se de que aqui você está chamando a API corretamente  
import styles from '../CadastroUsuarios/user.module.css';  

const CadastroUsuarios = () => {  
    const [form, setForm] = useState({  
        nif: '',  
        nome: '',  
        email: '',  
        senha: '',  
        telefone: '',  
        tipo: ''  
    });  

    const handleInputChange = (e) => {  
        const { name, value } = e.target;  
        setForm(prevForm => ({ ...prevForm, [name]: value }));  
    };  

    const handleCadastro = async (e) => {  
        e.preventDefault();  
        const users = await AllUsers();  // Certifique-se de que esta função está fazendo uma requisição à API  
        const res = users.find(user => user.nif === form.nif);  
        if (res) {  
            console.error('O campo NIF já existe');  
            return;  
        }  
        try {  
            await CriarUser(form);  // Certifique-se de que esta função está fazendo uma requisição à API  
            alert('Usuário cadastrado com sucesso');  
            limparCampos();  
        } catch (error) {  
            console.error('Erro ao criar usuário:', error);  
        }  
    };  

    const limparCampos = () => {  
        setForm({  
            nif: '',  
            nome: '',  
            email: '',  
            senha: '',  
            telefone: '',  
            tipo: ''  
        });  
    };  

    return (  
        <div className={styles.container}>  
            <h1 className={styles.title}>Cadastro de Usuários</h1>  
            <form className={styles.form} onSubmit={handleCadastro}>  
                <div className={styles.formGroup}>  
                    <label htmlFor="nif" className={styles.label}>NIF:</label>  
                    <input type="text" id="nif" name="nif" value={form.nif} onChange={handleInputChange} className={styles.input} />  
                </div>  
                <div className={styles.formGroup}>  
                    <label htmlFor="nome" className={styles.label}>Nome:</label>  
                    <input type="text" id="nome" name="nome" value={form.nome} onChange={handleInputChange} className={styles.input} />  
                </div>  
                <div className={styles.formGroup}>  
                    <label htmlFor="email" className={styles.label}>Email:</label>  
                    <input type="email" id="email" name="email" value={form.email} onChange={handleInputChange} className={styles.input} />  
                </div>  
                <div className={styles.formGroup}>  
                    <label htmlFor="senha" className={styles.label}>Senha:</label>  
                    <input type="password" id="senha" name="senha" value={form.senha} onChange={handleInputChange} className={styles.input} />  
                </div>  
                <div className={styles.formGroup}>  
                    <label htmlFor="telefone" className={styles.label}>Telefone:</label>  
                    <input type="text" id="telefone" name="telefone" value={form.telefone} onChange={handleInputChange} className={styles.input} />  
                </div>  
                <div className={styles.formGroup}>  
                    <label htmlFor="tipo" className={styles.label}>Tipo:</label>  
                    <input type="text" id="tipo" name="tipo" value={form.tipo} onChange={handleInputChange} className={styles.input} />  
                </div>  
                <button type="submit" className={styles.button}>Cadastrar</button>  
            </form>  
        </div>  
    );  
};  

export default CadastroUsuarios;