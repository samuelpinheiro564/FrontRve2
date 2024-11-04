import React, { useState, useEffect } from 'react';  
import userData from '../../Data/dadosUser';  
import { getAllUsersrve_usuarios,RveById } from '../../Data/server';  

const SuasRve = () => {  
    const [rve, setRve] = useState([]);  

    useEffect(() => {  
        const handleRves = async () => {
        const userNif = userData.getUsers();  
        console.log(userNif);  
        console.log(userNif[0][0].nif);
        const rves = await getAllUsersrve_usuarios(userNif[0][0].nif);
        console.log(rves);
        setRve(rves); 
        for(let i = 0; i < rves.length; i++){
            const rves2 = await RveById(rves[i].id_rve)
            console.log(rves2)
        }
        }
        handleRves();
    }, []); // Empty array means this effect runs once on mount  

    return (  
        <div>  
            {rve.length > 0 ? (  
                rve.map((item) => (  
                    <div key={`${item.usuario_nif}_${item.id_rve}`}>  
                        <p>{item.estudante}</p>  
                        <p>{item.data}</p>  
                        <p>{item.motivo}</p>  
                    </div>  
                ))  
            ) : (  
                <p>No RVE data available.</p>  
            )}  
        </div>  
    );  
};  

export default SuasRve;