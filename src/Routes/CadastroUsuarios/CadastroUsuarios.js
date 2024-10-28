
import React from 'react';
import { useState,useEffect } from 'react';
import {CriarUser,AllUsers} from '../../Data/server';

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
      const res= users.find(user => user.nif === form.nif);
        if (res) {
            console.error('O campo NIF é obrigatório');
            return;
        }
        try{
            const res = CriarUser(form);
            console.log(res);
            alert('Usuário cadastrado com sucesso');
            limparCampos();
        }
        catch(error){
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
        <div>
            <h1>Cadastro de Usuários</h1>
            <form>
                <div>
                    <label htmlFor="nome">Nome:</label>
                    <input type="text" id="nome" name="nome" />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" />
                </div>
                <div>
                    <label htmlFor="senha">Senha:</label>
                    <input type="password" id="senha" name="senha" />
                </div>
                <button type="submit" onClick={handleCadastro}>Cadastrar</button>
            </form>
        </div>
    );
};

export default CadastroUsuarios;

