import React, { useState, useEffect } from 'react';  
import userData from '../../Data/dadosUser';  
import { getAllUsersrve_usuarios, RveById } from '../../Data/server';  

const SuasRve = () => {  
    const [listRve, setListRve] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const ITEMS_PER_PAGE = 5; // Define o número de itens por página

    useEffect(() => {  
        const handleRves = async () => {
        const userNif = userData.getUsers();  
        console.log(userNif);  
        console.log(userNif[0][0].nif);
        const rves = await getAllUsersrve_usuarios(userNif[0][0].nif);
        console.log(rves);
        setRve(rves); 
        for(let i = 0; i < rves.length; i++){
            const rveid = rves[i].id_rve;
            console.log(rveid);
            const rves2 = await RveById(rveid)
            console.log(rves2)
        }
        }
        handleRves();
    }, []); // Empty array means this effect runs once on mount  
console.log(rve);
    return (  
        <div>  
            {listRve.length > 0 ? (  
                <div>
                    {currentItems.map((rveItem) => (
                        <div key={rveItem[0].id} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
                            <p>ID: {rveItem[0].id}</p>
                            <p>Estudante: {rveItem[0].estudante}</p>
                        </div>
                    ))}
                    <button onClick={handlePrev}>Previous</button>
                    <button onClick={handleNext}>Next</button>
                </div>  
            ) : (  
                <p>No RVE data available.</p>  
            )}  
        </div>  
    );  
};  

export default SuasRve;
