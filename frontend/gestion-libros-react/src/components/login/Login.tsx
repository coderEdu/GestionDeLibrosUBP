import { useState } from "react";
import type { ChangeEvent } from "react";
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './Login.css';

function Login() {
    const { login } = useContext(AuthContext);
    // Declarar variable de entrada
    const [correo, setCorreo] = useState<string>('');
    const [contra, setContra] = useState<string>('');
    // const [error, setError] = useState<string>('');
    // Función para manejar los cambios en los campos
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        // Actualizar el estado con el nuevo valor del campo de entrada
        if (event.target.name === 'usuario') {
            setCorreo(event.target.value);
        } else if (event.target.name === 'contra') {
            setContra(event.target.value);
        }
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        // Prevenir el comportamiento por defecto del formulario
        event.preventDefault();
        // Mensaje de error vacío
        // setError('');

        // Aquí puedes manejar la lógica de inicio de sesión
        // console.log('Usuario:', correo);
        // console.log('Contraseña:', contra);  
    }

    return (
      <>
        <form onSubmit={handleSubmit}>
          <h2>Ingrese sus credenciales para iniciar sesión</h2>
          <div>
            <input
              type="email"
              placeholder="Correo electrónico"
              name="usuario"
              required
              value={correo} // Vincular el valor del campo de entrada al estado
              onChange={handleInputChange} // Configurar el manejador de cambios
            />
          </div>
          <div>
            <input  
              type="text"
              placeholder="Contraseña"
              name="contra"
              value={contra} // Vincular el valor del campo de entrada al estado
              onChange={handleInputChange} // Configurar el manejador de cambios
          />
          </div>
          <button type="submit" onClick={() => login(correo, contra)}>Enviar</button>
        </form>        
      </>
    )
}

export default Login