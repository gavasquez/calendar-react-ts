import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import './LoginPage.css';
import { useAuthStore } from '../../hooks';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

export interface LoginFormField {
  email: string;
  password: string;
}

const loginFormField: LoginFormField = {
  email: '',
  password: '',
}


export const LoginPage = () => {

  const { startLogin, errorMessage } = useAuthStore();
  const { email, password, onInputChange } = useForm(loginFormField);


  const loginSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    startLogin({ email, password });
  }

  useEffect(() => {
    console.log(errorMessage)
    if(errorMessage !== undefined) {
      Swal.fire('Error en la Autenticación', errorMessage, 'error');
    }
  }, [errorMessage])
  

    return (
        <div className="container login-container">
            <div className="row justify-content-center">
                <div className="col-md-10 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={loginSubmit}>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="email"
                                value={email}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="password"
                                value={password} 
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="text-center mt-3">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                name="Login"
                            />
                        </div>
                        <div className="text-center mt-3">
                            <Link to="/auth/register">Registrarte aquí</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}