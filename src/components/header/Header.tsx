import { Link } from 'react-router-dom';
import './Header.css';
import { useAuth } from '../../config/AuthProvider';
import logoUrl from '../../assets/sweet-moments.webp'
import { useState } from 'react';

export function Header({ title }:{ title:string }) {
    const {principal, logout} = useAuth()
    const [open, setOpen] = useState(false);

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
                <img onClick={() => setOpen(!open)} className="header-avatar"
                    src="https://pbs.twimg.com/profile_images/730777468202688516/J34OEG_u_400x400.jpg"
                    alt="user avatar"
                ></img>
                {open && 
                    <div className='header-menu'>
                        <Link to='/catalogos' onClick={() => setOpen(!open)}>Catalogos</Link>
                        <Link to='/productos' onClick={() => setOpen(!open)}>Productos</Link>
                        <span onClick={logout}>Cerrar sesion</span>
                    </div>
                }
            </div>
        </div>
    )
}