import { Link } from 'react-router-dom';
import { useAuthStore, useForm } from '../../hooks';
import './LoginPage.css';
import Swal from 'sweetalert2';
import { useEffect } from 'react';

export interface RegisterFormField {
  name: string;
  email: string;
  password: string;
  password2: string;
}

const registerFormField: RegisterFormField = {
  name: '',
  email: '',
  password: '',
  password2: '',
}

export const RegisterPage = () => {

  const { startRegister, errorMessage } = useAuthStore();

  const { name, email, password, password2, onInputChange } = useForm(registerFormField);

  const registerSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if( password !== password2 ){
      return Swal.fire('Error en registro', 'Contraseñas no coinciden', 'error');
    }
    startRegister({ name, email, password });
  }

  useEffect(() => {

    if( errorMessage !== undefined ){
      Swal.fire( 'Error en registro', errorMessage, 'error' );
    }

  }, [errorMessage])
  


  return (
    <div className="container login-container">
            <div className="row justify-content-center">
                <div className="col-md-10 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={registerSubmit}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="name"
                                value={name}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
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

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name="password2"
                                value={password2}
                                onChange={onInputChange}
                            />
                        </div>

                        <div className="text-center">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                        <div className="text-center mt-3">
                            <Link className="text-white" to="/auth/login">Ingresar aquí</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
  )
}