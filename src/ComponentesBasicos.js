import './App.css';
import React from 'react';

/*
Funciones de tipo React que devuelven elementos html con estilos adecuados
y permiten el paso de parametros funcionales para el manejo de eventos
*/

export function  MyButton({text, onClick}) {
    return (
      /*<div display = "inline">*/
        <button type = "button" className='Main-button' onClick = {onClick}>
          {text}  </button>
      /*</div>*/
    );
  }
  
  export function InputBox({id, labelText, type, onChange}){
    return(
      <div>
         <label className = "Label"> {labelText} </label>
         <input id = {id} className ="Input-box" type={type} onInput = {onChange}> 
         </input>
      </div>
    );
  }

  export function  DevTable(){

    return(
      <table className = "Input-table"  id = "dev-table">
        <tr>
          <th> </th>
          <th> Rol del profesional </th>
          <th> Salario mensual </th>
          <th> Tiempo asignado en días </th>
        </tr>
      </table>
    );
  }

  export function  DetailDevTable(){

    return(
      <table className = "Input-table"  id = "dev-table-details">
        <tr>
          <th> </th>
          <th> Rol del profesional </th>
          <th> Salario mensual </th>
          <th> Tiempo asignado en días </th>
          <th> Salario por hora </th>
          <th> Total de horas </th>
          <th> Costo Total </th>
        </tr>
      </table>
    );
  }