import axios from 'axios';

const URL =  ' https://1102-201-63-78-210.ngrok-free.app'

const Login = async (Nif) => {
    try {
        const resposta = await axios.get(`${URL}/usuarios/:${Nif}`);
        return resposta.data;
    } catch (error) {
        throw (error);  
    }
}

const CriarUser = async () => {
        try {
            const resposta = await axios.post(`${URL}/usuarios`);
            return resposta.data;
        } catch (error) {
            throw (error);  
        }
    }

    const EditarUser = async (Nif) => {
        try {
            const resposta = await axios.put(`URL/usuarios/:${Nif}`);
            return resposta.data;
        } catch (error) {
            throw (error);  
        }
    }
    const DeleteUser = async (Nif) => {
        try {
            const resposta = await axios.delete(`URL/usuarios/:${Nif}`);
            return resposta.data;
        } catch (error) {
            throw (error);  
        }
    }

    export {Login, CriarUser, EditarUser, DeleteUser};