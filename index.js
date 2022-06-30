//* Consigna: CREAR UN SIMULADOR INTERACTIVO INCORPORANDO ARRAYS
//*           Y UTILIZANDO METODOS Y CLASES VISTOS EN CLASE.
//*           SEGUNDA PRE ENTREGA DE TRABAJO FINAL.

//? Enunciado: Calcular la tasa de interés compuesto a una 
//?            determinada cantidad de tiempo en meses.

class Users {
  constructor(nombre, profesion) {
    this.nombre = nombre.toUpperCase();
    this.profesion = profesion.toUpperCase();
  }
  guardarUser() {
    let array_newUser = [];
    let eventGetName = document.getElementById("input_Name").value;
    let eventGetProfession = document.getElementById("input_Profession").value;
    array_newUser.push(eventGetName, eventGetProfession);
  }
  mostrarUser() {
    /*
    * Descripción: función que muestra por consola los datos del usuario.
    */
    console.log(`Las credenciales del usuario son: ${this.profesion} ${this.nombre}.`);
  }
}

function sendUser() {
  let eventGetName = document.getElementById("input_Name").value;
  let eventGetProfession = document.getElementById("input_Profession").value;
  const user1 = new Users(eventGetName, eventGetProfession);
  if(eventGetName && eventGetProfession){
    user1.guardarUser();
    user1.mostrarUser();
  }
}


//* AddEventListener de cambios en los parametros introducidos por el usuario.
document.getElementById("input_CI").addEventListener('change', interesCompuesto);
document.getElementById("input_Interes").addEventListener('change', interesCompuesto);
document.getElementById("input_Plazo").addEventListener('change', interesCompuesto);
document.getElementById("input_CR").addEventListener('change', interesCompuesto);
document.getElementById("input_Name").addEventListener('change', sendUser);
document.getElementById("input_Profession").addEventListener('change', sendUser);

function interesCompuesto() {
  /*
  * Descripción: función que calcula el interés compuesto a partir
  * de capital inicial con reinversión mensual.
  */
  let eventCapitalInicial = parseInt(document.getElementById("input_CI").value);
  let eventTasaDeInteres = parseInt(document.getElementById("input_Interes").value);
  let eventTiempoDeAhorro = parseInt(document.getElementById("input_Plazo").value);
  let eventCapitalReinversion = parseInt(document.getElementById("input_CR").value);
  if( eventCapitalInicial && eventTasaDeInteres && eventTiempoDeAhorro && eventCapitalReinversion ){
    let capitalFinal = 0;
    let resultadoInteres;
    console.log(`El capital inicial fue de: ${eventCapitalInicial} $`);
    console.log(`La tasa de interés anual fue de: ${eventTasaDeInteres} %`);
    console.log(`El tiempo de ahorro fue de: ${eventTiempoDeAhorro} Meses`);
    console.log(`El monto de reinversión fue de: ${eventCapitalReinversion} $`);
    for( let i = 1; i <= eventTiempoDeAhorro; i++ ){
      //! Formula de interes compuesto
      if( i == 1 ){
        capitalFinal = (eventCapitalInicial) * (1+((eventTasaDeInteres/100)/12))**i;
        resultadoInteres = capitalFinal.toFixed(2);
        console.log(`»El capital final al mes ${i} es ${resultadoInteres} $`);
      }else{
        capitalFinal = (eventCapitalInicial + eventCapitalReinversion*(i-1))*(1+((eventTasaDeInteres/100)/12))**i;
        resultadoInteres = capitalFinal.toFixed(2);
        console.log(`»El capital final al mes ${i} es ${resultadoInteres} $`);
      }
    }
    let diferenciaCapital = capitalFinal - (eventCapitalInicial + ( eventCapitalReinversion * ( eventTiempoDeAhorro - 1 )));
    let resultadoCapital = diferenciaCapital.toFixed(2);
    console.log(`La ganancia total en intereses, luego del tiempo de ahorro es de: ${resultadoCapital} $`);
    let DOMCapitalFinal = document.getElementById("DOMCapitalFinal_div");
    let DOMCapitalFinal_h3 = document.createElement("h3");
    DOMCapitalFinal_h3.innerHTML = `<p id="mountCapitalFinal_p">El interés ganado a los ${eventTiempoDeAhorro} meses es de: ${resultadoCapital} $</p><p id="mountCapitalFinal_p">El capital final es de: ${resultadoInteres} $</p>`;
    DOMCapitalFinal.append(DOMCapitalFinal_h3);
  }
}

//* Búsqueda del usuario segun las credenciales introducidas 
//* por él mismo. 
function isInDataBase(testDatabase, askProfession) {
  /*
   * Descripción: función que imprime un True por consola
   * si la profesión del usuario es Economista.
  */
  console.log("------------------"+"\n"+"[Testing] Validación de profesión."+"\n");
  testDatabase.some(function(CompProfession){
    // CompProfession se instancia con ServicioInteres. //
    let economistValidation = askProfession === CompProfession.profesion;
    console.log(economistValidation);
  });
}

//* Creacion de etiqueta HTML modificando el DOM mediante JS.
let footer_dev = "Developed by Bruno Pontiz"
let footer_sign = document.createElement("div")
footer_sign.innerHTML = `<footer class="container-fluid><div class="row"><h5 class="footerSign">${footer_dev}</h5></div></footer>`;
document.body.appendChild(footer_sign);


// Declaración de objetos para armado de base de datos.
// let databases = [];
// let eventPedirNombre = document.getElementById("input_Name");
// let eventPedirProfesion = document.getElementById("input_Profession");
// const user1 = databases.push(new ServicioInteres(eventPedirNombre, eventPedirProfesion));
// for(const user of databases){
//   user.mostrarUser();
// }
// user1.isInDataBase(databases, 'ECONOMISTA');