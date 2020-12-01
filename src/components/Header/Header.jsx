/* eslint-disable no-useless-constructor */
import React from "react";
import { Button, notification } from 'antd';
import './Header.css';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const Header = ({ usuario, setUsuario, setMostrarModalLogin, setMostrarModalRegister }) => {
    const administrador = usuario?.rol === 'admin';
    const history = useHistory();

    const logout = async (event) => {
        try {
            const body = {
                headers: { Authorization: `${usuario?.token}` }
            };
            localStorage.removeItem('usuario');
            setUsuario(null)
            history.push('/');
            await axios.get('https://express-mysql-clinicadental.herokuapp.com/api/user/logout', body);
        } catch (error) {
            console.log(error);
            notification.error({ message: 'Error cierre sesion', description: 'Por favor, intentelo más tarde' });
        }
    };
    return (
        <header className="header">
            <div>
                <Link to="/">Inicio</Link>
                {!usuario && <>
                    <Button type="link" onClick={() => setMostrarModalRegister(true)}>Registro</Button>
                    <Button type="link" onClick={() => setMostrarModalLogin(true)}>Login</Button>
                </>}
                {usuario && <Link to="/clientes/citas">Area clientes</Link>}
            </div>
            <div className="menu">
                {usuario && <div>
                    <Button type="link" onClick={logout}>Logout</Button>
                </div>}
                {administrador && <div>
                    <Link to="/admin/mostrarUsuarios">Clientes</Link>
                </div>}
                {administrador && <div>
                    <Link to="/admin/mostrarCitas">Citas pedidas</Link>
                </div>}
            </div>
        </header>
    );
}
export default Header;
