import axios from 'axios';  

const URL = 'http://localhost:4040';  

const LoginUser = async (Nif) => {  
    try {  
        const requestURL = `${URL}/usuarios/${Nif}`;  
        console.log(`Fazendo requisição para: ${requestURL}`);  
        const resposta = await axios.get(requestURL);  
        console.log('Resposta:', resposta.data);
        console.log(resposta.data);
        return resposta.data;
    } catch (error) {  
        console.error('Erro na requisição:', error); // Mostre o erro no console  
        throw error;  
    }   
}; 

const CriarUser = async (userData) => {  
    try {  
        const resposta = await axios.post(`${URL}/usuarios`, userData);  
        return resposta.data;  
    } catch (error) {  
        throw error;  
    }  
};  

const EditarUser = async (Nif, userData) => {  // Adicionando userData como parâmetro  
    try {  
        const resposta = await axios.put(`${URL}/usuarios/${Nif}`, userData);  // Correção na URL  
        return resposta.data;  
    } catch (error) {  
        throw error;  
    }  
};  

const DeleteUser = async (Nif) => {  
    try {  
        const resposta = await axios.delete(`${URL}/usuarios/${Nif}`);  // Correção na URL  
        return resposta.data;  
    } catch (error) {  
        throw error;  
    }  
};  

const AllUsers = async () => {  // Removendo Nif como parâmetro  
    try {  
        const resposta = await axios.get(`${URL}/usuarios`);  
        return resposta.data;  
    } catch (error) {  
        throw error;  
    }  
};  

export { LoginUser, CriarUser, EditarUser, DeleteUser, AllUsers };