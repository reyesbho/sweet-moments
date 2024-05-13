import './Login.css';

export function Login(){
    const logo = "./src/assets/sweet-moments.png";

    return (
        <div className='container'>
            <div className='login-container'>
                <img src={logo}></img>
                <span className='btn-login'>Iniciar sesion</span>
            </div>
        </div>
    )
}