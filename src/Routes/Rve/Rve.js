import React, { useState, useEffect } from 'react';  
import { AllUsers,CriarRve } from '../../Data/server';  
import userData from '../../Data/dadosUser';   
import rveData from '../../Data/DadosRve';  
import { useNavigate } from 'react-router-dom';

const Rve = () => {  
  const [autor, setAutor] = useState('');  
  const [estudante, setEstudante] = useState('');  
  const [curso, setCurso] = useState('');  
  const [turma, setTurma] = useState('');  
  const [data, setData] = useState('');  
  const [hora, setHora] = useState('');  
  const [motivo, setMotivo] = useState('');  
  const [orientacoesEstudante, setOrientacoesEstudante] = useState('');  
  const [descricaoOcorrido, setDescricaoOcorrido] = useState('');  
  const [docenteAtual, setDocenteAtual] = useState('');  
  const [docentesEnvolvidos, setDocentesEnvolvidos] = useState([]);  
  const [assinaturas] = useState(null);  
  const [elogios, setElogios] = useState('');  
  const [dificuldades, setDificuldades] = useState('');  
  const [presenca, setPresenca] = useState('');  
  const [categorias, setCategorias] = useState('');  
  const [id, setId] = useState('');  
  const [listaDocentes, setListaDocentes] = useState([]);  
  const navigate = useNavigate(); 

  // Fetch user data and generate random ID  
  useEffect(() => {  
    const dadosUser = userData.getUsers();   
    if (dadosUser.length > 0) {  
      setAutor(dadosUser[0][0].nif);  
    }  

    // Generate a random ID  
    const gerarIdNumber = () => {  
      const randomId = Math.floor(Math.random() * 1000000);   
      setId(randomId);   
    };  
    gerarIdNumber();  
  }, []);   
  useEffect(() => {  
    const fetchDocentes = async () => {  
        try {  
            const docents = await AllUsers();  
            console.log('Docentes:', docents);  
            if (Array.isArray(docents)) {  
                setListaDocentes(docents);  
            } else {  
                console.error('Expected an array but got:', docents);  
            }  
        } catch (error) {  
            console.error('Erro ao buscar docentes:', error);  
        }   
    };  
    fetchDocentes();  
}, []); 


  // Fetch teachers  
  useEffect(() => {  
    const fetchDocentes = async () => {  
      try {  
        const docentes = await AllUsers();   
        setListaDocentes(docentes);  
        console.log('Docentes:', docentes); 
      } catch (error) {  
        console.error('Erro ao buscar docentes:', error);  
      }  
    };  
    fetchDocentes();   
  }, []);  



  const categories = [  
    'Aprendizagem',  
    'Atitude/postura/comportamento',  
    'Frequência',  
    'Oficina/Segurança',  
    'Relacionamento interpessoal',  
    'Rendimento',  
    'Saúde física',  
    'Saúde mental',  
    'Outras',  
  ];  

  const addDocente = () => {  
    if (docenteAtual) {  
      // Verifica se o docente já está na lista  
      if (docentesEnvolvidos.includes(docenteAtual)) {  
        alert('Este docente já está na lista de envolvidos.');  
        return; // Não adiciona o docente se já estiver presente  
      }  
      
      // Adiciona o docente à lista  
      setDocentesEnvolvidos([...docentesEnvolvidos, docenteAtual]);  
      setDocenteAtual('');   
  
      // Log do array de docentes selecionados  
      console.log('Docentes Selecionados:', [...docentesEnvolvidos, docenteAtual]);  
    } else {  
      alert('Selecione um docente antes de adicionar.');  
    }  
  };    
  console.log('Docentes Envolvidos:', docentesEnvolvidos);

  const deleteDocente = (index) => {  
    const updatedDocentes = docentesEnvolvidos.filter((_, i) => i !== index);  
    setDocentesEnvolvidos(updatedDocentes);  
  };   


  const handleCriarRVE = async (e) => {  
    e.preventDefault();  
    try {  
      const rve = {  
        id,  
        autor,  
        estudante,  
        curso,  
        turma,  
        data,  
        hora,  
        motivo,  
        orientacoesEstudante,  
        descricaoOcorrido,  
        docentesEnvolvidos,
        assinaturas:Array(assinaturas),  
        elogios,  
        dificuldades,  
        presenca,  
        categorias,  
      };  
 const res=  rveData.addRve(rve);
console.log(res);
     await CriarRve(rve);
      // Aqui você poderia fazer a chamada para salvar o RVE, por exemplo:  
      // Supondo que você tenha uma função saveRve  
console.log(rveData.getRves());
navigate('/Forum');
      // Limpar os estados após a criação do RVE  
      setEstudante('');  
      setCurso('');  
      setTurma('');  
      setData('');  
      setHora('');  
      setMotivo('');  
      setOrientacoesEstudante('');  
      setDescricaoOcorrido('');  
      setDocentesEnvolvidos([]);  
      setElogios('');  
      setDificuldades('');  
      setPresenca('');  
      setCategorias('');  
      
      // Notificar ou redirecionar o usuário após o sucesso  
      alert('RVE criado com sucesso!');  
    } catch (error) {  
      console.error('Erro ao criar RVE:', error);  
      alert('Ocorreu um erro ao criar o RVE.');  
    }  
  };  

  return (  
    <div>  
      <h1>Criar RVE</h1>  
      <form onSubmit={handleCriarRVE}>  
        <div>  
          <input  
            type="text"  
            name="estudante"  
            placeholder="Nome do Estudante"  
            value={estudante}  
            onChange={(e) => setEstudante(e.target.value)}  
            required  
          />  
        </div>  
        <div>  
          <input  
            type="text"  
            name="curso"  
            placeholder="Curso do Estudante"  
            value={curso}  
            onChange={(e) => setCurso(e.target.value)}  
            required  
          />  
        </div>  
        <div>  
          <textarea  
            name="turma"  
            placeholder="Turma do Estudante"  
            value={turma}  
            onChange={(e) => setTurma(e.target.value)}  
            required  
          />  
        </div>  
        <div>  
          <input  
            type="date"  
            name="data"  
            placeholder="Data"  
            value={data}  
            onChange={(e) => setData(e.target.value)}  
            required  
          />  
        </div>  
        <div>  
          <input  
            type="time"  
            name="hora"  
            placeholder="Hora"  
            value={hora}  
            onChange={(e) => setHora(e.target.value)}  
            required  
          />  
        </div>  
        <div>  
          <textarea  
            name="motivo"  
            placeholder="Motivo"  
            value={motivo}  
            onChange={(e) => setMotivo(e.target.value)}  
            required  
          />  
        </div>  
        <div>  
          <textarea  
            name="orientacoesEstudante"  
            placeholder="Orientações ao Estudante"  
            value={orientacoesEstudante}  
            onChange={(e) => setOrientacoesEstudante(e.target.value)}  
            required  
          />  
        </div>  
        <div>  
          <textarea  
            name="descricaoOcorrido"  
            placeholder="Descrição do Ocorrido"  
            value={descricaoOcorrido}  
            onChange={(e) => setDescricaoOcorrido(e.target.value)}  
            required  
          />  
        </div>  
        <div>  
          <select  
            name="docenteAtual"  
            value={docenteAtual}  
            onChange={(e) => setDocenteAtual(e.target.value)}  
          >  
            <option value="">Selecione um Docente</option>  
             {listaDocentes.map((docente) => (  
              <option key={docente.nif} value={`${docente.nome}`}>{docente.nome}</option>  
            ))}   
          </select>  
          <button type='button' onClick={addDocente}>  
            Adicionar Docente  
          </button>  
        </div>  
        {docentesEnvolvidos.length > 0 && (  
          <div>  
            <h3>Docentes Envolvidos:</h3>  
            <ul>  
              {docentesEnvolvidos.map((docente, index) => (  
                <li key={docente.nif}>  
                  {docente}  
                  <button type="button" onClick={() => deleteDocente(index)}>  
                    Remover  
                  </button>  
                </li>  
              ))}  
            </ul>  
          </div>  
        )}  
        <div>  
          <input  
            type="text"  
            name="elogios"  
            placeholder="Elogios"  
            value={elogios}  
            onChange={(e) => setElogios(e.target.value)}  
          />  
        </div>  
        <div>  
          <input  
            type="text"  
            name="dificuldades"  
            placeholder="Dificuldades"  
            value={dificuldades}  
            onChange={(e) => setDificuldades(e.target.value)}  
          />  
        </div>  
        <div>  
          <input  
            type="text"  
            name="presenca"  
            placeholder="Presença"  
            value={presenca}  
            onChange={(e) => setPresenca(e.target.value)}  
          />  
        </div>  
        <div>  
          <select  
            name="categorias"  
            value={categorias}  
            onChange={(e) => setCategorias(e.target.value)}  
            required  
          >  
            <option value="">Selecione uma categoria</option>  
            {categories.map((category, index) => (  
              <option key={index} value={category}>{category}</option>  
            ))}  
          </select>  
        </div>  
      
        <button type="submit" onClick={handleCriarRVE}>Criar RVE</button>  
  
      </form>  
    </div>  
  );  
};  

export default Rve;