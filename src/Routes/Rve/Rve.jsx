import { useState} from "react";
import userData from "../../Data/dadosUser";
import rveData  from "../../Data/DadosRve";
import {CriarRve} from "../../Data/server";

const Rve = () => {
  const [estudante,setEstudante] = useState("");
  const [curso,setCurso] = useState("");
  const [turma,setTurma] = useState("");
  const [data,setData] = useState("");
  const [hora,setHora] = useState("");
  const [motivo,setMotivo] = useState("");
  const [orientacoesestudante,setOrientacoesEstudante] = useState("");
  const [descricaoocorrido,setDescricaoOcorrido] = useState("");
  const [dificuldades,setDificuldades] = useState("");
  const [presenca,setPresenca] = useState("");

  const user = userData.getUsers();
  console.log(user);

  const generateId = () => {
    return Math.floor(Math.random() * 100000);
  };

  const CriandoRVE = async (e) => {
try{
  const nifautor = user[0].nif;
  const id = generateId();
const rve ={
  id,
  nifautor,
  estudante,
  curso,
  turma,
  data,
  hora,
  motivo,
  orientacoesestudante,
  descricaoocorrido,
  dificuldades,
  presenca,
}
rveData.addRve(rve);
console.log(rve)
await CriarRve(rve);
}
catch{
  console.log("erro")
}
  };

  return (
    <div>
      <h1>Rve</h1>
      <form>
      <div>
        <input
          type="text"
          placeholder="Estudante"
          value={estudante}
          onChange={(e) => setEstudante(e.target.value)}
        />
        </div>
        <div>
        <input
          type="text"
          placeholder="Curso"
          value={curso}
          onChange={(e) => setCurso(e.target.value)}
        />
        </div>
        <div>
        <input
          type="text"
          placeholder="Turma"
          value={turma}
          onChange={(e) => setTurma(e.target.value)}
        />
        </div>
        <div >
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
        <input
          type="text"
          placeholder="Motivo"
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
        />
        </div>
        <div>
        <input
          type="text"
          placeholder="Orientações ao estudante"
          value={orientacoesestudante}
          onChange={(e) => setOrientacoesEstudante(e.target.value)}
        />
        </div>
        <div>
        <input
          type="text"
          placeholder="Descrição do ocorrido"
          value={descricaoocorrido}
          onChange={(e) => setDescricaoOcorrido(e.target.value)}
        />
        </div>
        <div>
        <input
          type="text"
          placeholder="Dificuldades"
          value={dificuldades}
          onChange={(e) => setDificuldades(e.target.value)}
        />
        </div>
        <div>
        <input
          type="text"
          placeholder="Presença"
          value={presenca}
          onChange={(e) => setPresenca(e.target.value)}
        />
        </div>
        <button type="submit" onClick={CriandoRVE()}>Submit</button>
      </form>
    </div>
  );
};
export default Rve;