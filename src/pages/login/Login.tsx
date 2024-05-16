import { useEffect, useState } from 'react';
import './Login.css';
import { getUrl } from '../../services/AuthService';
import { useAuth } from '../../config/AuthProvider';

export function Login(){
    const logo = "./src/assets/sweet-moments.png";
    const [url, setUrl] = useState<string | undefined>();
    const {user} = useAuth();
    useEffect(() => {
        getUrl().then((data) => {
            setUrl(data.url);
        });
      }, [])


    return (
        <div className='container'>
            <div className='login-container'>
                <img src={logo}></img>
                <a href={url} className='btn-login'>Iniciar sesion</a>
            </div>
        </div>
    )
}