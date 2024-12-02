import React, { useState, useEffect } from 'react';
import userData from '../../Data/dadosUser';
import styles from '../Perfil/styles.module.css';

const Perfil = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const user = userData.getUsers()[0];
            setUser(user);
        };
        fetchUserData();
    }, []);

    if (!user) {
        return <p>Carregando...</p>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Perfil do Usuário</h1>
            <div className={styles.profileCard}>
                <p className={styles.p}><strong>Nome:</strong> {user.nome}</p>
                <p className={styles.p}><strong>NIF:</strong> {user.nif}</p>
                <p className={styles.p}><strong>Tipo de Usuário:</strong> {user.tipo}</p>
                {user.tipo === 'admin' || user.tipo === 'anaq' ? (
                    <AdminAnaqAccess user={user} />
                ) : (
                    <DocenteAccess user={user} />
                )}
            </div>
        </div>
    );
};

const AdminAnaqAccess = ({ user }) => (
    <div className={styles.adminAnaqSection}>
        <h2>Acesso de Administrador/Analista de Qualidade</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Telefone:</strong> {user.telefone}</p>
        <p><strong>Data de Criação:</strong> {new Date(user.dataCriacao).toLocaleDateString()}</p>
        <p><strong>Último Login:</strong> {new Date(user.ultimoLogin).toLocaleDateString()}</p>
     
    </div>
);

const DocenteAccess = ({ user }) => (
    <div className={styles.docenteSection}>
        <h2>Acesso de Docente</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Telefone:</strong> {user.telefone}</p>
        <p><strong>Data de Criação:</strong> {new Date(user.dataCriacao).toLocaleDateString()}</p>
        <p><strong>Último Login:</strong> {new Date(user.ultimoLogin).toLocaleDateString()}</p>
        <button className={styles.button}>Visualizar Relatórios</button>
    </div>
);

export default Perfil;
