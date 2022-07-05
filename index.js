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
  if(eventGetName && eventGetProfession){
    user1.guardarUser();
    user1.mostrarUser();
  }
}


//* AddEventListener de actividad del usuario.
document.getElementById("input_CI").addEventListener('change', interesCompuesto);
document.getElementById("input_Interes").addEventListener('change', interesCompuesto);
document.getElementById("input_Plazo").addEventListener('change', interesCompuesto);
document.getElementById("input_CR").addEventListener('change', interesCompuesto);
document.getElementById("input_Name").addEventListener('change', sendUser);
document.getElementById("input_Name").addEventListener('change', userLocalStorage);
document.getElementById("input_Profession").addEventListener('change', sendUser);
document.getElementById("input_Profession").addEventListener('change', userLocalStorage);
document.getElementById("buttonReset_values").addEventListener('click', resetValues);
document.getElementById("buttonReset_userKeys").addEventListener('click', deleteUser);

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
    console.log(`El capital inicial fue de: ${eventCapitalInicial} $`);
    console.log(`La tasa de interés anual fue de: ${eventTasaDeInteres} %`);
    console.log(`El tiempo de ahorro fue de: ${eventTiempoDeAhorro} Meses`);
    console.log(`El monto de reinversión fue de: ${eventCapitalReinversion} $`);
    for( let i = 1; i <= eventTiempoDeAhorro; i++ ){
      //! Formula de interes compuesto
      if( i == 1 ){
        capitalFinal = (eventCapitalInicial) * (1+((eventTasaDeInteres/100)/12))**i;
        resultadoInteres = capitalFinal.toFixed(2);
        console.log(`»El capital final al mes ${i} es ${result_format_US.format(resultadoInteres)} $`);
      }else{
        capitalFinal = (eventCapitalInicial + eventCapitalReinversion*(i-1))*(1+((eventTasaDeInteres/100)/12))**i;
        resultadoInteres = capitalFinal.toFixed(2);
        console.log(`»El capital final al mes ${i} es ${result_format_US.format(resultadoInteres)} $`);
      }
    }
    let diferenciaCapital = capitalFinal - (eventCapitalInicial + ( eventCapitalReinversion * ( eventTiempoDeAhorro - 1 )));
    let resultadoCapital = diferenciaCapital.toFixed(2);
    console.log(`La ganancia total en intereses, luego del tiempo de ahorro es de: ${resultadoCapital} $`);
    let DOMCapitalFinal = document.getElementById("DOMCapitalFinal_div");
    let DOMCapitalFinal_h3 = document.createElement("h3");
    DOMCapitalFinal_h3.innerHTML = `<p id="mountCapitalFinal_p">El interés ganado a los ${eventTiempoDeAhorro} meses es de: ${result_format_US.format(resultadoCapital)}$</p><p id="mountCapitalFinal_p">El capital final es de: ${result_format_US.format(resultadoInteres)} $</p>`;
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

function resetValues() {
  //* Descripción: resetea los valores de la calculadora de interés introducidos por el usuario.
  document.getElementById("input_CI").value = null;
  document.getElementById("input_Interes").value = null;
  document.getElementById("input_Plazo").value = null;
  document.getElementById("input_CR").value = null;
}

function deleteUser() {
  //* Descripción: borra los datos de usuario introducidos por él mismo.
  document.getElementById("input_Name").value = null;
  document.getElementById("input_Profession").value = null;
  localStorage.clear();
}