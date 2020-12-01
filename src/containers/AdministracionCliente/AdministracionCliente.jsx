/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { notification } from 'antd';
import axios from 'axios';
import { useHistory } from "react-router";


const AdministracionCliente = ({ usuario, setUsuarios }) => {

const history = useHistory;
const [ citas, setCitas ] = useState([]);

useEffect(()=>{
    const options = { headers: { Authorization: `Bearer ${usuario.token}` }};
    axios.get('https://app-dental-clinic-backend.herokuapp.com/appointment/showAll', options)
    .then((res) =>{
      console.log(res.data)
      setCitas(res.data);
    }).catch((error) =>{
      console.log(error);
    })
  },[])
  const logout = async () =>{
    try{
      let token= localStorage.getItem('authToken')
      const options = {
        headers: {Authorization: `Bearer ${token}`}
      }
      await axios.post('https://express-mysql-clinicadental.herokuapp.com/api/user/logout',{}, options)
      localStorage.removeItem('usuario')
      localStorage.removeItem('authToken')
      setUsuarios(null)
      notification.success({message:'Hasta pronto!',description:'Esperamos volver a  verte!'})
         setTimeout(() => {
            history.push('/')
        }, 1000); 
    }catch (error) {
      console.log(error);
  }
  }
        return (
      <div className='citaperfil'>
        <div className='citacontenedor'>
          {citas?.map(appointment =>
              <div key={appointment._id} className='infocita'>
              <div className='inside'>{appointment.title}</div>
              <div className='inside'>{appointment.description}</div>
              <div className='inside'>{appointment.date}</div>
            </div>)}
        </div>
        <div className="justifybutton">
        <button className='logout-button' onClick={logout}>Logout</button>
        </div>
      </div>
      
        )
}

export default AdministracionCliente;
