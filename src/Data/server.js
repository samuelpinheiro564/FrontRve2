import axios from 'axios';

const URL =  'https://807f-200-231-33-146.ngrok-free.app'

const LoginUser = async (Nif) => {
    try {
        const resposta = await axios.get(`${URL}/usuarios/:${Nif}`);
        return resposta.data;
    } catch (error) {
        throw (error);  
    }
}

async function CriarUser  (userData){
        try {
            const resposta = await axios.post(`${URL}/usuarios`,userData);
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

  const AllUsers = async (Nif) => {
        try {
            const resposta = await axios.get(`${URL}/usuarios`);
            return resposta.data;
        } catch (error) {
            throw (error);  
        }
    }
    export {LoginUser, CriarUser, EditarUser, DeleteUser,AllUsers};