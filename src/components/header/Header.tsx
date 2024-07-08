import { Link } from 'react-router-dom';
import './Header.css';
import { useAuth } from '../../config/AuthProvider';
import logoUrl from '../../assets/sweet-moments.webp'
import { useState } from 'react';

export function Header({ title }:{ title:string }) {
    const {principal, logout} = useAuth()
    const [open, setOpen] = useState(false);

    return (
        <div className="header" onClick={() => setOpen(!open)}>
            <div className='header-info'>
                <Link to='/'>
                    <img className='header-logo' src={logoUrl} alt={title}></img>
                </Link>
                <span className='header-title'>{title}</span>
            </div>

            <div className="header-user">
                    <span>{principal?.user}</span>
                <img onClick={() => setOpen(!open)} className="header-avatar"
                    src="https://pbs.twimg.com/profile_images/730777468202688516/J34OEG_u_400x400.jpg"
                    alt="user avatar"
                ></img>
                {open && 
                    <div className='header-menu'>
                        <img className="header-avatar"
                            src="https://pbs.twimg.com/profile_images/730777468202688516/J34OEG_u_400x400.jpg"
                            alt="user avatar"
                        ></img>
                        <span className='header-menu_greetings'>¡Hola {principal?.user}!</span>
                        <Link className='header-menu_options' to='/' onClick={() => setOpen(!open)}>Principal</Link>
                        <Link className='header-menu_options' to='/catalogos' onClick={() => setOpen(!open)}>Catalogos</Link>
                        <Link className='header-menu_options' to='/productos' onClick={() => setOpen(!open)}>Productos</Link>
                        <span className='header-menu_options' onClick={logout}>Cerrar sesion</span>
                    </div>
                }
            </div>
        </div>
    )
}