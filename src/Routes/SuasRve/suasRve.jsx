import React, { useState, useEffect } from 'react';  
import userData from '../../Data/dadosUser';  
import { getAllUsersrve_usuarios } from '../../Data/server';  
import './styles.modules.css'; // Importando o CSS  
import { Navigate } from 'react-router-dom';

const SuasRve = () => {  
    const [listRve, setListRve] = useState([]);  
    const [currentIndex, setCurrentIndex] = useState(0);  
    const ITEMS_PER_PAGE = 5;  

    useEffect(() => {  
        const handleRves = async () => {  
            const userNif = userData.getUsers();  
            console.log('User NIF:', userNif); // Log user NIF for debugging
            const rves = await getAllUsersrve_usuarios(userNif[0][0].nif);  
            console.log('Fetched RVE data:', rves); // Log fetched data  
            setListRve(Array.isArray(rves) ? rves : []); // Ensure rves is an array  
        };  
        handleRves();  
    }, []);  

    const handlePrev = () => {  
        setCurrentIndex((prevIndex) => Math.max(prevIndex - ITEMS_PER_PAGE, 0));  
    };  

    const handleNext = () => {  
        setCurrentIndex((prevIndex) => Math.min(prevIndex + ITEMS_PER_PAGE, listRve.length - ITEMS_PER_PAGE));  
    };  

    const currentItems = listRve.slice(currentIndex, currentIndex + ITEMS_PER_PAGE);  
    console.log('Current items:', currentItems); // Log current items for debugging  

    const handleRve = () => {
        return <Navigate to="/rve" chatAtivo={true} />;
    }
  return (  
        <div className="container"> 

            {listRve.length > 0 ? (  
                <div>  
                    <button onClick={handleRve()}>
                    {Array.isArray(currentItems) && currentItems.length > 0 ? (  
                        currentItems.map((rveItem) => (  
                            <div key={rveItem.id} className="card">  
                                <p>ID: {rveItem.id}</p>  
                                <p>Estudante: {rveItem.estudante}</p>  
                            </div>  
                        ))  
                      
                    ) : (  
                        <p>No items to display.</p>  
                    )}  
                      </button>
                    <div className="pagination">  
                        <button className="button" onClick={handlePrev} disabled={currentIndex === 0}>Previous</button>  
                        <button className="button" onClick={handleNext} disabled={currentIndex + ITEMS_PER_PAGE >= listRve.length}>Next</button>  
                    </div>  
                </div>  
            ) : (  
                <p className="no-data">No RVE data available.</p>  
            )}  
        </div>  
    );  
};  

export default SuasRve;