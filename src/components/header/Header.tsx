import { Link } from 'react-router-dom';
import './Header.css';
import { useAuth } from '../../config/AuthProvider';
import logoUrl from '../../assets/sweet-moments.webp'
import { useHeader } from '../../context/HeaderContext';
import { logout } from '../../services/Auth.service';

export function Header({ title }:{ title:string}) {
    const user = useAuth();
    const {isOpen, handleIsOpen} = useHeader();
    
    const handleLogout = () => {logout().then(() => user.logout())};


    return (
        <div className="header">
            <div className='header-info'>
                <Link to='/'>
                    <img className='header-logo' src={logoUrl} alt={title}></img>
                </Link>
                <span className='header-title'>{title}</span>
            </div>

            <div className="header-user">
                    <span>{user?.principal}</span>
                <img onClick={() => handleIsOpen()} className="header-avatar"
                    src="https://pbs.twimg.com/profile_images/730777468202688516/J34OEG_u_400x400.jpg"
                    alt="user avatar"
                ></img>
                {isOpen && 
                    <div className='header-menu'>
                        <img className="header-avatar"
                            src="https://pbs.twimg.com/profile_images/730777468202688516/J34OEG_u_400x400.jpg"
                            alt="user avatar"
                        ></img>
                        <span className='header-menu_greetings'>¡Hola {user.principal}!</span>
                        <Link className='header-menu_options' to='/' onClick={() => handleIsOpen()}>Principal</Link>
                        <Link className='header-menu_options' to='/catalogos' onClick={() => handleIsOpen()}>Catalogos</Link>
                        <Link className='header-menu_options' to='/productos' onClick={() => handleIsOpen()}>Productos</Link>
                        <span className='header-menu_options' onClick={handleLogout}>Cerrar sesion</span>
                    </div>
                }
            </div>
        </div>
    )
}