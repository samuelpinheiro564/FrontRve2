import React, { useState } from 'react';
import userData from '../../Data/dadosUser';
//import { RveById } from '../../Data/server';

const SuasRve = () => {
    const [rve] = useState([]);
  
    const dadosUser = userData.getUsers();
    console.log(dadosUser);


    return (
        <div>
            {rve.map(() => (
                <div key={rve.nif}>
                    <p>{rve.estudante}</p>
                    <p>{rve.data}</p>
                    <p>{rve.motivo}</p>
                </div>
            ))}
        </div>
    )
}
export default SuasRve;