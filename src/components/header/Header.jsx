import './Header.css';
export function Header(){
    return (
        <div className="header">
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
            <div className="header-navbar">
                <span>Mis pedidos</span>
            </div>
        </div>
    )
}