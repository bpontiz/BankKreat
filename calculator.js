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
    //* Descripción: método que guarda los string inputs por eventos en un array.
    let array_newUser = [];
    let eventGetName = document.getElementById("input_Name").value;
    let eventGetProfession = document.getElementById("input_Profession").value;
    array_newUser.push(eventGetName, eventGetProfession);
  }
  mostrarUser() {
    //* Descripción: método que muestra por consola los datos del usuario.
    console.log(`Las credenciales del usuario son: ${this.profesion} ${this.nombre}`);
  }
}

function sendUser() {
  //* Descripción: función que envía los datos de usuario introducidos a la clase Users.
  let eventGetName = document.getElementById("input_Name").value;
  let eventGetProfession = document.getElementById("input_Profession").value;
  const user1 = new Users(eventGetName, eventGetProfession);
  eventGetName && eventGetProfession ? (user1.guardarUser() && user1.mostrarUser()) : false;
}

//* AddEventListener de actividad del usuario.
document.getElementById("input_CI").addEventListener('change', interesCompuesto);
document.getElementById("input_Interes").addEventListener('change', interesCompuesto);
document.getElementById("input_Plazo").addEventListener('change', interesCompuesto);
document.getElementById("input_CR").addEventListener('change', interesCompuesto);

let DOMCapitalFinal = document.getElementById("DOMCapitalFinal_div");
let DOMCapitalFinal_h3 = document.createElement("h3");
function interesCompuesto() {
  /*
  * Descripción: función que calcula el interés compuesto a partir
  * de capital inicial con reinversión mensual.
  */
  let result_format_US = new Intl.NumberFormat('en-US');
  let eventCapitalInicial = parseInt(document.getElementById("input_CI").value);
  let eventTasaDeInteres = parseInt(document.getElementById("input_Interes").value);
  let eventTiempoDeAhorro = parseInt(document.getElementById("input_Plazo").value);
  let eventCapitalReinversion = parseInt(document.getElementById("input_CR").value);
  if( eventCapitalInicial && eventTasaDeInteres && eventTiempoDeAhorro && eventCapitalReinversion ){
    let capitalFinal = 0;
    let resultadoInteres;
    console.log(`Initial investment: ${eventCapitalInicial} $`);
    console.log(`Annual bank interest: ${eventTasaDeInteres} %`);
    console.log(`Period: ${eventTiempoDeAhorro} Months`);
    console.log(`Monthly reinvestment: ${eventCapitalReinversion} $`);
    for( let i = 1; i <= eventTiempoDeAhorro; i++ ){
      //! Formula de interes compuesto
      i == 1 ? (
        capitalFinal = (eventCapitalInicial) * (1+((eventTasaDeInteres/100)/12))**i,
        resultadoInteres = capitalFinal.toFixed(2),
        console.log(`»Total mount at month number ${i} is ${result_format_US.format(resultadoInteres)} $`)
      ) : (
        capitalFinal = (eventCapitalInicial + eventCapitalReinversion*(i-1))*(1+((eventTasaDeInteres/100)/12))**i,
        resultadoInteres = capitalFinal.toFixed(2),
        console.log(`»Total mount at month number ${i} es ${result_format_US.format(resultadoInteres)} $`)
      );
    }
    let diferenciaCapital = capitalFinal - (eventCapitalInicial + ( eventCapitalReinversion * ( eventTiempoDeAhorro - 1 )));
    let resultadoCapital = diferenciaCapital.toFixed(2);
    console.log(`Interest profit after savings period is: ${resultadoCapital} $`);
    let buttonCalculate_values = document.getElementById("buttonCalculate_values");
    buttonCalculate_values.addEventListener('click', () => {
      DOMCapitalFinal_h3.innerHTML = `<p id="mountCapitalFinal_p">Interest profit after ${eventTiempoDeAhorro} months is: ${result_format_US.format(resultadoCapital)}$</p><p id="mountCapitalFinal_p">Final mount is: ${result_format_US.format(resultadoInteres)} $</p>`;
      DOMCapitalFinal.append(DOMCapitalFinal_h3);
    })
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

//* Creación de etiqueta HTML modificando el DOM mediante JS.
let footer_dev = "Developed by Bruno Pontiz"
let footer_sign = document.createElement("div")
footer_sign.innerHTML = `<footer class="container-fluid><div class="row"><h5 class="footerSign">${footer_dev}</h5></div></footer>`;
document.body.appendChild(footer_sign);

// user1.isInDataBase(databases, 'ECONOMISTA');
function userLocalStorage(){
  //* Descripción: función que almacena en local storage la información introducida por el usuario.
  let key_name = "name";
  let key_profession = "profession";
  let value_name = document.getElementById("input_Name").value;
  let value_profession = document.getElementById("input_Profession").value;
  const user1_info = {[key_name]: value_name, [key_profession]: value_profession};
  let user1_info_JSON = JSON.stringify(user1_info);
  localStorage.setItem("User Info", user1_info_JSON);
}

document.getElementById("buttonReset_values").addEventListener('click', resetValues);
function resetValues() {
  //* Descripción: resetea los valores de la calculadora de interés introducidos por el usuario.
  document.getElementById("input_CI").value = null;
  document.getElementById("input_Interes").value = null;
  document.getElementById("input_Plazo").value = null;
  document.getElementById("input_CR").value = null;
  DOMCapitalFinal_h3.innerHTML = "";
}

function deleteUser() {
  //* Descripción: borra los datos de usuario introducidos por él mismo.
  document.getElementById("input_Name").value = null;
  document.getElementById("input_Profession").value = null;
  localStorage.clear();
}