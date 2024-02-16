import "./App.css";
import Developer from './Developer';
import * as componentesBasicos from './ComponentesBasicos';
import { useState } from 'react';
import Salary from "./components/Salary/Salary";
import AmbiTrabajo from "./components/AmbienteTrabajo/AmbiTrabajo";


/*
Función principal de la aplicación encargada de renderizar en pantalla
cada uno de los elementos de la aplicación
*/
function App() {
  
  /*
  Definicion de variables de estado que establecen el flujo de datos y aplicación
  del paradigma reactivo. Estas variables definen el comportamiento de renderizado
  de los diferentes elementos dependientes de sus cambios
  */
  const [nomSoftware, setNomSoft] = useState(""); /*Nombre del proyecto*/ 
  const [numDesarrolladores, setnumDes] = useState(0); /*Total personal del equipo*/
  const [listDeveloper, setListDev] = useState([]); /* Lista de profesionales */ 

  /*
  Función de actualización del equipo de desarrollo. Cuando el total de profesionales
  se actualiza se crea una lista de instancias de la clase Developer para el calculo de
  costos de cada profesional
  */
  function updateNumDevps(){
    const $inputTotalDes = document.getElementById("desarrolladores");
    setnumDes($inputTotalDes.value);

    let list = [];
    for(var i =0; i< $inputTotalDes.value;i++){
      let developer = new Developer();
      list.push(developer);
    }

    setListDev(listDeveloper);
  }
  
  /*
  Método para añadir una tabla de ingreso de datos para cada uno de los profesionales
  involucrados con los cuales se manejara el costeo
  */
  function addDevps(){
    const $inputNumDevps = document.getElementById("desarrolladores");
    let num = $inputNumDevps.value;
    const $devpsTable = document.getElementById("dev-table");
    let rowCount = $devpsTable.rows.length -1;
    
    if(num > rowCount){
      for(var i=rowCount; i<num; i++){

        $devpsTable.innerHTML += '<tr>'
                   + `<td> ${i+1} </td>`
                   + `<td> <input type = "text" id ="rol-${i+1}" > </td>`
                   + '<td> <input type = "number" min = "0" step = "100000"> </td>'
                   + '<td> <input type = "number" min = "0" step = "1"> </td>'
                + '</tr>'
      }
    } else if (num < rowCount) {
      for (var i = 0; i < rowCount - num; i++) {
        $devpsTable.deleteRow(rowCount - i);
      }
    }
    updateNumDevps();
  }

  /*
  Actualización del nombre del proyecto
  */
  function updateProjectName() {
    const $inputNombre = document.getElementById("proyecto");
    setNomSoft($inputNombre.value);
  }

  return (

        <div className = "Box-layout">

          <div className = "Section-app App-header">

            <GeneralForm addDevpsFunction = {addDevps} inputProjectFn = {updateProjectName}/>

          </div>
             
          <div className = "Section-report Report-header">
            
            <h2>Análisis de costos para el proyecto: {nomSoftware}</h2>
            <p id = "Text-report"> Este es un reporte generado en tiempo real y de forma dinámica
                sobre el costeo del software: {nomSoftware} solicitado por el cliente: y en el cual 
                discriminamos los siguientes componentes de costo:
            </p>
            <h3>Costo de mano de obra</h3>
            <p>
              Para la elaboración del proyecto se estima que se requieran un total de {numDesarrolladores}, 
              profesionales de desarrollo y otras áreas detallados en la siguiente tabla:
            </p>
          </div>

        </div>
        
  );
}

/*
Estructura del formulario principal de ingreso de los diferentes conjuntos de datos
*/
function GeneralForm({addDevpsFunction, inputProjectFn}){

  return (
    <form>
      <fieldset>
        <legend> Datos generales del proyecto </legend>
        <p>
          <componentesBasicos.InputBox id ="proyecto" labelText = "Nombre del proyecto:"
                        type = "text"  onChange = {inputProjectFn}/>
          <br />
          <label for = "fecha-inicio"> Fecha de inicio </label>
          <input className = "Input-box" type = "date" id = "fecha-inicio" />
          <br />
          <label for = "fecha-final"> Fecha de finalización </label>
          <input className = "Input-box" type = "date" id = "fecha-final" />
          
        </p>
      </fieldset>

      <fieldset>
        <legend>Información básica del equipo de desarollo asignado al proyecto</legend>
        <div>
          <label for = "desarrolladores"> Número de desarrolladores  </label>
          <input className = "Input-box"  type = "number" min = "0" max = "1000" 
                    step = "1" name = "totalEquipo" id="desarrolladores" required />
          <componentesBasicos.MyButton text = "Agregar" onClick = {addDevpsFunction}/>
        </div>
        <br />
        <componentesBasicos.DevTable />
        <hr> </hr>
        <AmbiTrabajo />
      </fieldset>
    </form>
  );
}

export default App;