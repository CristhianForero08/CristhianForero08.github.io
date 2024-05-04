import React from 'react'
import "../Css/Slider.css"
import Lottie from 'react-lottie'; // Importa Lottie
import astronautAnimation from '../assets/svg/Astronaut.json';

const Slider = () => {

  const astronautOptions = {
    loop: true,
    autoplay: true,
    animationData: astronautAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };


  return ( <div className="inicio" id="inicio">

                <div className="slider">

                    
                    <div className="astronaut-animation">
                    <Lottie options={astronautOptions} />
                    </div>
                    <h1 className="titulo-principal">
                        Cristhian  Forero
                    </h1>
                    
                    <p className='profesion'>Ingeniero de Software</p>
                    <p className='intro'> Apasionado por el desarrollo web, el marketing digital y la ciberseguridad. 
                    Fusiono estos campos para innovar y crecer empresarialmente.</p>

                    
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

export default Slider
