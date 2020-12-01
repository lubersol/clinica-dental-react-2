/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-useless-constructor */
import React from "react";
import './Home.css';
import axios from 'axios';
import { notification, Modal, Button, Input } from "antd";
import { UserOutlined } from '@ant-design/icons';


const Home = ({ mostrarModalRegister, setMostrarModalRegister, mostrarModalLogin, setMostrarModalLogin, setUsuario }) => {
    const handleSubmitLogin = async (event) => {
        try {
            event.preventDefault();
            const contenedor = {
                email: event.target.email.value,
                password: event.target.password.value
            };
            let respuesta = await axios.post('https://express-mysql-clinicadental.herokuapp.com/api/user/login', contenedor);
            let usuario = respuesta.data;
            localStorage.setItem("usuario", JSON.stringify(usuario));

            notification.success({ message: 'Bienvenido!', description: 'Has accedido correctamente' });

            setUsuario(usuario)
            setMostrarModalLogin(false)

        } catch (error) {
            console.log(error.response.data.message);
            notification.error({ message: 'Error al iniciar sesion', description: error.response.data.message });
        }
    };
    const handleSubmitRegister = async (event) => {
        try {
            event.preventDefault();

            const contenedor = {
                nombre: event.target.nombre.value,
                apellidos: event.target.apellidos.value,
                telefono: event.target.telefono.value,
                email: event.target.email.value,
                password: event.target.password.value
            };
            await axios.post('https://express-mysql-clinicadental.herokuapp.com/api/user', contenedor);

            notification.success({ message: 'Bienvenido!', description: 'Te has registrado correctamente!' });

            setMostrarModalRegister(false)

        } catch (error) {

            console.log(error.response.data.message);
            let values = Object.values(error.response.data)
            notification.error({ message: 'Error', description: values.join(", ") });
        }
    }

    return (
        <>
            <div>
                <h1 className="titulo">BIENVENIDO A NUESTRA CLINICA DENTAL</h1>
                <div className="muela">
                    <img src="img/muelasonrisa.gif" alt="muela gif" className="muelagif"></img>
                </div>
            </div>
            <Modal className="modal-form"
                title="Inicia sesión"
                visible={mostrarModalLogin}
                onCancel={() => { setMostrarModalLogin(false) }}
                footer={null}

            >
                <form className="login-form" onSubmit={handleSubmitLogin}>
                    <Input type="email" name="email" size="large" required placeholder="Email" prefix={<UserOutlined />} />
                    <Input.Password size="large" name="password" required placeholder="Contraseña" />
                    <Button type="primary" htmlType="submit">Iniciar Sesión</Button>
                </form>
            </Modal>
            <Modal className="modal-form"
                title="Registrate"
                visible={mostrarModalRegister}
                onCancel={() => { setMostrarModalRegister(false) }}
                footer={null}
            >
                <form className="registro-form" onSubmit={handleSubmitRegister}>

                    <Input type="nombre" name="nombre" required placeholder="Introduce tu nombre" />
                    <Input type="apellidos" name="apellidos" required placeholder="Introduce tus apellidos" />
                    <Input type="telefono" name="telefono" required placeholder="Introduce tu telefono" />
                    <Input type="email" name="email" required placeholder="Introduce tu email" />
                    <Input type="password" name="password" required placeholder="Introduce tu contraseña" />
                    <Button type="primary" htmlType="submit">Registrarse</Button>
                </form>
            </Modal>
        </>
    )
};
export default Home;
