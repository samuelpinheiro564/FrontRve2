import { Link, useLocation } from "react-router-dom";
import styles from "../components/Navbar.css";

const Navbar = () => {
    const location = useLocation();

    return (
        <nav className={styles.navbar}>
            <Link to="/" className={`${styles.navLink} ${location.pathname === "/" ? styles.active : ""}`}>
                <span>Home</span>
            </Link>
            <Link to="/Saida" className={`${styles.navLink} ${location.pathname === "/Saida" ? styles.active : ""}`}>
                <span>Saída</span>
            </Link>
            <Link to="/Rve" className={`${styles.navLink} ${location.pathname === "/Rve" ? styles.active : ""}`}>
                <span>RVE</span>
            </Link>
            <Link to="/SaidaProfessor" className={`${styles.navLink} ${location.pathname === "/SaidaProfessor" ? styles.active : ""}`}>
                <span>Saída Professor</span>
            </Link>
            <Link to="/CadastroUsuarios" className={`${styles.navLink} ${location.pathname === "/CadastroUsuarios" ? styles.active : ""}`}>
                <span>Cadastro Usuários</span>
            </Link>
            <Link to="/CategoriDocente" className={`${styles.navLink} ${location.pathname === "/CategoriDocente" ? styles.active : ""}`}>
                <span>Categoria Docente</span>
            </Link>
            <Link to="/CategoriaAdmin" className={`${styles.navLink} ${location.pathname === "/CategoriaAdmin" ? styles.active : ""}`}>
                <span>Categoria Admin</span>
            </Link>
            <Link to="/AlunoAdm" className={`${styles.navLink} ${location.pathname === "/AlunoAdm" ? styles.active : ""}`}>
                <span>Aluno Adm</span>
            </Link>
        </nav>
    );
}

export default Navbar;