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
  const [totalAmbi, setTotalAmbi] = useState(0);

  const updateTotalAmbi = (newTotalAmbi) => {
    setTotalAmbi(newTotalAmbi);
  };

  const addRol = (e) => {

    const text = e.target.id;
    const index = text.indexOf("-")+1;
    let subindex = text.slice(index);
    let  k = parseInt(subindex)-1;
    const rol = e.target.value;
    
    const newList = listDeveloper.map((developer, index) => {
        if (index === k) {
            // Modificar el nombre del desarrollador en la posición k
            return { ...developer, nombre: rol };
        } else {
            // Mantener el desarrollador sin cambios
            return developer;
        }
    });

    // Actualizar el estado listDeveloper con la nueva lista
    setListDev(newList);
  };

  const regSalario = (e) => {

    const text = e.target.id;
    console.log(text);
    const index = text.indexOf("-")+1;
    let subindex = text.slice(index);
    let  k = parseInt(subindex)-1;
    console.log(k);
    const salary = parseInt(e.target.value);
    
    const newList = listDeveloper.map((developer, index) => {
        if (index === k) {
            // Modifica salario
            return { ...developer, salario: salary };
        } else {
            // Mantener el desarrollador sin cambios
            return developer;
        }
    });

    // Actualizar el estado listDeveloper con la nueva lista
    setListDev(newList);
  };

  /*
  Función de actualización del equipo de desarrollo. Cuando el total de profesionales
  se actualiza se crea una lista de instancias de la clase Developer para el calculo de
  costos de cada profesional
  */
  function updateNumDevps(){

    const $inputTotalDes = document.getElementById("desarrolladores");
    setnumDes($inputTotalDes.value);
    let num = $inputTotalDes.value;
    let list = listDeveloper;
    let listItems = list.length;

    if(num > listItems){
      
      for(let i =listItems; i< num;i++){
        let developer = new Developer();
        list.push(developer);
      }
    }

    else if(num < listItems){

      for(let i = 0; i < listItems - num; i++){
        list.pop();
      }
    }
    setListDev(list);
  }
  
  function createTableDetails() {
    return (
        <table id="dev-table-details" className = "Input-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Salario</th>
                    <th>Dedicación</th>
                    <th>Total de Horas</th>
                    <th>Costo Total</th>
                </tr>
            </thead>
            <tbody>
                {listDeveloper.map((developer, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{developer.nombre}</td>
                        <td>{developer.salario}</td>
                        <td>{developer.dedicacion}</td>
                        <td>{developer.totalHoras}</td>
                        <td>{developer.costoTotal}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
  }
  
  /*
  Método para añadir una tabla de ingreso de datos para cada uno de los profesionales
  involucrados con los cuales se manejara el costeo
  */
  function addDevps(){
    const $inputNumDevps = document.getElementById("desarrolladores");
    let num = $inputNumDevps.value;
    var $devpsTable = document.getElementById("dev-table");
    let rowCount = $devpsTable.rows.length -1;
    
    if(num > rowCount){

      for(let i=rowCount; i<num; i++){

        let fila = $devpsTable.insertRow();
        var indexCell = fila.insertCell();
        var texto = document.createTextNode(i+1);
        indexCell.appendChild(texto);

        for(var j = 1; j< 4; j++){

          var celda = fila.insertCell();
          var input = document.createElement("input");
          if(j===1){
            input.type = "text";
            input.id = `rol-${i+1}`;
            input.addEventListener("input", addRol);
          }
          else{
            input.type = "number";
            input.min = "0";
            switch(j){
              case 2:
                input.step = "100000";
                input.id = `salario-${i+1}`;
                input.addEventListener("input", {regSalario});
                break;
              case 3:
                input.step = "1";
                input.id = `dedicacion-${i+1}`;
                /*input.addEventListener("input", {regDedicacion});*/
                break;
            }
          }
          celda.appendChild(input);

        }
      }

    } else if (num < rowCount) {
      for (let i = 0; i < rowCount - num; i++) {
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

            <GeneralForm addDevpsFunction = {addDevps} inputProjectFn = {updateProjectName}
                                   totalAmbi = {totalAmbi} setTotal = {updateTotalAmbi}/>

          </div>
             
          <div className = "Section-report Report-header">
            
            <h2>Análisis de costos para el proyecto: {nomSoftware}</h2>
            <p id = "Text-report"> Este es un reporte generado en tiempo real y de forma dinámica
                sobre el costeo del software: {nomSoftware}, solicitado por el cliente: y en el cual 
                discriminamos los siguientes componentes de costo:
            </p>
            <h3>Costo de mano de obra</h3>
            <p>
              Para la elaboración del proyecto se estima que se requieran un total de {numDesarrolladores}, 
              profesionales de desarrollo y otras áreas detallados en la siguiente tabla:
            </p>
            <br />
            <div> 
              {createTableDetails()}
            </div>
            <p>
              Primer rol: "Nada"
            </p>

            <p>
              Se estiman unos costos de infraestructura de un total de: {totalAmbi}
            </p>
          </div>

        </div>
        
  );
}

/*
Estructura del formulario principal de ingreso de los diferentes conjuntos de datos
*/
function GeneralForm({addDevpsFunction, inputProjectFn, totalAmbi, setTotal}){

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
 
        <AmbiTrabajo total={totalAmbi} setTotalAmbi={setTotal} />
      </fieldset>
    </form>
  );
}

export default App;