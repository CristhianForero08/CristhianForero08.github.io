import React from 'react'
import "../Css/Contacto.css"
import Boton from "../Components/Boton"
import ScrollToTopButton from './ScrollToTopButton'

const Contacto = () => {
  return (
    <div class="contacto" id="contacto">

                <h2>Contacto</h2>

                <div class="contenedor-contacto">

                  <Boton texto='Whatspp' link='https://wa.me/573004548869?text=Hola,%20Cristhian'/>
                  <Boton texto='cristhian@cristhianforero.com' link='mailto:cristhianforerobello@gmail.com?subject=Asunto del correo'/>
                  

                  
                </div>



            </div>
  )
}

export default Contacto
