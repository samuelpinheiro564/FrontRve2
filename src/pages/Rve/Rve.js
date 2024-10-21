import React, { useState, useEffect } from 'react';  
import { CriarRve, CriarCampoTexto,ObterCampoTextoPorId,getCampostextoRve } from '../../Data/server';
import '../Rve/styles.css';  

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
  const [docentesEnvolvidos, setDocentesEnvolvidos] = useState([]);
  const [assinaturas, setAssinaturas] = useState([]);
  const [elogios, setElogios] = useState('');
  const [dificuldades, setDificuldades] = useState('');
  const [presenca, setPresenca] = useState('');
  const [categorias, setCategorias] = useState(''); 
  const [id, setId] = useState(null);
const [nifusuario, setNifUsuario] = useState('');
const [campotexto, setCampoTexto] = useState('');
const [mensagens, setMensagens] = useState(false);
 const [camposTexto, setCamposTexto] = useState([]);
 const [idRVE, setIdRVE] = useState(null);

const GerarIdCampo = () => {
    setId(Math.floor(Math.random() * 10000));
    };
    const gerarIdRve = () => {  
       setIdRVE(Math.floor(Math.random() * 100000));  
    };

const handleEnviarMensagem = async (e) => {
    GerarIdCampo();
e.preventDefault();
try {
    
const CampoTexto1 = {
id:Number(id),
nifusuario:Number(nifusuario),
campotexto
};
console.log(CampoTexto1);
const AllComents = await ObterCampoTextoPorId(Number(id));
console.log(AllComents);
if(AllComents ==  null){
if (true) { // Replace with the actual condition
 CriarCampoTexto(CampoTexto1);
alert('Campo de texto cadastrado com sucesso');
setCampoTexto('');
}
}}
catch (error) {
console.error('Erro ao criar campo de texto:', error);
}
} 
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


  const handleCriarRVE = async (e) => {  
    gerarIdRve();
    e.preventDefault();  
    try {  
      const rve = { 
        idRVE:Number(idRVE),
        autor,
        estudante,
        curso,
        turma,
        data,
        hora,
        motivo,
        orientacoesEstudante,
        descricaoOcorrido,
        docentesEnvolvidos:Array(docentesEnvolvidos),
        assinaturas:Array(Boolean(assinaturas)),   
        presenca
      };  
      console.log(idRVE);
      console.log(rve);
      await CriarRve(rve);  
      console.log(idRVE);
      alert('Usuário cadastrado com sucesso');  
      setMensagens(true);
      // Limpar os campos após o cadastro  
      setAutor('');
      setEstudante('');
      setCurso('');
      setTurma('');
      setData('');
      setHora('');
      setMotivo('');
      setOrientacoesEstudante('');
      setDescricaoOcorrido('');
      setDocentesEnvolvidos('');
      setAssinaturas('');
      setElogios('');
      setDificuldades('');
      setPresenca('');
      setCategorias('');
    } catch (error) {  
      console.error('Erro ao criar RVE:', error);  
      alert('Erro ao cadastrar usuário');  
    }  
  };  
  console.log(idRVE);
useEffect(() => {
  const fetchCamposTexto = async () => {
    if (mensagens === true) {
      console.log(Number(idRVE));
      const res = await getCampostextoRve(Number(idRVE));
      console.log(camposTexto);
      
      setCamposTexto(res);
    }
  }
  if (mensagens === true) {
    fetchCamposTexto();
  }
}, [mensagens, idRVE, camposTexto]);

  return (  
    <div className="container">  
      <h1>Registro de vida escolar</h1> 
      { !mensagens ?  <form onSubmit={handleCriarRVE}>
        <div>
          <input  
            type="text"  
            name="autor"  
            placeholder="Autor"  
            value={autor}  
            onChange={(e) => setAutor(e.target.value)}  
            maxLength="15"  
            required  
            className="input"  
          />  
        </div>
        <div>
          <input  
            type="text"  
            name="estudante"  
            placeholder="Estudante"  
            value={estudante}  
            onChange={(e) => setEstudante(e.target.value)}  
            required  
            className="input"  
          />  
        </div>
        <div>
          <input  
            type="text"  
            name="curso"  
            placeholder="Curso"  
            value={curso}  
            onChange={(e) => setCurso(e.target.value)}  
            required  
            className="input"  
          />  
        </div>
        <div>
          <input  
            type="text"  
            name="turma"  
            placeholder="Turma"  
            value={turma}  
            onChange={(e) => setTurma(e.target.value)}  
            required  
            className="input"  
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
            className="input"  
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
            className="input"  
          />  
        </div>
        <div>
          <input  
            type="text"  
            name="motivo"  
            placeholder="Motivo"  
            value={motivo}  
            onChange={(e) => setMotivo(e.target.value)}  
            required  
            className="input"  
          />  
        </div>
        <div>
          <textarea  
            name="orientacoesEstudante"  
            placeholder="Orientações ao Estudante"  
            value={orientacoesEstudante}  
            onChange={(e) => setOrientacoesEstudante(e.target.value)}  
            required  
            className="input"  
          />  
        </div>
        <div>
          <textarea  
            name="descricaoOcorrido"  
            placeholder="Descrição do Ocorrido"  
            value={descricaoOcorrido}  
            onChange={(e) => setDescricaoOcorrido(e.target.value)}  
            required  
            className="input"  
          />  
        </div>
        <div>
          <input  
            type="text"  
            name="docentesEnvolvidos"  
            placeholder="Docentes Envolvidos"  
            value={docentesEnvolvidos}  
            onChange={(e) => setDocentesEnvolvidos(e.target.value)}  
            required  
            className="input"  
          />  
        </div>
        <div>
          <input  
            type="text"  
            name="assinaturas"  
            placeholder="Assinaturas"  
            value={assinaturas}  
            onChange={(e) => setAssinaturas(e.target.value)}  
            required  
            className="input"  
          />  
        </div>
        <div>
          <input  
            type="text"  
            name="elogios"  
            placeholder="Elogios"  
            value={elogios}  
            onChange={(e) => setElogios(e.target.value)}  
            className="input"  
          />  
        </div>
        <div>
          <input  
            type="text"  
            name="dificuldades"  
            placeholder="Dificuldades"  
            value={dificuldades}  
            onChange={(e) => setDificuldades(e.target.value)}  
            className="input"  
          />  
        </div>
        <div>
          <input  
            type="text"  
            name="presenca"  
            placeholder="Presença"  
            value={presenca}  
            onChange={(e) => setPresenca(e.target.value)}  
            className="input"  
          />  
        </div>
        <div>
          <select  
            name="categorias"  
            value={categorias}  
            onChange={(e) => setCategorias(e.target.value)}  
            required  
            className="input"  
          >  
            <option value="">Selecione uma categoria</option>  
            {categories.map((category, index) => (  
              <option key={index} value={category}>{category}</option>  
            ))}  
          </select>  
        </div>
        <button 
          type="submit"
        >Criar RVE</button>
      </form> : 
      <div>
        <h2>Campos de texto</h2>
        {camposTexto.map((campoTexto, index) => (
          <div key={index}>
            <p>{campoTexto.campotexto}</p>
          </div>
        ))}
      <form onSubmit={handleEnviarMensagem}>
        <div>
          <input  
            type="text"  
            name="nifusuario"  
            placeholder="nifusuario"  
            value={nifusuario}  
            onChange={(e) => setNifUsuario(e.target.value)}  
            className="input"  
          />  
        </div>
        <div>
          <input  
            type="text"  
            name="campotexto"  
            placeholder="campotexto"  
            value={campotexto}  
            onChange={(e) => setCampoTexto(e.target.value)}  
            className="input"  
          />  
        </div>
        <button type="submit" onClick={handleEnviarMensagem}>Enviar Mensagem</button>
      </form>
      </div>
      }
    </div>  
  );  
};  

export default Rve;
