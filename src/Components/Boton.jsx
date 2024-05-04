import React from 'react'
import "../Css/Boton.css"

const Boton = ({texto, link}) => {
  return (
    <>
    <a className= "boton" href={link} target="_blank" >{texto}</a>
        
    </>
    
  )
}

export default Boton
