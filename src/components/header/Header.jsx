import { Link } from 'react-router-dom';
import './Header.css';
export function Header({ title }) {

    const logo = './src/assets/sweet-moments.png';
    return (
        <div className="header">
            <div className='header-info'>
                <Link to='/'>
                    <img className='header-logo' src={logo} alt={title}></img>
                </Link>
                <span className='header-title'>{title}</span>
            </div>
            
            <div className="header-navbar">
                
            </div>
            <div className="header-user">
                <div>
                    Fabiola Martinez
                    <button>Cerrar sesion</button>
                </div>
                <img className="header-avatar"
                    src="https://pbs.twimg.com/profile_images/730777468202688516/J34OEG_u_400x400.jpg"
                    alt="user avatar"
                ></img>

            </div>
        </div>
    )
}