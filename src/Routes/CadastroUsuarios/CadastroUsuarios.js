import React from 'react';
import { useState } from 'react';
import { CriarUser, AllUsers } from '../../Data/server';
import styles from '../CadastroUsuarios/user.module.css';

const CadastroUsuarios = () => {
    const [form] = useState({
        nif: '',
        nome: '',
        email: '',
        senha: '',
        telefone: '',
        tipo: ''
    });

    const handleCadastro = (e) => {
        e.preventDefault();
        const users = AllUsers();
        console.log(users);
        const res = users.find(user => user.nif === form.nif);
        if (res) {
            console.error('O campo NIF é obrigatório');
            return;
        }
        try {
            const res = CriarUser(form);
            console.log(res);
            alert('Usuário cadastrado com sucesso');
            limparCampos();
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
        }
    }

    const limparCampos = () => {
        form.nif = '';
        form.nome = '';
        form.email = '';
        form.senha = '';
        form.telefone = '';
        form.tipo = '';
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Cadastro de Usuários</h1>
            <form className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="nome" className={styles.label}>Nome:</label>
                    <input type="text" id="nome" name="nome" className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>Email:</label>
                    <input type="email" id="email" name="email" className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="senha" className={styles.label}>Senha:</label>
                    <input type="password" id="senha" name="senha" className={styles.input} />
                </div>
                <button type="submit" onClick={handleCadastro} className={styles.button}>Cadastrar</button>
            </form>
        </div>
    );
};

export default CadastroUsuarios;
