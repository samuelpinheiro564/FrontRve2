import React, { useEffect, useState } from 'react';  
import axios from 'axios';  

const UserList = () => {  
  const [users, setUsers] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState('');  

  useEffect(() => {  
    const fetchUsers = async () => {  
      try {  
        const response = await axios.get('http://localhost:4040/usuarios'); 
        setUsers(response.data);  
      } catch (error) {  
        setError('Erro ao buscar usuários');  
      } finally {  
        setLoading(false);  
      }  
    };  

    fetchUsers();  
  }, []);  

  if (loading) return <p>Loading...</p>;  
  if (error) return <p>{error}</p>;  

  return (  
    <div>  
      <h1>Lista de Usuários</h1>  
      <ul>  
        {users.map(user => (  
          <li key={user.id}>{user.name}</li>  
        ))}  
      </ul>  
    </div>  
  );  
};  

export default UserList;  