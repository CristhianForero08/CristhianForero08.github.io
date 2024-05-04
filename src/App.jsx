import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Components/Header'
import Slider from './Components/Slider'
import Acerca from './Components/Acerca'
import Proyectos from './Components/Proyectos'
import Stack from './Components/Stack'
import Contacto from './Components/Contacto'
import Footer from './Components/Footer'
import Particulas from './Components/Particulas'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <Header />
      <Slider />
      <Proyectos />
      <Stack />
      <Acerca />
      <Contacto />
      <Footer />
      <Particulas />
      
    </>
  )
}

export default App
