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
            if (userNif && Array.isArray(userNif) && userNif.length > 0 && Array.isArray(userNif[0])) {  
                const nif = userNif[0][0]?.nif; // Use optional chaining to prevent errors  
                const rves = await getAllUsersrve_usuarios(nif);  
                for (let i = 0; i < rves.length; i++) {  
                    const rves2 = await RveById(rves[i].id_rve);  
                    setListRve(prevList => {
                        const isDuplicate = prevList.some(item => item[0].id === rves2[0].id);
                        if (!isDuplicate) {
                            return [...prevList, rves2];
                        }
                        return prevList;
                    }); // Use setListRve to update state immutably and avoid duplicates
                }  
            }  
        };  
        handleRves();  
    }, []);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + ITEMS_PER_PAGE) % listRve.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - ITEMS_PER_PAGE + listRve.length) % listRve.length);
    };

    const currentItems = listRve.slice(currentIndex, currentIndex + ITEMS_PER_PAGE);

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
