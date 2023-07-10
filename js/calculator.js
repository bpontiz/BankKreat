//? App: Calcular la tasa de interés compuesto a una 
//?      determinada cantidad de tiempo en meses con
//?      o sin reinversion parcial.


class Users {
  constructor(name, profession) {
    this.name = name.toUpperCase();
    this.profession = profession.toUpperCase();
  }
  saveUser() {
    // Descripción: método que guarda los string inputs en un array.
    let array_newUser = [];
    let eventGetName = document.getElementById("input_Name").value;
    let eventGetProfession = document.getElementById("input_Profession").value;
    array_newUser.push(eventGetName, eventGetProfession);
  }
  showUser() {
    // Descripción: método que muestra por consola los datos del usuario.
    console.log(`Las credenciales del usuario son: ${this.profession} ${this.name}`);
  }
}

function sendUser() {
  // Descripción: función que envía los datos de usuario introducidos a la clase Users.
  let eventGetName = document.getElementById("input_Name").value;
  let eventGetProfession = document.getElementById("input_Profession").value;
  const user1 = new Users(eventGetName, eventGetProfession);
  eventGetName && eventGetProfession ? (user1.saveUser() && user1.showUser()) : false;
}

// AddEventListener de actividad del usuario.
document.getElementById("input_CI").addEventListener('change', compoundInterest);
document.getElementById("input_Interes").addEventListener('change', compoundInterest);
document.getElementById("input_Plazo").addEventListener('change', compoundInterest);
document.getElementById("input_CR").addEventListener('change', compoundInterest);

let DOMCapitalFinal = document.getElementById("DOMCapitalFinal_div");
let DOMCapitalFinal_h3 = document.createElement("h3");
function compoundInterest() {
  /*
    Descripción: función que calcula el interés compuesto a partir
    de capital inicial con reinversión mensual.
  */
  let result_format_US = new Intl.NumberFormat('en-US');
  let eventInitialInvestment = parseInt(document.getElementById("input_CI").value);
  let eventInterestRate = parseInt(document.getElementById("input_Interes").value);
  let eventSavingPeriod = parseInt(document.getElementById("input_Plazo").value);
  let eventMonthlyReinvestment = parseInt(document.getElementById("input_CR").value);
  if( (eventInitialInvestment && eventInterestRate && eventSavingPeriod) && (eventMonthlyReinvestment || eventMonthlyReinvestment === 0) ){
    let finalCapital = 0;
    let interestResult;
    console.log(`Initial investment: ${eventInitialInvestment} $`);
    console.log(`Annual bank interest: ${eventInterestRate} %`);
    console.log(`Period: ${eventSavingPeriod} Months`);
    console.log(`Monthly reinvestment: ${eventMonthlyReinvestment} $`);
    for( let i = 1; i <= eventSavingPeriod; i++ ){
      //! Formula de interes compuesto
      i == 1 ? (
        finalCapital = (eventInitialInvestment) * (1+((eventInterestRate/100)/12))**i,
        interestResult = finalCapital.toFixed(2),
        console.log(`»Total mount at month number ${i} is ${result_format_US.format(interestResult)} $`)
      ) : (
        finalCapital = (eventInitialInvestment + eventMonthlyReinvestment*(i-1))*(1+((eventInterestRate/100)/12))**i,
        interestResult = finalCapital.toFixed(2),
        console.log(`»Total mount at month number ${i} is ${result_format_US.format(interestResult)} $`)
      );
    }
    let capitalDifference = finalCapital - (eventInitialInvestment + ( eventMonthlyReinvestment * ( eventSavingPeriod - 1 )));
    let capitalResult = capitalDifference.toFixed(2);
    console.log(`Interest profit after savings period is: ${capitalResult} $`);
    let buttonCalculate_values = document.getElementById("buttonCalculate_values");
    buttonCalculate_values.addEventListener('click', () => {
      DOMCapitalFinal_h3.innerHTML = `<p id="mountCapitalFinal_p" class="animateEntrance">Interest profit after ${eventSavingPeriod} months is: ${result_format_US.format(capitalResult)} $</p><p id="mountCapitalFinal_p" class="animateEntrance">Final mount is: ${result_format_US.format(interestResult)} $</p>`;
      DOMCapitalFinal.append(DOMCapitalFinal_h3);
    })
  }
}

// Creación de etiqueta HTML modificando el DOM mediante JS.
let footer_dev = "Developed by Bruno Pontiz"
let footer_sign = document.createElement("div")
footer_sign.innerHTML = `<footer class="container-fluid><div class="row"><h5 class="footerSign">${footer_dev}</h5></div></footer>`;
document.body.appendChild(footer_sign);

function userLocalStorage() {
  // Descripción: función que almacena en local storage la información introducida por el usuario.
  let key_name = "name";
  let key_profession = "profession";
  let value_name = document.getElementById("input_Name").value;
  let value_profession = document.getElementById("input_Profession").value;
  const user1_info = {[key_name]: value_name, [key_profession]: value_profession};
  let user1_info_JSON = JSON.stringify(user1_info);
  localStorage.setItem("User Info", user1_info_JSON);
}

var nav_identificate_user = document.getElementById("user_identification");
var DOM_nav_identificate_user = document.createElement("p");
var DOM_nav_identificate_user_JSON = JSON.parse(localStorage.getItem("User Info")).name;
console.log(DOM_nav_identificate_user_JSON);
DOM_nav_identificate_user.innerHTML = `<i class="bi bi-person"></i><p id="p_identificate_user dropdown">${DOM_nav_identificate_user_JSON}</p>`;
nav_identificate_user.appendChild(DOM_nav_identificate_user);


document.getElementById("buttonReset_values").addEventListener('click', resetValues);
function resetValues() {
  // Descripción: resetea los valores de la calculadora de interés introducidos por el usuario.
  document.getElementById("input_CI").value = null;
  document.getElementById("input_Interes").value = null;
  document.getElementById("input_Plazo").value = null;
  document.getElementById("input_CR").value = null;
  DOMCapitalFinal_h3.innerHTML = "";
}

function deleteUser() {
  // Descripción: borra los datos de usuario introducidos por él mismo.
  document.getElementById("input_Name").value = null;
  document.getElementById("input_Profession").value = null;
  localStorage.clear();
}