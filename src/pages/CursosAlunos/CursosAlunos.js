import React, { useState } from 'react';  
import '../CursosAlunos/styles.modules.css';  

function CursosAlunos() {  
  const [searchTerm, setSearchTerm] = useState('');  
  const [selectedCourse, setSelectedCourse] = useState(null);  
  const courses = ['Mecanica', 'TDS1', 'TDS2', 'TE1', 'TE2', 'ADM'];  

  const handleSearchChange = (event) => {  
    setSearchTerm(event.target.value);  
  };  

  const handleCourseClick = (course) => {  
    setSelectedCourse(course);  
  };  

  const handleReset = () => {  
    setSearchTerm('');  
    setSelectedCourse(null);  
  };  

  const filteredCourses = courses.filter(course =>  
    course.toLowerCase().includes(searchTerm.toLowerCase())  
  );  

  return (  
    <div className="app">  
      <header className="header">  
        <h1>SENAI</h1>  
      </header>  
      <div className="container">  
        <div className="search-bar">  
          <input  
            type="text"  
            placeholder="Search..."  
            value={searchTerm}  
            onChange={handleSearchChange}  
          />  
          <button onClick={handleReset}>Reset</button>  
        </div>  
        <div className="buttons">  
          {filteredCourses.length > 0 ? (  
            filteredCourses.map(course => (  
              <button  
                key={course}  
                onClick={() => handleCourseClick(course)}  
                className={selectedCourse === course ? 'selected' : ''}  
              >  
                {course}  
              </button>  
            ))  
          ) : (  
            <div className="not-found">  
              <h2>Não encontrado</h2>  
            </div>  
          )}  
        </div>  
      </div>  
    </div>  
  );  
}

export default CursosAlunos;