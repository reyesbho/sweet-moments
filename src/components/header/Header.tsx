import { Link } from 'react-router-dom';
import './Header.css';
import { useAuth } from '../../config/AuthProvider';
import logoUrl from '../../assets/sweet-moments.webp'
import { useHeader } from '../../context/HeaderContext';

export function Header({ title }:{ title:string}) {
    const {principal, logout} = useAuth()
    const {isOpen, handleIsOpen} = useHeader()

    return (
        <div className="header">
            <div className='header-info'>
                <Link to='/'>
                    <img className='header-logo' src={logoUrl} alt={title}></img>
                </Link>
                <span className='header-title'>{title}</span>
            </div>

            <div className="header-user">
                    <span>{principal?.user}</span>
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
                        <span className='header-menu_greetings'>¡Hola {principal?.user}!</span>
                        <Link className='header-menu_options' to='/' onClick={() => handleIsOpen()}>Principal</Link>
                        <Link className='header-menu_options' to='/catalogos' onClick={() => handleIsOpen()}>Catalogos</Link>
                        <Link className='header-menu_options' to='/productos' onClick={() => handleIsOpen()}>Productos</Link>
                        <span className='header-menu_options' onClick={logout}>Cerrar sesion</span>
                    </div>
                }
            </div>
        </div>
    )
}