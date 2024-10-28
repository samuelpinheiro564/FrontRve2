import React, { useState, useEffect } from 'react';  
import userData from '../../Data/dadosUser';  
import { RveById } from '../../Data/server';  

const SuasRve = () => {  
    const [rve, setRve] = useState([]);  

    useEffect(() => {  
        const dadosUser = userData.getUsers();  
        console.log(dadosUser);  
        
        // Check if there is a user and get their NIF  
        if (dadosUser.length > 0 && dadosUser[0].length > 0) {  
            const nif = dadosUser[0][0].nif; // Adjust this if the structure is different  
            console.log(nif);  

            // Set Rve state with the result of RveById  
            const fetchedRves = RveById(nif);  
            if (Array.isArray(fetchedRves)) { // Ensure that fetchedRves is an array  
                setRve(fetchedRves);  
            } else {  
                console.warn("RveById did not return an array:", fetchedRves);  
                setRve([]); // Fallback if not an array  
            }  
        }  
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