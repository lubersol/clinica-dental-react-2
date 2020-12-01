/* eslint-disable no-unused-vars */
import React from 'react';
import 'antd/dist/antd.css';
import { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

//Importación de componentes

import Header from './components/header/Header';
import Footer from './components/footer/Footer';

//Importación de containers

import Home from './containers/home/Home';
import Citas from './containers/citas/Citas';
import AdministracionCitas from './containers/administracionCitas/AdministracionCitas';
import AdministracionCliente from './containers/administracionCliente/AdministracionCliente';

function App() {
  let initialUsuario = null;
  try {
    initialUsuario = JSON.parse(localStorage.getItem('usuario'));
  } catch (error) {
    console.log(error)
  }
  const [usuario, setUsuario] = useState(initialUsuario);
  const [mostrarModalLogin, setMostrarModalLogin] = useState(false);
  const [mostrarModalRegister, setMostrarModalRegister] = useState(false);

  return (
    <BrowserRouter>
      <Header usuario={usuario} setUsuario={setUsuario}
        setMostrarModalLogin={setMostrarModalLogin}
        setMostrarModalRegister={setMostrarModalRegister}
      />

      <Switch>
        <Route path='/' exact>
          <Home
            setUsuario={setUsuario}
            mostrarModalLogin={mostrarModalLogin}
            setMostrarModalLogin={setMostrarModalLogin}
            mostrarModalRegister={mostrarModalRegister}
            setMostrarModalRegister={setMostrarModalRegister}
          />
        </Route>
        <Route path='/clientes/citas' exact>
          <Citas
            usuario={usuario}
          />
        </Route>
        <Route path='/admin/mostrarCitas' exact>
          <AdministracionCitas
            usuario={usuario}
          />
        </Route>
        <Route path="/admin/mostrarUsuarios" exact>
          <AdministracionCliente
            usuario={usuario}
          />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
