import React, { useState } from 'react';  
import { CriarUser, AllUsers } from '../../Data/server';  
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
    const [error, setError] = useState('');  
    const [successMessage, setSuccessMessage] = useState('');  
    const [showPassword, setShowPassword] = useState(false);  

    const handleInputChange = (e) => {  
        const { name, value } = e.target;  
        setForm(prevForm => ({ ...prevForm, [name]: value }));  
    };  

    const handleCadastro = async (e) => {  
        e.preventDefault();  
        const users = await AllUsers();  
        const res = users.find(user => user.nif === form.nif);  
        if (res) {  
            setError('O campo NIF já existe');  
            setTimeout(() => setError(''), 3000); // Mensagem de erro desaparece após 3 segundos
            return;  
        }  
        try {  
            await CriarUser(form);  
            setSuccessMessage('Usuário cadastrado com sucesso');  
            limparCampos();  
            setError('');  
            setTimeout(() => setSuccessMessage(''), 3000); // Mensagem de sucesso desaparece após 3 segundos
        } catch (error) {  
            console.error('Erro ao criar usuário:', error);  
            setError('Erro ao cadastrar usuário.');  // Mensagem de erro genérica para falha na API  
            setTimeout(() => setError(''), 3000); // Mensagem de erro desaparece após 3 segundos
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

    const toggleShowPassword = () => {  
        setShowPassword(prevShowPassword => !prevShowPassword);  
    };  

    return (  
        <div className={styles.container}>  
            <h1 className={styles.title}>Cadastro de Usuários</h1>  
            <form className={styles.form} onSubmit={handleCadastro}>  
                <div className={styles.formGroup}>  
                    <label htmlFor="nif" className={styles.label}>NIF:</label>  
                    <input type="number" id="nif" name="nif" value={form.nif} onChange={handleInputChange} className={styles.input} />  
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
                    <input type={showPassword ? "text" : "password"} id="senha" name="senha" value={form.senha} onChange={handleInputChange} className={styles.input} />  
                    <span onClick={toggleShowPassword} className={styles.togglePassword}>{showPassword ? '🙈' : '👁️'}</span>  
                </div>  
                <div className={styles.formGroup}>  
                    <label htmlFor="telefone" className={styles.label}>Telefone:</label>  
                    <input type="number" id="telefone" name="telefone" value={form.telefone} onChange={handleInputChange} className={styles.input} />  
                </div>  
                <div className={styles.formGroup}>  
                    <label htmlFor="tipo" className={styles.label}>Tipo:</label>  
                    <input type="text" id="tipo" name="tipo" value={form.tipo} onChange={handleInputChange} className={styles.input} />  
                </div>  
                {error && <p className={styles.error}>{error}</p>}  
                {successMessage && <p className={styles.success}>{successMessage}</p>}  
                <button type="submit" className={styles.button}>Cadastrar</button>  
            </form>  
        </div>  
    );  
};  

export default CadastroUsuarios;