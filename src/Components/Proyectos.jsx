import React from 'react'
import "../Css/Proyectos.css"
import Links from './Links'

const Proyectos = () => {
  return (
    
    <div className='main'>

        <div className="proyectos" id="proyectos">

        <h2>Proyectos</h2>

        <div className='contenedor-links'>
          <Links tecnologias="Javascript, HTML, CSS" texto="https://generator-password-mocha.vercel.app/" nombreProyecto="Generador de contraseñas seguras"/>
          </div>

        
        </div>

    </div>


  )
}

export default Proyectos
