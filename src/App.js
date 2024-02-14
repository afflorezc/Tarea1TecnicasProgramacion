import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  const [count, setCount] = useState(0);
  /*const [count2, setCount2] = useState(0);
  const [animSpeed, setAnimSpeed] = useState(1);*/
  const [nomSoftware, setNomSoft] = useState("Default");

  function handleClick() {
    setCount(count +1);
    updateProjectName();
  }

  function updateProjectName() {
    const $inputNombre = document.getElementById("proyecto");
    setNomSoft($inputNombre.value);
  }

  function clickReset() {
    setCount(0);
    updateProjectName();
  }


  /*function handleClick1() {
      setCount(count + 1);
      if(animSpeed - 0.2 > 0){
        setAnimSpeed(animSpeed - 0.2);
      }
      else{
        setAnimSpeed(0);
      }
      setSpeed();
      
  }

  function handleClick2() {
    setCount2(count2 + 1);
    if(animSpeed + 0.2 > 10){
      setAnimSpeed(10);
    }
    else{
      setAnimSpeed(animSpeed + 0.2);
    }
    setSpeed();
  }

  function handleClick3() {
    setCount(0);
    setCount2(0);
    setAnimSpeed(1);
    setSpeed();
  }

  function setSpeed(){
    const $image = document.getElementById("image");
    const animation = $image.getAnimations();
    animation[0].updatePlaybackRate(animSpeed);
  }*/

  return (

        <div className = "Box-layout">

          <div className = "Section-app App-header">

            <InputBox id ="proyecto" labelText = "Nombre del proyecto:" onChange = {updateProjectName}/>

            <p>
              Se ha realizado el costeo de un total de {count} proyectos de software.
              <br /> Proyecto actual: {count} 
            </p>
            <MyButton text = "Iniciar" onClick = {handleClick}/>      
            <MyButton text = "Reset" onClick = {clickReset}/>    

          </div>
             
          <div className = "Section-report Report-header">
            
            <h2>Hello people!</h2>
            <p id = "Text-report"> Este es un reporte generado en tiempo real y de forma dinámica
                sobre el costeo del software: {nomSoftware} solicitado por el cliente: y en el cual 
                discriminamos los siguientes componentes de costo:
            </p>
            <h3>Costo de mano de obra</h3>
            <p>
              Tabla de estimación del costo de mano de obra.
            </p>
          </div>

        </div>
        
  );
}

function MyButton({text, onClick}) {
  return (
    <div >
      <button className='Main-button' onClick = {onClick}>
        {text}  </button>
    </div>
  );
}

function InputBox({id, labelText, onChange}){
  return(
    <div>
       <label className = "Label"> {labelText} </label>
       <input id = {id} className ="Input-box" type='text' onInput = {onChange}> 
       </input>
    </div>
  )
}

export default App;
