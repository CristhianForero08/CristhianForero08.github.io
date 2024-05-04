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
                  
                  <ul className="redes-principal">
                      <a href="http://www.linkedin.com/in/cristhianforero" target='_blank'><i className="fa-brands fa-linkedin lis"></i></a>
                      <a href="https://github.com/CristhianForero08" target='_blank'><i className="fa-brands fa-github lis"></i></a>
                      <a href="https://www.instagram.com/ing_cristhian_forero/" target='_blank'><i className="fa-brands fa-square-instagram lis"></i></a>
                      <a href="https://neogyck.com/" target='_blank'><i className="fa-solid fa-globe lis"></i></a>
                      
                      
                    </ul>
                  
                </div>



            </div>
  )
}

export default Contacto
