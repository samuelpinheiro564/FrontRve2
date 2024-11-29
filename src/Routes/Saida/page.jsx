import React, { useState, useEffect } from 'react';  
import { useNavigate, useLocation } from 'react-router-dom';  
import { CriarSaida, EditarSaida } from '../../Data/server';  
import userData from '../../Data/dadosUser'; // Import userData
import styles from '../Saida/saida.module.css';  
import Notificacaozap from '../../components/NotificacaoZap/Notificazaozap'; // Import Notificacaozap

const Saida = () => {  
    const [formData, setFormData] = useState({  
        nomealuno: '',  
        curso: '',  
        turma: '',  
        alunora: '',  
        datasaida: '',  
        horasaida: '',  
        maioridade: false,  // Inicializa como false
        justificativa: '',  
        assinaturaProf: [],  // Inicializa como array vazio
        assinaturaAnaq: '',  
    });  
    const [editId, setEditId] = useState(null);
    const[yes,setYes] = useState(true);  
    const [message, setMessage] = useState({ type: '', text: '' });  
 // Estado para armazenar o tipo de usuário
    const navigate = useNavigate();  
    const location = useLocation();  

   

    useEffect(() => {  
        const userDados = userData.getUsers();
        if(userDados.tipo === 'docente'){
setYes(true);
        }else{
            setYes(false);
        }
            
        if (location.state?.item) {  
            const item = location.state.item;  
            console.log(item.datasaida.split('T')[0]);
            setEditId(item.id); // Set the ID for editing  
            setFormData({  
                nomealuno: item.nomealuno,  
                curso: item.curso,  
                turma: item.turma,  
                alunora: item.alunora,  
                datasaida: item.datasaida.split('T')[0],  
                horasaida: item.horasaida,  
                maioridade: item.maioridade,  // Usando valor booleano diretamente
                justificativa: item.justificativa,  
                assinaturaProf: item.assinaturaprof || [],  // Garantir que seja um array
                assinaturaAnaq: item.assinaturaanaq,  
            });  
        }  
    }, [location.state]);  

    useEffect(() => {  
        if (message.text) {  
            const timer = setTimeout(() => {  
                setMessage({ type: '', text: '' });  
            }, 3000); // 3 seconds  

            return () => clearTimeout(timer);  
        }  
    }, [message]);  

    const handleChange = ({ target: { name, value } }) => {  
        setFormData({ ...formData, [name]: name === 'maioridade' ? value === 'true' : value });
        const dadosUser = userData.getUsers();
        <Notificacaozap phone={`55${dadosUser[0].telefone}`} message ={"NOVA Saida Solicitada Por favor Visualizar"}/>  
    };  

    const handleSubmit = async (e) => {  
        e.preventDefault();  
    
        const currentDate = new Date();
        const selectedDate = new Date(`${formData.datasaida}T${formData.horasaida}`);
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    
        if (!formData.datasaida) {  
            alert("A data de saída deve ser preenchida.");  
            return;  
        }
    
        if (selectedDate > currentDate) {
            alert("A data e hora de saída não podem ser maiores que a data e hora atuais.");
            return;
        }
    
        if (selectedDate < oneYearAgo) {
            alert("A data e hora de saída não podem ser menores que um ano.");
            return;
        }  
    
        try {  
            if (editId) {  
                console.log("Editando saída:", editId);
                if (formData.maioridade === true) {
                    const submissionDataEdit = {  
                        nomealuno: formData.nomealuno,
                        curso: formData.curso,
                        turma: formData.turma,
                        alunora: formData.alunora,  
                        datasaida: formData.datasaida,  
                        horasaida: formData.horasaida, 
                        maioridade: formData.maioridade,
                        justificativa: formData.justificativa,
                        assinaturaanaq: null,  // Assinatura como string
                        assinaturaprof: Array(userData.getUsers()[0].nome),  // Assinatura como array de string
                    };  
                    console.log("submissionDataEdit",submissionDataEdit);
                    console.log("Maior idade");
                   const edit =  await EditarSaida(editId, submissionDataEdit);  
                    console.log("edit",edit);
                    setMessage({ type: 'success', text: 'Saída editada com sucesso.' });  
                  //  navigate('/HistoricoSaida')
                }else{
                console.log("Fernanda Lima:", userData.getUsers()[0].tipo === "admin");
                    if(userData.getUsers()[0].tipo === 'docente'){
                    const submissionDataEdit = {  
                        nomealuno: formData.nomealuno,
                        curso: formData.curso,
                        turma: formData.turma,
                        alunora: formData.alunora,  
                        datasaida: formData.datasaida,  
                        horasaida: formData.horasaida, 
                        maioridade: formData.maioridade,
                        justificativa: formData.justificativa,
                        assinaturaanaq: null,  // Assinatura como string
                        assinaturaprof: Array(userData.getUsers()[0].nome),  // Assinatura como array de string
                    };  
                    console.log(submissionDataEdit);
                    console.log("Professor");
                   const edit =  await EditarSaida(editId, submissionDataEdit);  
                    console.log("edit",edit);
                setMessage({ type: 'success', text: 'Saída editada com sucesso.' });  
             //   navigate('/HistoricoSaida')
                }else if( userData.getUsers()[0].tipo === 'admin'){
                    const submissionDataEdit = {  
                        nomealuno: formData.nomealuno,
                        curso: formData.curso,
                        turma: formData.turma,
                        alunora: formData.alunora,  
                        datasaida: formData.datasaida,  
                        horasaida: formData.horasaida, 
                        maioridade: formData.maioridade,
                        justificativa: formData.justificativa,
                        assinaturaanaq: null,  // Assinatura como string
                        assinaturaprof: Array(userData.getUsers()[0].nome),  // Assinatura como array de string
                    };
                    console.log(submissionDataEdit);
                    console.log("ANaq");
                  const edit =  await EditarSaida(editId, submissionDataEdit); 
                  console.log("edit",edit); 
                    setMessage({ type: 'success', text: 'Saída editada com sucesso.' });  
                  //  navigate('/HistoricoSaida')

                }else{
                    const submissionDataEdit = {  
                        nomealuno: formData.nomealuno,
                        curso: formData.curso,
                        turma: formData.turma,
                        alunora: formData.alunora,  
                        datasaida: formData.datasaida,  
                        horasaida: formData.horasaida, 
                        maioridade: formData.maioridade,
                        justificativa: formData.justificativa,
                        assinaturaanaq: userData.getUsers()[0].nome,  // Assinatura como string
                        assinaturaprof: null,  // Assinatura como array de string
                    };  
                    console.log(submissionDataEdit);
                    console.log("ANaq");
                  const edit =  await EditarSaida(editId, submissionDataEdit); 
                  console.log("edit",edit); 
                    setMessage({ type: 'success', text: 'Saída editada com sucesso.' });  
                  //  navigate('/HistoricoSaida')
                } }
                
            } else {  
                const userDados = userData.getUsers()[0];
    
                if (formData.maioridade === true) {
                    const submissionDataCreate = {  
                        nomealuno: formData.nomealuno,
                        curso: formData.curso,
                        turma: formData.turma,
                        alunora: formData.alunora,  
                        datasaida: formData.datasaida,  
                        horasaida: formData.horasaida, 
                        maioridade: formData.maioridade,
                        justificativa: formData.justificativa,
                        assinaturaanaq: null,  // Assinatura como string
                        assinaturaprof: Array(userDados.nome),  // Assinatura como array de string
                    };  
                    console.log(submissionDataCreate);
                    console.log("Maior idade");
                    await CriarSaida(submissionDataCreate);  
                    setMessage({ type: 'success', text: 'Saída criada com sucesso.' });  
                    navigate('/HistoricoSaida')
                } else {
    
                    if (userDados.tipo === 'docente') {
                        const submissionDataCreate = {  
                                nomealuno: formData.nomealuno,
                                curso: formData.curso,
                                turma: formData.turma,
                            alunora: formData.alunora,  
                            datasaida: formData.datasaida,  
                            horasaida: formData.horasaida, 
                            maioridade: formData.maioridade,
                            justificativa: formData.justificativa,
                            assinaturaanaq: null,  // Assinatura como string
                            assinaturaprof: Array(userDados.nome),  // Assinatura como array de string
                            }; 
                        console.log("Criado Prof");
                        await CriarSaida(submissionDataCreate);  
                        setMessage({ type: 'success', text: 'Saída criada com sucesso.' });  
                        navigate('/HistoricoSaida')
                    } else if(userDados.tipo === "admin"){
                        const submissionDataCreate = {  
                            nomealuno: formData.nomealuno,
                            curso: formData.curso,
                            turma: formData.turma,
                        alunora: formData.alunora,  
                        datasaida: formData.datasaida,  
                        horasaida: formData.horasaida, 
                        maioridade: formData.maioridade,
                        justificativa: formData.justificativa,
                        assinaturaanaq: null,  // Assinatura como string
                        assinaturaprof: Array(userDados.nome),  // Assinatura como array de string
                        }; 
                    console.log("Criado Prof");
                    await CriarSaida(submissionDataCreate);  
                    setMessage({ type: 'success', text: 'Saída criada com sucesso.' });  
                    navigate('/HistoricoSaida')
                    } else {
                        const submissionDataCreate = {  
                            nomealuno: formData.nomealuno,
                            curso: formData.curso,
                            turma: formData.turma,
                            alunora: formData.alunora,  
                            datasaida: formData.datasaida,  
                            horasaida: formData.horasaida, 
                            maioridade: formData.maioridade,
                            justificativa: formData.justificativa,
                            assinaturaanaq: userDados.nome,  // Assinatura como string
                            assinaturaprof: null,  // Assinatura como array de string
                        }; 
                        console.log("Criado ANaq");
                        await CriarSaida(submissionDataCreate);  
                        setMessage({ type: 'success', text: 'Saída criada com sucesso.' });  
                        navigate('/HistoricoSaida')
                    }
                }  
                // Limpa os dados do formulário  
                setFormData({  
                    nomealuno: '',  
                    curso: '',  
                    turma: '',  
                    alunora: '',  
                    datasaida: '',  
                    horasaida: '',  
                    maioridade: false,  // Resetando o valor booleano
                    justificativa: '',  
                    assinaturaprof: [],  // Resetando o array
                    assinaturaanaq: '',  
                });  
                setEditId(null); // Limpa o ID de edição para nova entrada, se necessário  
            } 
        } catch (error) {  
            console.error("Error submitting form:", error);  
            setMessage({ type: 'error', text: 'Erro ao enviar formulário.' });  
        }  
    };  
    
    return (  

        <div className={styles.container}>  
        {!yes ? <> 
        <h1 className={styles.title}>JUSTIFICATIVA SAÍDA</h1>  
            <form onSubmit={handleSubmit} className={styles.form}>  
                <input type="text" name="nomealuno" placeholder="Aluno" value={formData.nomealuno} onChange={handleChange} required className={styles.input} />  
                <input type="text" name="curso" placeholder="Curso" value={formData.curso} onChange={handleChange} required className={styles.input} />  
                <input type="text" name="turma" placeholder="Turma" value={formData.turma} onChange={handleChange} required className={styles.input} />  
                <input className={`${styles.input} ${styles.ra}`} type="number" name="alunora" placeholder="RA" value={formData.alunora} onChange={handleChange} required />  

                <div className={styles.radioGroup}>  
                    <label>Maior de Idade:</label>  
                    <label>  
                        <input type="radio" name="maioridade" value="true" onChange={handleChange} checked={formData.maioridade === true} required /> Sim  
                    </label>  
                    <label>  
                        <input type="radio" name="maioridade" value="false" onChange={handleChange} checked={formData.maioridade === false} required /> Não  
                    </label>  
                </div>  

                <input type="date" name="datasaida" value={formData.datasaida} onChange={handleChange} required className={styles.input} />  
                <input type="time" name="horasaida" value={formData.horasaida} onChange={handleChange} required className={styles.input} />  

                <textarea name="justificativa" placeholder="Justificativa" value={formData.justificativa} onChange={handleChange} required className={styles.textarea}></textarea>  
                <button type="submit" className={styles.button}>{editId ? 'Editar Saída' : 'Enviar Saída'}</button>  
            </form>  
            {message.text && (  
                <div className={message.type === 'error' ? styles.error : styles.success}>  
                    {message.text}  
                </div>  
            )}  
            <button onClick={() => navigate('/HistoricoSaida')} className={styles.button}>Ver Histórico de Saídas</button>
             </>
              :
              <>
               <h1 className={styles.title}>JUSTIFICATIVA SAÍDA</h1>  
            <form onSubmit={handleSubmit} className={styles.form}>  
                <input type="text" name="nomealuno" placeholder="Aluno" value={formData.nomealuno} onChange={handleChange} required className={styles.input} />  
                <input type="text" name="curso" placeholder="Curso" value={formData.curso} onChange={handleChange} required className={styles.input} />  
                <input type="text" name="turma" placeholder="Turma" value={formData.turma} onChange={handleChange} required className={styles.input} />  
                <input className={`${styles.input} ${styles.ra}`} type="number" name="alunora" placeholder="RA" value={formData.alunora} onChange={handleChange} required />  

                <div className={styles.radioGroup}>  
                    <label>Maior de Idade:</label>   
                    <label>  
                        <input type="radio" name="maioridade" value="false" onChange={handleChange} checked={formData.maioridade === false} required /> Não  
                    </label>  
                </div>  

                <input type="date" name="datasaida" value={formData.datasaida} onChange={handleChange} required className={styles.input} />  
                <input type="time" name="horasaida" value={formData.horasaida} onChange={handleChange} required className={styles.input} />  

                <textarea name="justificativa" placeholder="Justificativa" value={formData.justificativa} onChange={handleChange} required className={styles.textarea}></textarea>  
                <button type="submit" className={styles.button}>{editId ? 'Editar Saída' : 'Enviar Saída'}</button>  
            </form>  
            {message.text && (  
                <div className={message.type === 'error' ? styles.error : styles.success}>  
                    {message.text}  
                </div>  
            )}  
            <button onClick={() => navigate('/HistoricoSaida')} className={styles.button}>Ver Histórico de Saídas</button> 
              </>
              }
            
        </div>  
    );  
};  

export default Saida;
