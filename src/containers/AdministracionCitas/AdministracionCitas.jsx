import React, { useEffect, useState } from 'react';
import { notification } from 'antd';
import './AdministracionCitas.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdministracionCitas = () => {
    const [citas, setCitas] = useState([]);
    const token = localStorage.getItem('authToken')
    useEffect(() => {
        const options = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.get('https://express-mysql-clinicadental.herokuapp.com/api/cita/showAll', options)
            .then((res) => {
                console.log(res.data)
                setCitas(res.data.appointment);
            }).catch((error) => {
                console.log(error);
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const deleteCita = async (id) => {
        const options = { headers: { Authorization: `Bearer ${token}` } };
        await axios.delete('https://express-mysql-clinicadental.herokuapp.com/api/cita/' + id, options)
        notification.success({ message: 'Cita cancelada', description: 'Su cita ha sido cancelada con éxito' })
        await axios.get('https://express-mysql-clinicadental.herokuapp.com/api/cita/showAll', options)
            .then((res) => {
                console.log(res.data)
                setCitas(res.data.cita);
            }).catch((error) => {
                console.log(error);
            })
    }


    return (
        <div className='citaperfil'>
            <div className='citacontenedor'>
                {citas?.map(appointment =>
                    <div key={appointment._id} className='infocita'>
                        <div className='inside'>{appointment.title}</div>
                        <div className='inside'>{appointment.description}</div>
                        <div className='inside'>{appointment.date}</div>
                        <div className='buttondelete'><button className='eliminar' onClick={() => { deleteCita(appointment._id) }}>X</button></div>
                    </div>
                )}
            </div>
            <div className="justifybutton">
                <Link to='/clientes' className='botonatras'>Volver atras</Link>
            </div>

        </div>
    );

}

export default AdministracionCitas;
