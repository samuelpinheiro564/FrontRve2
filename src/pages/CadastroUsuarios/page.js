import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import "../CadastroUsuarios/styles.modules.css";

const UserRegistration = () => {
    const [formData, setFormData] = useState({ nif: '', email: '', curso: '', senha: '', telefone: '', nome: '' });
    const [showForm, setShowForm] = useState(false);
    const [showCards, setShowCards] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [cards, setCards] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            const updatedCards = [...cards];
            updatedCards[editingIndex] = formData;
            setCards(updatedCards);
            setIsEditing(false);
            setEditingIndex(null);
        } else {
            setCards([...cards, formData]);
        }
        setFormData({ nif: '', email: '', curso: '', senha: '', telefone: '', nome: '' });
        setShowForm(false);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const formatPhoneNumber = (value) => {
        if (!value) return value;
        const phoneNumber = value.replace(/[^\d]/g, '');
        const phoneNumberLength = phoneNumber.length;
        if (phoneNumberLength < 4) return phoneNumber;
        if (phoneNumberLength < 7) {
            return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`;
        }
        return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 7)}-${phoneNumber.slice(7, 11)}`;
    };

    const handleInput = (e) => {
        const { value, maxLength } = e.target;
        if (value.length > maxLength) {
            e.target.value = value.slice(0, maxLength);
        }
    };

    const handleDelete = (index) => {
        const updatedCards = cards.filter((_, i) => i !== index);
        setCards(updatedCards);
    };

    const handleEdit = (index) => {
        setIsEditing(true);
        setEditingIndex(index);
        setFormData(cards[index]);
        setShowForm(true);
    };

    return (
        <div className="container">
            <h1 className="title">Usuários</h1>
            <button onClick={() => setShowForm(!showForm)} className="button">
                {showForm ? 'Cancelar' : 'Cadastrar Usuário'}
            </button>
            <button onClick={() => setShowCards(!showCards)} className="button">
                {showCards ? 'Ocultar Usuários' : 'Ver Usuários'}
            </button>
            {showForm && (
                <form className="form" onSubmit={handleSubmit}>
                    <input
                        type="number"
                        name="nif"
                        placeholder="NIF"
                        value={formData.nif}
                        onChange={handleChange}
                        onInput={handleInput}
                        maxLength="15"
                        required
                        className="input"
                    />
                    <input
                        type="text"
                        name="nome"
                        placeholder="Nome"
                        value={formData.nome}
                        onChange={handleChange}
                        onInput={handleInput}
                        maxLength="100"
                        required
                        className="input"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        onInput={handleInput}
                        maxLength="100"
                        required
                        className="input"
                    />
                    <input
                        type="text"
                        name="curso"
                        placeholder="Curso"
                        value={formData.curso}
                        onChange={handleChange}
                        onInput={handleInput}
                        maxLength="100"
                        required
                        className="input"
                    />
                    <div className="password-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="senha"
                            placeholder="Senha"
                            value={formData.senha}
                            onChange={handleChange}
                            onInput={handleInput}
                            maxLength="150"
                            required
                            className="input"
                        />
                        <span onClick={togglePasswordVisibility} className="password-toggle">
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    <input
                        type="text"
                        name="telefone"
                        placeholder="Telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                        onInput={handleInput}
                        maxLength="15"
                        required
                        className="input"
                    />
                    <button type="submit" className="button">{isEditing ? 'Salvar' : 'Enviar'}</button>
                </form>
            )}
            {showCards && (
                <div className="cards-container">
                    {cards.map((card, index) => (
                        <div key={index} className="card">
                            <p>NIF: {card.nif}</p>
                            <p>Nome: {card.nome}</p>
                            <p>Email: {card.email}</p>
                            <p>Curso: {card.curso}</p>
                            <p>Telefone: {card.telefone}</p>
                            <button onClick={() => handleEdit(index)} className="button">Editar</button>
                            <button onClick={() => handleDelete(index)} className="button">Excluir</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserRegistration;
