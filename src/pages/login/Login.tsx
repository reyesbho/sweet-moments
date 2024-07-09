import { SubmitHandler, useForm } from "react-hook-form";
import "./Login.css";
import { UserLogin } from "../../general/Interfaces";
import { useEffect, useState } from "react";
import { login } from "../../services/Auth.service";
import { useAuth } from "../../config/AuthProvider";
import logoUrl from '../../assets/sweet-moments.webp'

export function Login() {
    const user = useAuth();
    const [errorLogin, setErrorLogin] = useState<String | null>();
    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitSuccessful, errors },
    } = useForm<UserLogin>();

    const handleLogin: SubmitHandler<UserLogin> = (userLogin: UserLogin) => {
        login(userLogin).then((response) => {
            user.login(response)
        }).catch((error)=>{
            setErrorLogin(error.message);
        })
    };

    return (
        <section>
            <div className="container">
                <div className="login-container">
                    <img src={logoUrl}></img>
                        <form className="container-form" onSubmit={handleSubmit(handleLogin)} noValidate>
                            <div className="form-input">
                                <label>Email</label>
                                <input
                                    type="text"
                                    {...register("email",
                                        {
                                            required: {
                                                value: true,
                                                message: "Usuario requerido"
                                            },
                                            pattern:{
                                                value:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                                message:"Formato invalido"
                                            }
                                        }
                                    )
                                    }
                                    placeholder="correo@gmail.com"
                                ></input>
                                {errors.email && <p>{errors.email?.message}</p>}
                            </div>
                            <div className="form-input">
                                <label>Contraseña</label>
                                <input
                                    type="password"
                                    {...register("password", {
                                        required: {
                                            value: true,
                                            message: "Password requerido"
                                        }
                                    })}
                                    placeholder="Contraseña"
                                ></input>
                                {errors.password && <p>{errors.password.message}</p>}
                            </div>
                                    
                            {errorLogin && <p className="error-message">{errorLogin}</p>}
                            <div className="actions-login">
                                <button className="btn-login" type="submit">
                                    Iniciar sesion
                                </button>
                            </div>
                        </form>
                </div>
            </div>
        </section>
    );
}
