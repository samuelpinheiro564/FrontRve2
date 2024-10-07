import React, { useState } from 'react';
import '../Rve/styles.css';

const Rve = () => {
  const [formData, setFormData] = useState({
    estudante: '',
    unidadeCurricular: '',
    autor: '',
    turma: '',
    docentes: '',
    data: '',
    hora: '',
    tema: '',
    descricaoSituacao: '',
    recomendacoes: '',
    assinatura: '',
    aspectos: [],
    categorias: [], 
  });

  const [submittedData, setSubmittedData] = useState(null); 
  const [errors, setErrors] = useState({});
  const [showData, setShowData] = useState(false);
  const [comment, setComment] = useState(''); 
  const [comments, setComments] = useState([]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevState) => {
      const newCategorias = checked
        ? [...prevState.categorias, name]
        : prevState.categorias.filter((categoria) => categoria !== name);
      return { ...prevState, categorias: newCategorias };
    });
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (!formData[key] && key !== 'aspectos' && key !== 'categorias') {
        newErrors[key] = 'Este campo é obrigatório';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmittedData(formData); 
      setFormData({ 
        estudante: '',
        unidadeCurricular: '',
        autor: '',
        turma: '',
        docentes: '',
        data: '',
        hora: '',
        tema: '',
        descricaoSituacao: '',
        recomendacoes: '',
        assinatura: '',
        aspectos: [],
        categorias: [],
      });
      setErrors({});
    }
  };

  const handleShowData = () => {
    setShowData(!showData);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment('');
    }
  };

  const categories = [  
    "Aprendizagem",  
    "Atitude/postura/comportamento",  
    "Frequência",  
    "Oficina/Segurança",  
    "Relacionamento interpessoal",  
    "Rendimento",  
    "Saúde física",  
    "Saúde mental",  
    "Outras"  
  ];  

  return (
    <div className="container">
      <h1>Registro de vida escolar</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Estudante:</label>
          <input type="text" name="estudante" value={formData.estudante} onChange={handleChange} />
          {errors.estudante && <span className="error">{errors.estudante}</span>}
        </div>
        <div className="form-group">
          <label>Turma:</label>
          <input type="text" name="turma" value={formData.turma} onChange={handleChange} />
          {errors.turma && <span className="error">{errors.turma}</span>}
        </div>
        <div className="form-group">
          <label>Unidade Curricular:</label>
          <input type="text" name="unidadeCurricular" value={formData.unidadeCurricular} onChange={handleChange} />
          {errors.unidadeCurricular && <span className="error">{errors.unidadeCurricular}</span>}
        </div>
        <div className="form-group">
          <label>Docentes:</label>
          <input type="text" name="docentes" value={formData.docentes} onChange={handleChange} />
          {errors.docentes && <span className="error">{errors.docentes}</span>}
        </div>
        <div className="form-group">
          <label>Autor(a):</label>
          <input type="text" name="autor" value={formData.autor} onChange={handleChange} />
          {errors.autor && <span className="error">{errors.autor}</span>}
        </div>
        <div className="form-group">
          <label>Data:</label>
          <input type="date" name="data" value={formData.data} onChange={handleChange} />
          {errors.data && <span className="error">{errors.data}</span>}
        </div>
        <div className="form-group">
          <label>Hora:</label>
          <input type="time" name="hora" value={formData.hora} onChange={handleChange} />
          {errors.hora && <span className="error">{errors.hora}</span>}
        </div>
        <div className="form-group">
          <label>Tema:</label>
          <input type="text" name="tema" value={formData.tema} onChange={handleChange} />
          {errors.tema && <span className="error">{errors.tema}</span>}
        </div>

        <h2>Descrição da Situação:</h2>
        <textarea name="descricaoSituacao" value={formData.descricaoSituacao} onChange={handleChange} />
        {errors.descricaoSituacao && <span className="error">{errors.descricaoSituacao}</span>}

        <h2>Recomendações e Orientações ao Estudante:</h2>
        <textarea name="recomendacoes" value={formData.recomendacoes} onChange={handleChange} />
        {errors.recomendacoes && <span className="error">{errors.recomendacoes}</span>}

        <div className="form-group">
          <label>Assinatura do Autor:</label>
          <input type="text" name="assinatura" value={formData.assinatura} onChange={handleChange} />
          {errors.assinatura && <span className="error">{errors.assinatura}</span>}
        </div>

        <h2>Categorias:</h2>
        <div className="form-group">
          {categories.map((category) => (
            <div key={category}>
              <label>
                <input
                  type="checkbox"
                  name={category}
                  checked={formData.categorias.includes(category)}
                  onChange={handleCheckboxChange}
                />
                {category}
              </label>
            </div>
          ))}
        </div>

        <button type="submit">Enviar</button>
      </form>

      {submittedData && (
        <div className="submitted-data">
          <h2>Dados Enviados:</h2>
          <button onClick={handleShowData}>
            {showData ? "Ocultar Dados" : "Mostrar Dados"}
          </button>
          {showData && (
            <div>
              <p><strong>Estudante:</strong> {submittedData.estudante}</p>
              <p><strong>Turma:</strong> {submittedData.turma}</p>
              <p><strong>Unidade Curricular:</strong> {submittedData.unidadeCurricular}</p>
              <p><strong>Docentes:</strong> {submittedData.docentes}</p>
              <p><strong>Autor(a):</strong> {submittedData.autor}</p>
              <p><strong>Data:</strong> {submittedData.data}</p>
              <p><strong>Hora:</strong> {submittedData.hora}</p>
              <p><strong>Tema:</strong> {submittedData.tema}</p>
              <p><strong>Descrição da Situação:</strong> {submittedData.descricaoSituacao}</p>
              <p><strong>Recomendações:</strong> {submittedData.recomendacoes}</p>
              <p><strong>Assinatura:</strong> {submittedData.assinatura}</p>
              <p><strong>Categorias:</strong> {submittedData.categorias.join(', ')}</p>
            </div>
          )}
        </div>
      )}

      <div className="comments-section">
        <h2>Comentários:</h2>
        <form onSubmit={handleCommentSubmit}>
          <textarea value={comment} onChange={handleCommentChange} placeholder="Escreva seu comentário aqui..." />
          <button type="submit">Enviar Comentário</button>
        </form>
        <ul>
          {comments.map((cmt, index) => (
            <li key={index}>{cmt}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default Rve;
