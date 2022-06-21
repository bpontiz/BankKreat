//* Consigna: CREAR UN SIMULADOR INTERACTIVO INCORPORANDO ARRAYS
//*           Y UTILIZANDO METODOS Y CLASES VISTOS EN CLASE.
//*           PRIMERA PRE ENTREGA DE TRABAJO FINAL

//? Enunciado: Calcular la tasa de interés compuesto a una 
//?            determinada cantidad de tiempo en meses.

class ServicioInteres {
  constructor(nombre, apellido, profesion) {
    this.nombre = nombre.toUpperCase();
    this.apellido = apellido.toUpperCase();
    this.profesion = profesion.toUpperCase();
  }
  mostrarUser() {
    /*
    * Descripción: función que muestra por consola los datos del usuario.
    */
    console.log("Las credenciales del usuario son: "+this.profesion+" "+this.nombre+" "+this.apellido);
  }
  interesCompuesto() {
    /*
    * Descripción: función que calcula el interés compuesto a partir
    * de capital inicial sin reinversión parcial.
    */
  alert("A continuación ingreserá los datos de la calculadora.");
  let capitalInicial = parseInt(prompt("Ingrese capital inicial. Ej: 3000"));
  let tasaDeInteres = parseInt(prompt("Ingrese tasa de interés. Ej: 37%"));
  let tiempoDeAhorro = parseInt(prompt("Ingrese tiempo de ahorro en meses. Ej: 2"));
  let capitalReinversion = parseInt(prompt("Ingrese monto de reinversión mensual. Ej: 3000"));
  alert("Chequea la consola!");
  let capitalFinal = 0;
  console.log("El capital inicial fue de: " + capitalInicial + " $");
  console.log("El monto de reinversión fue de: " + capitalReinversion + " $");
  for( let i = 1; i <= tiempoDeAhorro; i++ ){
      //! Formula de interes compuesto
      let resultadoInteres;
      if( i == 1 ){
        capitalFinal = (capitalInicial) * ( 1 + ( (tasaDeInteres/100) /12 ) ) ** i;
        resultadoInteres = capitalFinal.toFixed(2);
        console.log("El capital final al mes " + i + " es: " + resultadoInteres + " $");
      }else{
        capitalFinal = (capitalInicial + capitalReinversion * ( i-1 )) * ( 1 + ( (tasaDeInteres/100) /12 ) )**i;
        resultadoInteres = capitalFinal.toFixed(2);
        console.log("El capital final al mes " + i + " es: " + resultadoInteres + " $");
      }
  }
  let diferenciaCapital = capitalFinal - (capitalInicial + ( capitalReinversion * ( tiempoDeAhorro - 1 )));
  let resultadoCapital = diferenciaCapital.toFixed(2);
  console.log("La ganancia total en intereses, luego del tiempo de ahorro es de: " + resultadoCapital + " $");
  }
}

//* Declaración de objetos para armado de base de datos.
let databases = [];
alert("Bienvenido a la calculadora de interés compuesto!");
let pedirNombre = prompt("Ingrese su nombre:");
let pedirApellido = prompt("Ingrese su apellido:");
let pedirProfesion = prompt("Ingrese su profesión:");
databases.push(new ServicioInteres(pedirNombre, pedirApellido, pedirProfesion));
for(const interes of databases){
  interes.mostrarUser();
  interes.interesCompuesto();
}

//* Búsqueda del usuario segun las credenciales introducidas 
//* por él mismo. 
function isInDataBase(testDatabase, askProfession) {
  console.log("------------------"+"\n"+"[Testing] Validación de profesión."+"\n");
  testDatabase.some(function(CompProfession){
    // CompProfession se instancia con ServicioInteres. //
    let economistValidation = askProfession === CompProfession.profesion;
    console.log(economistValidation);
  });
}
isInDataBase(databases, 'ECONOMISTA');

//* Creacion de etiqueta HTML modificando el DOM mediante JS.
let footer_dev = "Developed by Bruno Pontiz"
let footer_sign = document.createElement("div")
footer_sign.innerHTML = `<footer class="container-fluid><div class="row"><h5 class="footerSign">${footer_dev}</h5></div></footer>`;
document.body.appendChild(footer_sign);