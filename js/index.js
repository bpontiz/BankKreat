//? App: Calcular la tasa de interés compuesto a una 
//?      determinada cantidad de tiempo en meses con
//?      o sin reinversion parcial.

class Users {
  constructor(name, profession) {
    this.name = name.toUpperCase();
    this.profession = profession.toUpperCase();
  }
  saveUser() {
    // -Descripción: método que guarda los string inputs por eventos en un array
    // y evalúa si la profesión del usuario es "ECONOMIST".
    let array_newUser = [];
    let eventGetName = document.getElementById("input_Name").value;
    let eventGetProfession = document.getElementById("input_Profession").value;
    let eventGetProfession_UpperCase = eventGetProfession.toUpperCase();
    array_newUser.push(eventGetName, eventGetProfession);
    console.log(array_newUser);
    if(eventGetName && eventGetProfession) {
      array_newUser.some(function() {
        let askProfession = "ECONOMIST";
        let economistValidation = askProfession === eventGetProfession_UpperCase;
        console.log(`------------------\n User's profession is Economist? ${economistValidation}\n------------------`);
      });
    }
  }
  showUser() {
    // -Descripción: método que muestra por consola los datos del usuario.
    console.log(`Las credenciales del usuario son: ${this.profession} ${this.name}`);
  }
}

document.getElementById("input_Name").addEventListener('change', sendUser);
document.getElementById("input_Profession").addEventListener('change', sendUser);
function sendUser() {
  // -Descripción: función que envía los datos de usuario introducidos a la clase Users.
  let eventGetName = document.getElementById("input_Name").value;
  let eventGetProfession = document.getElementById("input_Profession").value;
  const user1 = new Users(eventGetName, eventGetProfession);
  eventGetName && eventGetProfession ? (user1.saveUser() && user1.showUser()) : false;
}

let loginForm = document.getElementById("validate_form");
loginForm.addEventListener('submit', validateForm);
function validateForm(e) {
  e.preventDefault();
}

document.getElementById("input_Name").addEventListener('change', userLocalStorage);
document.getElementById("input_Profession").addEventListener('change', userLocalStorage);
function userLocalStorage(){
  // -Descripción: función que almacena en local storage la información introducida por el usuario.
  let key_name = "name";
  let key_profession = "profession";
  let value_name = document.getElementById("input_Name").value;
  let value_profession = document.getElementById("input_Profession").value;
  const user1_info = {[key_name]: value_name, [key_profession]: value_profession};
  let user1_info_JSON = JSON.stringify(user1_info);
  localStorage.setItem("User Info", user1_info_JSON);
  let value_alreadyUser = document.getElementById("already_user");
  let {validate_user_name, validate_user_profession} = user1_info;
  validate_user_name = value_name.toUpperCase();
  validate_user_profession = value_profession.toUpperCase();
  (validate_user_name && validate_user_profession) ? (value_alreadyUser.innerHTML = `Welcome ${validate_user_profession}, ${validate_user_name}!`) : false;
}

document.getElementById("buttonReset_userKeys").addEventListener('click', deleteUser);
function deleteUser() {
  // -Descripción: borra los datos de usuario introducidos por él mismo.
  document.getElementById("input_Name").value = null;
  document.getElementById("input_Profession").value = null;
  localStorage.clear();
  document.getElementById("already_user").innerHTML = "";
  location.reload();
  let refreshCalculatorPage = "";
  let calculatorPage = "https://bpontiz.github.io/BankKreat/pages/calculator.html";
  refreshCalculatorPage.location.href = calculatorPage;
  return false;
}

// -Agregando sweetalert cuando se clickea boton de Sign Up.
document.getElementById("input_Name").addEventListener('change', goToCalculator);
document.getElementById("input_Profession").addEventListener('change', goToCalculator);
function goToCalculator() {
  let user_signUp = document.getElementById("buttonSend_userData");
  let html_input_Name = document.getElementById("input_Name").value;
  let html_input_Profession = document.getElementById("input_Profession").value;
  if(!((html_input_Profession == "" || html_input_Profession.length < 3)
    || 
    (html_input_Name == "" || html_input_Name.length < 5))) {
      user_signUp.addEventListener('click', () => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'User registered',
          showConfirmButton: false,
          timer: 1500,
          width: 250,
          showClass: {
            popup: 'animate__animated animate__fadeIn'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOut'
          }
        })
        setTimeout(openCalculator, 2500);
        function openCalculator() {
          window.open("https://bpontiz.github.io/BankKreat/pages/calculator.html");
        }
      })
  }
}

// -Enviando recursos con POST method mediante fetch()
// -URL de soporte: JSON Placeholder
let db_userName = document.getElementById("input_Name");
let db_userProfession = document.getElementById("input_Profession");
let db_buttonSend = document.getElementById("buttonSend_userData");
db_buttonSend.addEventListener('click', () => {
  const db_user = {
    name: db_userName.value,
    profession: db_userProfession.value
  }
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method:'POST',
    body: JSON.stringify(db_user),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  .then((response) => response.json())
  .then((db_user) => console.log(db_user));
});

// -Creación de etiqueta HTML modificando el DOM mediante JS.
let footer_dev = "Developed by Bruno Pontiz"
let footer_sign = document.createElement("div")
footer_sign.innerHTML = `<footer class="container-fluid text-center><div class="row"><h5 class="footerSign">${footer_dev}</h5></div></footer>`;
document.body.appendChild(footer_sign);