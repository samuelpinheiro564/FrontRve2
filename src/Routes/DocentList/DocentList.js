import React, { useState, useEffect } from 'react';   
import { AllUsers } from '../../Data/server';   

const DocentList = () => {  
    const [listaDocentes, setListaDocentes] = useState([]);  
 

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



    return (  
        <>  
            {listaDocentes.map((docente) => (  
              <option key={docente.nif} value={docente.name}>{docente.name}</option>  
            ))}  
        </>  
    );  
};  

export default DocentList;  