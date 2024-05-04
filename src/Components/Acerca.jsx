import React from 'react'
import "../Css/Acerca.css"
import imgPersonal from '../assets/img/Foto-CFB-0021.png'
const Acerca = () => {
  return (
    <div class="sobre-mi" id="sobre-mi">

                <h2>Sobre mí</h2>

                <div className="sobre-contenedor">

                  <div className="img-personal">
                    <img className='img' src={imgPersonal} alt="Ingeniero de software" />
                  </div>

                  <div className='texto-sobre'>                    
                    <p>Hola, soy un ingeniero de software apasionado por las tecnologías, el marketing digital y la ciberseguridad. Mi enfoque principal radica en fusionar estos campos para fomentar la innovación y el crecimiento empresarial. Mis áreas de especialización incluyen el growth hacking, desarrollo web y hacking ético.

                    <br /><br />En mi trabajo diario, me dedico a crear soluciones que aprovechan tanto técnicas avanzadas de marketing digital como la creación de software para automatizar procesos. Además, disfruto diseñando y desarrollando productos digitales que optimizan los resultados para las empresas.<br /><br />
                        
                    <br />Me caracterizo por estar en constante búsqueda de nuevas formas de integrar soluciones tecnológicas y análisis de datos con un enfoque creativo, todo ello con el objetivo de abordar desafíos complejos y generar un impacto significativo.</p>
                  </div>


                </div>

    </div>
            
  )
}

export default Acerca
