import React from 'react'
import "../Css/Stack.css"
import SkillsProgreso from "./SkillsProgreso"

const Stack = () => {
  return (
    

        <div class="stack" id="stack">

            <h2>Mí Stack</h2>

            <div class="contenedor-stack">

                <div class="front">

                    <h3>Front-End</h3>
                    <SkillsProgreso progress="65" tecnologia="React js"/>
                    <SkillsProgreso progress="70" tecnologia="Javascript"/>
                    <SkillsProgreso progress="90" tecnologia="HTML"/>
                    <SkillsProgreso progress="65" tecnologia="CSS"/>
                    <SkillsProgreso progress="60" tecnologia="Saas"/>
                    <SkillsProgreso progress="50" tecnologia="tailwindcss"/>
                    <SkillsProgreso progress="45" tecnologia="JQuery"/>
                    

                </div>
                <div class="back">

                        <h3>Back-End</h3>

                        <SkillsProgreso progress="35" tecnologia="Node js"/>
                        <SkillsProgreso progress="40" tecnologia="Django"/>
                        <SkillsProgreso progress="60" tecnologia="Python"/>
                        <SkillsProgreso progress="55" tecnologia="MySQL"/>
                        <SkillsProgreso progress="35" tecnologia="MongoDB"/>
                        <SkillsProgreso progress="35" tecnologia="Azure"/>
                </div>
                <div class="design">

                        <h3>Diseño</h3>
                        <SkillsProgreso progress="85" tecnologia="XD Adobe"/>
                        <SkillsProgreso progress="60" tecnologia="Figma"/>
                        <SkillsProgreso progress="70" tecnologia="Photoshop"/>
                        <SkillsProgreso progress="75" tecnologia="Illustrator"/>
                        <SkillsProgreso progress="70" tecnologia="After Effects - Premier"/>
                        <SkillsProgreso progress="35" tecnologia="Blender"/>
                        

                </div>
            </div>
        </div>
            
   
  )
}

export default Stack
