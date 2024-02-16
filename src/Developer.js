/*
Clase para el manejo del costeo de los profesionales involucrados en el
proyecto. El costeo se maneja a partir de salario basico que ingresa el usuario
y se asume que todos los contratos son dependientes, por lo que se ajusta el valor
del profesional acorde a todos los aportes a seguridad social y parafiscales que debe
pagar la empresa
*/

export default class Developer {

    /*
    Atributos estaticos sobre esfuerzo dedicado por mes
    */
    static DIAS_MES = 21;
    static JORNADA = 8;
    /*
    Atributos estaticos que definen los aportes 
    parafiscales
    */
    static PAR_SENA = 0.02;
    static CAJAS_COMP = 0.04;
    static ICBF = 0.03;
    /*
    Atributos estaticos que definen los aportes 
    a seguridad social
    */
    static EPS = 0.085;
    static AFP = 0.12;
    static ARL = 0.0052;
    static VACACIONES = 0.0417;
    static CESANTIAS = 0.0833;
    static INT_CESANTIAS = 0.01;
    /*
    Constructor vacío para inicializar construcción de tabla
    de detalles de costeo de los profesionales
    */
    constructor(){
      this.nombre = "";
      this.salario = 0;
      this.seguridadSocial = 0;
      this.salarioHora = 0;
      this.dedicacion = 0;
      this.totalHoras = 0;
      this.costoTotal = 0;
    }
    /*
    Setters de los atributos principales que se obtienen del 
    formulario de la aplicación
    */
    set setNombre(name){
      this.nombre = name;
    }
  
    set setSalario(salary){
      this.salario = salary;
    }
  
    set setDedicacion(dedication){
      this.dedicacion = dedication;
    }
    
    /*
    Métodos básicos que calculan los atributos relacionados al costo de cada 
    participante del proyecto
    */
    calcularTotalHoras(){

      this.totalHoras = this.dedicacion*this.JORNADA;

    }
    calculateSocialSec(){
  
      let salud = (this.salario)*this.EPS;
      let pension = (this.salario)*this.AFP;
      let riesgos = (this.salario)*this.ARL;
      let primaServicios = (this.salario)/12;
      let vacaciones = (this.salario)*this.VACACIONES;
      let cesantias = (this.salario)*(this.CESANTIAS + this.INT_CESANTIAS);
      let parafiscales = (this.salario)*(this.PAR_SENA + this.CAJAS_COMP + this.ICBF);
      this.seguridadSocial = salud + pension +riesgos + parafiscales +primaServicios +
                             vacaciones + cesantias;
    }
  
    calculatePerHourSalary(){
      
      this.calculateSocialSec();
      let salarioFull = this.salary + this.socialSecurity;
      let salarioDiario = salarioFull/this.DIAS_MES;
      this.salarioHora = salarioDiario/this.JORNADA;
    }
  
    calculateTotalCost(){
      
      this.calculatePerHourSalary();
      this.costoTotal = this.salarioHora*this.totalHoras;
    }
  }