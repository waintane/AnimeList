import { Link } from "react-router-dom";

function Header(){
    return(
        <nav>
            <ul>
                <li>
                    <Link to="/">Accueil</Link>
                </li>
                <li>
                    <Link to="/register">Enregistrement</Link>
                </li>
                <li>
                    <Link to="/login">Connexion</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Header;