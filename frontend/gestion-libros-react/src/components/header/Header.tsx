import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './Header.css'

function Header() {
    const {userLoggedIn} = useContext(AuthContext);
    function getUserEmail(): string | null {
        return localStorage.getItem('userEmail') + ' 💚';
    }

    return (
        <div className='header'>
            <h2>Sistema de Gestión de Libros</h2>
            {userLoggedIn ? <h6>{getUserEmail()}</h6> : null}
        </div>
    )
}

export default Header