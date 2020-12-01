/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line
import React, { useHistory } from "react-router";
import { notification, Input } from 'antd';
import axios from 'axios';
import './Citas.css';
import { Link } from "react-router-dom";


const Citas = () => {

    const history = useHistory();
    const token = localStorage.getItem('authToken')
    const handleSubmit = event => {
        event.preventDefault();
        const headers = { headers: { Authorization: `Bearer ${token}` } };
        const citaDatos = {
            title: event.target.title.value,
            description: event.target.description.value,
            date: event.target.date.value,
            status: event.target.status.value
        };
        axios.post('https://express-mysql-clinicadental.herokuapp.com/api/cita', citaDatos, headers)
            .then(res => {
                console.log(res.data)
                notification.success({ message: 'Cita creada', description: 'Se ha creado la cita correctamente' })
                //Para que no de undefined hasta que se carguen los datos
                setTimeout(() => {
                    history.push("/")
                }, 1500);
            }).catch(error => {
                console.log(error)
                notification.error({ message: 'Error en la cita', description: 'Se ha producido un error al intentar crear la cita' })
            })
    }
    return (
        <div className='container_header'>
            <div className="cabecera">
                <div className='botonCaja'>
                    <Link to='/' className='boton_atras'>Volver atras</Link>
                </div>
            </div>
            <form className="formu_cita" onSubmit={handleSubmit}>
                <Input type="title" name="title" className="datos" required placeholder="Motivo de la consulta" />
                <Input type="description" className="datos" name="description" required placeholder="Escriba breve descripción" />
                <Input type="date" name="date" className="datos" required placeholder="Indique le fecha" />
                <Input type="status" name="status" className="datos" required placeholder="Indique status" />

                <button className='confirmar' type="submit">Confirmar cita</button>

            </form>

        </div>
    )
}

export default Citas;
