import React, { useState, useEffect } from 'react';  
import userData from '../../Data/dadosUser';  
import { getAllUsersrve_usuarios } from '../../Data/server';  

const SuasRve = () => {  
    const [rve, setRve] = useState([]);  

    useEffect(() => {  
        const handleRves = async () => {
        const userNif = userData.getUsers();  
        console.log(userNif);  
        console.log(userNif[0].nif);
        const rves = await getAllUsersrve_usuarios(userNif[0].nif);
        console.log(rves);
        setRve(rves); 
        }
        handleRves();
    }, []); // Empty array means this effect runs once on mount  

    return (  
        <div>  
            {rve.length > 0 ? (  
                rve.map((item) => (  
                    <div key={item.nif}>  
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