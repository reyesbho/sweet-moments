import { Link } from 'react-router-dom';
import './Sidebar.css';

export function Sidebar({title}){
    const logo = './src/assets/sweet-moments.png';
    return (
        <div className='sidebar'>
            <Link to='/'>
            <img className='sidebar-logo' src={logo} alt={title}></img>
            <h2 className='sidebar-title'>{title}</h2>
            </Link>
        </div>
      
    )
}