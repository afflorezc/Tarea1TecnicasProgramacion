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

            <GeneralForm/>

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
    /*<div display = "inline">*/
      <button type = "button" className='Main-button' onClick = {onClick}>
        {text}  </button>
    /*</div>*/
  );
}

function InputBox({id, labelText, onChange}){
  return(
    <div>
       <label className = "Label"> {labelText} </label>
       <input id = {id} className ="Input-box" type='text' onInput = {onChange}> 
       </input>
    </div>
  );
}

function InputText(){
  return(
    <input className = "Input-box" type = "text" required />
  );
}

function GeneralForm(){

  function addDevps(){
    const $inputNumDevps = document.getElementById("desarrolladores");
    let num = $inputNumDevps.value
    const $devpsTable = document.getElementById("dev-table");
    let rowCount = $devpsTable.rows.length -1;
    console.log("numero de filas tabla:", rowCount);
    console.log("numero de profesionales", num);
    
    if(num > rowCount){
      for(var i=rowCount; i<num; i++){

        $devpsTable.innerHTML += '<tr>'
                   + `<td> ${i+1} </td>`
                   + '<td> <input type = "text"> </td>'
                   + '<td> <input type = "number" min = "0" step = "10000"> </td>'
                   + '<td> <input type = "number" min = "0" step = "1"> </td>'
                + '</tr>'
        
        console.log("iteración:", i+1);
        console.log("filas tabla: ", $devpsTable.rows.length-1);
  
        /*let row = createRow(i+1);
        $devpsTable.appendChild(row);*/
      }
    }
    else if(num < rowCount){
      for(var i=0; i <rowCount-num; i++){
        $devpsTable.deleteRow(rowCount-i);
      }
      
    }

    rowCount = $devpsTable.rows.length-1;
    console.log("numero filas tabla:", rowCount);
    
  }

  function createRow(index){

    let row = document.createElement("tr");
    let cell1 = createLabel(index);
    let cell2 = createInput();
    let cell3 = createNumInput(10000);
    let cell4 = createNumInput(1);

    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.appendChild(cell4);
    return row;
  }

  function createLabel(index){

    let cell = document.createElement("td");
    let label = document.createElement("label");
    label.value = index;
    cell.appendChild(label);
    return cell;
  }

  function createInput(){

    let inp = document.createElement("input");
    inp.type = "text";
    return inp;
  }

  function createNumInput(step){

    let numInp = document.createElement("input");
    numInp.type = "number";
    numInp.min = "0";
    numInp.step = step;

  }

  return(

    <form>

      <fieldset>
        <legend>Información básica del equipo de desarollo asignado al proyecto</legend>
        <p>
          <label for = "desarrolladores"> Número de desarrolladores  </label>
          <input className = "Input-box"  type = "number" min = "0" max = "1000" 
                    step = "1" name = "totalEquipo" id="desarrolladores" required />
          <MyButton text = "Agregar" onClick = {addDevps}/>
        </p>
        <br />
          <DevTable />
      </fieldset>

    </form>
  );
}

function DevTable(){

  return(
    <table className = "Input-table"  id = "dev-table">
      <tr>
        <th> </th>
        <th> Nombre profesional </th>
        <th> Salario mensual </th>
        <th> Tiempo asignado en días </th>
      </tr>
    </table>
  );
}

export default App;
