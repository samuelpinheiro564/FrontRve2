import React, { useState, useEffect } from 'react';
import { UserName, UserType ,AllUsers } from '../../Data/server';
import styles from './styles.modules.css';

const ListaUsers = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [filtro, setFiltro] = useState('');
    const [tipoFiltro, setTipoFiltro] = useState('nome');
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                let result;
                if (filtro === '') {
                    result = await AllUsers(); // Busca todos os usuários
                } else if (tipoFiltro === 'nome') {
                    result = await UserName(filtro);
                } else {
                    result = await UserType(filtro);
                }
                setUsuarios(result);
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
            }
        };
        fetchUsuarios();
    }, [filtro, tipoFiltro]);

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(usuarios.length / ITEMS_PER_PAGE)));
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
                        <th>NIF</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Tipo</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsuarios.map((usuario) => (
                        <tr key={usuario.nif}>
                            <td>{usuario.nif}</td>
                            <td>{usuario.nome}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.telefone}</td>
                            <td>{usuario.tipo}</td>
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
