import React, { useState, useEffect } from 'react';
import { UserName, UserType, AllUsers, DeleteUser } from '../../Data/server';
import styles from '../ListaUsers/styles.module.css';
import { useNavigate } from 'react-router-dom';

const ListaUsers = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [filtro, setFiltro] = useState('');
    const [tipoFiltro, setTipoFiltro] = useState('nome');
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                let result;
                if (filtro === '') {
                    result = await AllUsers();
                } else if (tipoFiltro === 'nome') {
                    result = await UserName(filtro);
                } else {
                    result = await UserType(filtro);
                }
                setUsuarios(result);
            } catch (error) {
                
            }
        };
        fetchUsuarios();
    });

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(usuarios.length / ITEMS_PER_PAGE)));
    };

    const handleEdit = (usuario) => {
        navigate('/CadastroUsuarios', { state: { user: usuario } });
    };

    const handleDelete = async (nif) => {
       await DeleteUser(nif);
        console.log(`Excluir usuário com NIF: ${nif}`);
        // Aqui você poderia fazer uma chamada para um API para deletar o usuário
    };

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentUsuarios = usuarios.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Lista de Usuários</h1>
            <div className={styles.filter}>
                <input
                    type="text"
                    placeholder={`Buscar por ${tipoFiltro}`}
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                    className={styles.input}
                />
                <select
                    value={tipoFiltro}
                    onChange={(e) => setTipoFiltro(e.target.value)}
                    className={styles.input}
                >
                    <option value="nome">Nome</option>
                    <option value="tipo">Tipo</option>
                </select>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Tipo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsuarios.map((usuario) => (
                        <tr key={usuario.nif}>
                            <td>{usuario.nome}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.tipo}</td>
                            <td>
                                <button onClick={() => handleEdit(usuario)} className={styles.editar}>Editar</button>
                                <button onClick={() => handleDelete(usuario.nif)} className={styles.excluir}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={styles.pagination}>
                <button onClick={handlePrevPage} disabled={currentPage === 1}>Anterior</button>
                <button onClick={handleNextPage} disabled={currentPage === Math.ceil(usuarios.length / ITEMS_PER_PAGE)}>Próxima</button>
            </div>
        </div>
    );
};

export default ListaUsers;
