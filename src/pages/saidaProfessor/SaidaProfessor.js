import React, { useState } from 'react';  
import './styles.modules.css';  

const SaidaProfessor = () => {  
  const [studentName, setStudentName] = useState('');  
  const [course, setCourse] = useState('');  
  const [classRoom, setClassRoom] = useState('');  
  const [ra, setRa] = useState('');  
  const [justification, setJustification] = useState('');  
  const [date, setDate] = useState('');  
  const [time, setTime] = useState('');  
  const [teacherSignature, setTeacherSignature] = useState('');  
  const [qualityAnalystSignature, setQualityAnalystSignature] = useState('');  
  const [history, setHistory] = useState([]);  

  const handleSubmit = (e) => {  
    e.preventDefault();  
    const newEntry = {  
      justification,  
      date: `${time} ${date}`,  
    };  
    setHistory([...history, newEntry]);  
    // Reset form fields  
    setStudentName('');  
    setCourse('');  
    setClassRoom('');  
    setRa('');  
    setJustification('');  
    setDate('');  
    setTime('');  
    setTeacherSignature('');  
    setQualityAnalystSignature('');  
  };  

  return (  
    <div className="container">  
      <h1>JUSTIFICATIVA SAÍDA</h1>  
      <form onSubmit={handleSubmit}>  
        <label>Aluno:</label>  
        <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} />  

        <label>Curso:</label>  
        <input type="text" value={course} onChange={(e) => setCourse(e.target.value)} />  

        <label>Turma:</label>  
        <input type="text" value={classRoom} onChange={(e) => setClassRoom(e.target.value)} />  

        <label>RA:</label>  
        <input type="text" value={ra} onChange={(e) => setRa(e.target.value)} />  

        <label>Maior de Idade:</label>  
        <div>  
          <label>Sim</label>  
          <input type="radio" name="age" value="yes" />  
          <label>Não</label>  
          <input type="radio" name="age" value="no" />  
        </div>  

        <label>Data:</label>  
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />  
        <label>Hora:</label>  
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />  

        <label>Justificativa:</label>  
        <textarea value={justification} onChange={(e) => setJustification(e.target.value)} />  

        <label>Assinatura do professor:</label>  
        <input type="text" value={teacherSignature} onChange={(e) => setTeacherSignature(e.target.value)} />  
        <button type="button" onClick={() => alert('Assinatura do professor enviada!')}>Enviar</button>  

        <label>Assinatura do analista de qualidade:</label>  
        <input type="text" value={qualityAnalystSignature} onChange={(e) => setQualityAnalystSignature(e.target.value)} />  
        <button type="button" onClick={() => alert('Assinatura do analista enviada!')}>Enviar</button>  

        <button type="submit">Enviar Saída</button>  
      </form>  

      <h2>Histórico de Saídas e Atestados</h2>  
      <table>  
        <thead>  
          <tr>  
            <th>Justificativa</th>  
            <th>Data e Hora</th>  
          </tr>  
        </thead>  
        <tbody>  
          {history.map((entry, index) => (  
            <tr key={index}>  
              <td>{entry.justification}</td>  
              <td>{entry.date}</td>  
            </tr>  
          ))}  
        </tbody>  
      </table>  
    </div>  
  );  
};  

export default SaidaProfessor;