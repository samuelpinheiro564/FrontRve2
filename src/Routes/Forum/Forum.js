import React, { useState } from 'react';
import {CriarCampoTexto,} from '../../Data/server';

const ConversationPage = () => {
// const [forum, setForum] = useState('');
// const [autor, setAutor] = useState('');
// const [mensagem, setMensagem] = useState('');
const [id, setId] = useState(null);
const [nifusuario, setNifUsuario] = useState('');
const [campotexto, setCampoTexto] = useState('');



const GerarId = () => {
    setId(Math.floor(Math.random() * 10000));
    };

const handleCriarForum = async (e) => {
    GerarId();
e.preventDefault();
try {
    
const CampoTexto1 = {
id:Number(id),
nifusuario:Number(nifusuario),
campotexto
};
console.log(CampoTexto1);
 CriarCampoTexto(CampoTexto1);
alert('Campo de texto cadastrado com sucesso');
setCampoTexto('');
}
catch (error) {
console.error('Erro ao criar campo de texto:', error);
}
}

  return (
    <div>
<h1>Forum</h1>
<form onSubmit={handleCriarForum}>
<input  
    type="Number"  
            name="NifUsuario"  
            placeholder="NifUsuario"  
            value={nifusuario}  
            onChange={(e) => setNifUsuario(e.target.value)}  
            className="input"  
          />  
              <input  
            type="text"  
            name="presenca"  
            placeholder="Presença"  
            value={campotexto}  
            onChange={(e) => setCampoTexto(e.target.value)}  
            className="input"  
          />  
<button type="submit" onClick={handleCriarForum}>Criar Campo de Texto</button>
</form>

    </div>
  
  );
};

export default ConversationPage;