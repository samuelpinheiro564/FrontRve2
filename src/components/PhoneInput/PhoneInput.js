// src/components/PhoneInput.js  
import React from 'react';  


const PhoneInput = ({ phone, setPhone }) => {  
    return (  
        <div>  
            <label htmlFor="phone">Número (formato internacional):</label>  
            <input  
                type="text"  
                id="phone"  
                value={phone}  
                onChange={(e) => setPhone(e.target.value)}  
            />  
        </div>  
    );  
};  

export default PhoneInput;