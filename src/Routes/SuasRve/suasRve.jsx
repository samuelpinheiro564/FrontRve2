import React, { useState, useEffect } from 'react';  
import userData from '../../Data/dadosUser';  
import { getAllUsersrve_usuarios,RveById } from '../../Data/server';  
import './styles.modules.css'; // Importando o CSS  
import { useNavigate } from 'react-router-dom';
import rveData from '../../Data/DadosRve';


const SuasRve = () => {  
    const [listRve, setListRve] = useState([]);  
    const [currentIndex, setCurrentIndex] = useState(0);  
    const ITEMS_PER_PAGE = 5;
    const navigate = useNavigate();  // Inicializa o hook useNavigate  

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

    const handleRve  = async (id) => {
        localStorage.setItem('selectedRveId', id);
        console.log('Selected RVE ID:', id); // Log selected RVE ID for debugging
        const rveSelected = await RveById(id);
        console.log('Selected RVE:', rveSelected); // Log selected RVE for debugging
        rveData.addRve(rveSelected);
        navigate("/RenderSuasRve", { chatAtivo: true } ); // o chatAtivo é um parâmetro que indica que o chat está ativo 
    }

    return (  
        <div className="container"> 
            {listRve.length > 0 ? (  
                <div>  
                    {Array.isArray(currentItems) && currentItems.length > 0 ? (  
                        currentItems.map((rveItem) => (  
                            <button key={rveItem.id} onClick={() => handleRve(rveItem.id_rve)}>
                                <div className="card">  
                                    <p>ID: {rveItem.id_rve}</p>  
                                    <p>Estudante: {rveItem.estudante}</p>  
                                </div>  
                            </button>
                        ))  
                    ) : (  
                        <p>No items to display.</p>  
                    )}  
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
