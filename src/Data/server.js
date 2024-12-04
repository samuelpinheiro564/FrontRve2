import axios from 'axios';

const URL = 'http://192.168.0.88:4040';
const LoginUser = async (nif, senha) => {
    try {
        // Construindo a URL com os parâmetros `nif` e `senha`
        const requestURL = `${URL}/usuarios/${nif}/${senha}`;
        console.log(`Fazendo requisição para: ${requestURL}`);

        // Fazendo a requisição GET
        const response = await axios.get(requestURL);

        // Log para depuração
        console.log('Resposta:', response.data);
        console.log('Status:', response.status);
        if(response.status === 200) {
            console.log('Usuário logado com sucesso');
            return response;
        }
        // Retorna os dados caso a resposta seja bem-sucedida
        return response.data;
    } catch (error) {
        if (error.response) {
            // Caso o erro seja retornado pelo servidor
            return error.response;
        } else {
            // Caso ocorra um erro de conexão ou algo inesperado
            console.error('Erro de conexão ou desconhecido:', error);
            throw new Error("Erro de conexão. Tente novamente mais tarde.");
        }
    }
};
const UserName = async (nome) => {
    try {
        const requestURL = `${URL}/usuarios/nome/${nome}`;
        console.log(`Fazendo requisição para: ${requestURL}`);
        const response = await axios.get(requestURL);
        console.log('Resposta:', response.data);
        return response.data;
    } catch (error) {
            console.error('Erro interno do servidor:', error);
            throw error;
        
    }
};

const UserType = async (tipo) => {
    try {
        const requestURL = `${URL}/usuarios/tipo/user/${tipo}`;
        console.log(`Fazendo requisição para: ${requestURL}`);
        const response = await axios.get(requestURL);
        console.log('Resposta:', response.data);
        return response.data;
    } catch (error) {
            console.error('Erro interno do servidor:', error);
            throw error;
        
    }
};


const createrve_usuarios  = async (datarve_usuario) => {
    try {
        const response = await axios.post(`${URL}/rve_usuarios`, datarve_usuario);
        console.log('Resposta:', response.data);
        return response.data;
    } catch (error) {
            console.error('Erro interno do servidor:', error);
            throw error;
        
    }
};

const getAllUsersrve_usuarios  = async (usuario_nif) => {
    try {
        const requestURL = `${URL}/rve_usuarios/${usuario_nif}`;
        console.log(`Fazendo requisição para: ${requestURL}`);
        const response = await axios.get(requestURL);
        console.log('Resposta:', response.data);
        return response.data;
    } catch (error) {
            console.error('Erro interno do servidor:', error);
            throw error;
        
    }
}

const getAllRVErve_usuarios  = async (rve_id) => {
    try {
        const requestURL = `${URL}/rve_usuario/${rve_id}`;
        console.log(`Fazendo requisição para: ${requestURL}`);
        const response = await axios.get(requestURL);
        console.log('Resposta:', response.data);
        return response.data;
    } catch (error) {
            console.error('Erro interno do servidor:', error);
            throw error;
        
    }
}

const CriarUser = async (userData) => {
    try {
        const response = await axios.post(`${URL}/usuarios`, userData);
        return response;
    } catch (error) {
        console.error('Erro na criação do usuário:', error);
        throw error;
    }
};

const AtualizaUser = async (nif,userData) => {
    try {
        const response = await axios.put(`${URL}/usuarios/${nif}`, userData);
        return response.data;
    } catch (error) {
        console.error('Erro na atualização do usuário:', error);
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

const AllUsersNif = async (nif) => {
    try {
        const response = await axios.get(`${URL}/usuarios/${nif}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar todos os usuários:', error);
        throw error;
    }
};
const AllUsers = async () => {
    try {
        const response = await axios.get(`${URL}/usuarios`);
        return response.data;
    }
    catch (error) {
        console.error('Erro ao buscar todos os usuários:', error);
        throw error;
    }
};


// Funções para gerenciar campos de texto
const CriarCampoTexto = async (campoData) => {
    try {
        const response = await axios.post(`${URL}/camposTexto`, campoData);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar campo de texto:', error);
        throw error;
    }
};

const AllCamposTextoRve = async (idrve) => {
    try {
        const response = await axios.get(`${URL}/camposTextoRve/${idrve}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar todos os campos de texto:', error);
        throw error;
    }
};


const EditarCampoTexto = async (id, campoData) => {
    try {
        const response = await axios.put(`${URL}/camposTexto/${id}`, campoData);
        return response.data;
    } catch (error) {
        console.error(`Erro ao editar campo de texto com ID ${id}:`, error);
        throw error;
    }
};

const DeleteCampoTexto = async (id) => {
    try {
        const response = await axios.delete(`${URL}/camposTexto/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao excluir campo de texto com ID ${id}:`, error);
        throw error;
    }
};
const getCampostextoRve = async (id) => {
    try {
        const response = await axios.get(`${URL}/camposTextoRve/${id}`);
        return response.data;
    }
    catch (error) {
        console.error(`Erro ao buscar campo de texto com ID ${id}:`, error);
        throw error;
    }
};
// messageService.js  
;  


// Funções para gerenciar fóruns
const CriarForum = async (forumData) => {
    try {
        const response = await axios.post(`${URL}/forum`, forumData);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar fórum:', error);
        throw error;
    }
};

const AllForum = async () => {
    try {
        const response = await axios.get(`${URL}/forum`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar todos os fóruns:', error);
        throw error;
    }
};

const ObterForumPorIdRVE = async (IdRve) => {
    try {
        const response = await axios.get(`${URL}/forum/${IdRve}`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar fórum com ID ${IdRve}:`, error);
        throw error;
    }
};

const EditarForum = async (id, forumData) => {
    try {
        const response = await axios.put(`${URL}/forum/${id}`, forumData);
        return response.data;
    } catch (error) {
        console.error(`Erro ao editar fórum com ID ${id}:`, error);
        throw error;
    }
};

const DeleteForum = async (id) => {
    try {
        const response = await axios.delete(`${URL}/forum/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao excluir fórum com ID ${id}:`, error);
        throw error;
    }
};

const CriarSaida = async (saidaData) => {
    try {
        const response = await axios.post(`${URL}/saida`, saidaData);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar registro de saída:', error);
        throw error;
    }
};

const AllSaida = async () => {
    try {
        const response = await axios.get(`${URL}/saida`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar todos os registros de saída:', error);
        throw error;
    }
};

const getMenorIdade = async () => {  
    try {  
        const response = await axios.get(`${URL}/saida/menor/idade`);  
        return response.data;  
    } catch (error) {  
        console.error(`Erro ao buscar registro:`, error);  
        throw error;  
    }  
}

const postAssinaturaAnaq = async (id, assinaturaAnaq) => {
    try {
        const response = await axios.put(`${URL}/saida/assinatura/anaq/${id}`, assinaturaAnaq);
        return response.data;
    } catch (error) {
        console.error(`Erro ao editar registro de saída com ID ${id}:`, error);
        throw error;
    }
};

const postAssinaturaProf = async (id, assinaturaProf) => {
    try {
        const response = await axios.put(`${URL}/saida/assinaturaProf/${id}`, assinaturaProf);
        return response.data;
    } catch (error) {
        console.error(`Erro ao editar registro de saída com ID ${id}:`, error);
        throw error;
    }
}

const UltimaSaida = async () => {
    try {
        const response = await axios.get(`${URL}/saida/ultimasaida`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar registro de saída com ID:`, error);
        throw error;
    }
};

const EditarSaida = async (id, saidaData) => {
    try {
        const response = await axios.put(`${URL}/saida/${id}`, saidaData);
        return response.data;
    } catch (error) {
        console.error(`Erro ao editar registro de saída com ID ${id}:`, error);
        throw error;
    }
};

const DeletarSaida = async (id) => {
    try {
        const response = await axios.delete(`${URL}/saida/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao excluir registro de saída com ID ${id}:`, error);
        throw error;
    }
};
const ObterRvesSemAssinatura = async (assinatura) => {
    try {
        const response = await axios.get(`${URL}/rve/sem/a/assinatura/${assinatura}`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao obter RVEs sem a assinatura ${assinatura}:`, error);
        throw error;
    }
};


const ObterRvesPorCurso = async (curso, nifautor) => {
    try {
        const response = await axios.get(`${URL}/rve/curso/${curso}/${nifautor}`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao obter RVEs do curso ${curso}:`, error);
        throw error;
    }
};
const ObterRvesPorTurma = async (turma, nifautor) => {
    try {
        const response = await axios.get(`${URL}/rve/turma/${turma}/${nifautor}`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao obter RVEs da turma ${turma}:`, error);
        throw error;
    }
};
const ObterUltimaRveCriada = async (nifsusuarios) => {
    try {
        const response = await axios.get(`${URL}/rve/ultima/criada/${nifsusuarios}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao obter a última RVE criada:', error);
        throw error;
    }
};

const ObterRvesCompletascomoautor = async (assinatura) => {
    try {
        const response = await axios.get(`${URL}/rve/completa/${assinatura}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao obter RVEs completas:', error);
        throw error;
    }
};
const DeletarRve = async (id) => {
    try {
        const response = await axios.delete(`${URL}/rve/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao deletar RVE com ID ${id}:`, error);
        throw error;
    }
};

const AtualizarRve = async (id, rveData) => {
    try {
        const response = await axios.put(`${URL}/rve/${id}`, rveData);
        return response.data;
    } catch (error) {
        console.error(`Erro ao atualizar RVE com ID ${id}:`, error);
        throw error;
    }
};

const ObterRvePorID = async (id) => {
    try {
        const response = await axios.get(`${URL}/rve/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao obter RVE com ID ${id}:`, error);
        throw error;
    }
};
const ObterTodasRves = async () => {
    try {
        const response = await axios.get(`${URL}/rve`);
        return response.data;
    } catch (error) {
        console.error('Erro ao obter todas as RVEs:', error);
        throw error;
    }
};
const CriarRve = async (rveData) => {
    try {
        const response = await axios.post(`${URL}/rve`, rveData);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar registro RVE:', error);
        throw error;
    }
};

const assinarRve = async (assinatura,id) => {
    try {
        const response = await axios.put(`${URL}/rve/assinar/sucesso/rve/${assinatura}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar registro RVE:', error);
        throw error;
    }
};


export {
    assinarRve,
    LoginUser,
    UserType,
    CriarUser,
    AtualizaUser,
    DeleteUser,
    AllUsers,
    AllUsersNif,
    ObterTodasRves,
    CriarRve,
    ObterRvePorID,
    AtualizarRve,
    DeletarRve,
    ObterRvesCompletascomoautor,
    ObterUltimaRveCriada,
    ObterRvesPorCurso,
    ObterRvesPorTurma,
    ObterRvesSemAssinatura,
    CriarCampoTexto,
    AllCamposTextoRve,
    EditarCampoTexto,
    DeleteCampoTexto,
    CriarForum,
    AllForum,
    ObterForumPorIdRVE,
    EditarForum,
    DeleteForum,
    CriarSaida,
    getMenorIdade,
    postAssinaturaAnaq,
    postAssinaturaProf,
    AllSaida,
    UltimaSaida,
    EditarSaida,
    DeletarSaida,
    getCampostextoRve,
    createrve_usuarios,
    getAllUsersrve_usuarios,
    getAllRVErve_usuarios,
    UserName
};
