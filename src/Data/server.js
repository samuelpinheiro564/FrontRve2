import axios from 'axios';

const URL = 'http://localhost:4040';

const LoginUser = async (nif) => {
    try {
        const requestURL = `${URL}/usuarios/${nif}`;
        console.log(`Fazendo requisição para: ${requestURL}`);
        const response = await axios.get(requestURL);
        console.log('Resposta:', response.data);
        return response.data;
    } catch (error) {
        console.error('Erro na requisição:', error);
        throw error;
    }
};

const CriarUser = async (userData) => {
    try {
        const response = await axios.post(`${URL}/usuarios`, userData);
        return response.data;
    } catch (error) {
        console.error('Erro na criação do usuário:', error);
        throw error;
    }
};

const EditarUser = async (nif, userData) => {
    try {
        const response = await axios.put(`${URL}/usuarios/${nif}`, userData);
        return response.data;
    } catch (error) {
        console.error('Erro na edição do usuário:', error);
        throw error;
    }
};

const DeleteUser = async (nif) => {
    try {
        const response = await axios.delete(`${URL}/usuarios/${nif}`);
        return response.data;
    } catch (error) {
        console.error('Erro na exclusão do usuário:', error);
        throw error;
    }
};

const AllUsers = async () => {
    try {
        const response = await axios.get(`${URL}/usuarios`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar todos os usuários:', error);
        throw error;
    }
};

export { LoginUser, CriarUser, EditarUser, DeleteUser, AllUsers };