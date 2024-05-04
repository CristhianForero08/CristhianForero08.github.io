import React from 'react'
import "../Css/Links.css"


const Links = ({ tecnologias, texto, nombreProyecto }) => {
  return (
    <div className='contenedor-link'>
        
        <a href={texto} target='_blank'>{nombreProyecto}</a>

        <h2>{tecnologias}</h2>
    </div>
  )
}

export default Links
