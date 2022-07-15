//? App: Calcular la tasa de interés compuesto a una 
//?      determinada cantidad de tiempo en meses con
//?      o sin reinversion parcial.

class Users {
  constructor(nombre, profesion) {
    this.nombre = nombre.toUpperCase();
    this.profesion = profesion.toUpperCase();
  }
  guardarUser() {
    // -Descripción: método que guarda los string inputs por eventos en un array.
    let array_newUser = [];
    let eventGetName = document.getElementById("input_Name").value;
    let eventGetProfession = document.getElementById("input_Profession").value;
    array_newUser.push(eventGetName, eventGetProfession);
    console.log(array_newUser);
  }
  mostrarUser() {
    // -Descripción: método que muestra por consola los datos del usuario.
    console.log(`Las credenciales del usuario son: ${this.profesion} ${this.nombre}`);
  }
}



document.getElementById("input_Name").addEventListener('input', validateUser);
document.getElementById("input_Profession").addEventListener('input', validateUser);
function validateUser() {
  // -Descripción: función que valida usuario y profesion.
  let eventValidateName = document.getElementById("input_Name").value;
  let eventValidateProfession = document.getElementById("input_Profession").value;
  let containsANumber = /\d/;
  if(containsANumber.test(eventValidateName)) {
    alert("Ingrese un usuario valido.");
  }
  return validateUser();
  document.getElementById("input_Name").addEventListener('change', sendUser);
  document.getElementById("input_Profession").addEventListener('change', sendUser);
  function sendUser() {
    // -Descripción: función que envía los datos de usuario introducidos a la clase Users.
    let eventGetName = document.getElementById("input_Name").value;
    let eventGetProfession = document.getElementById("input_Profession").value;
    const user1 = new Users(eventGetName, eventGetProfession);
    eventGetName && eventGetProfession ? (user1.guardarUser() && user1.mostrarUser()) : false;
  }
}

// -Búsqueda del usuario segun las credenciales introducidas 
// por él mismo. 
function isInDataBase(testDatabase, askProfession) {
  /*
    -Descripción: función que imprime un True por consola
    si la profesión del usuario es Economista.
  */
  console.log("------------------"+"\n"+"[Testing] Validación de profesión."+"\n");
  testDatabase.some(function(CompProfession){
    // -CompProfession se instancia con ServicioInteres.
    let economistValidation = askProfession === CompProfession.profesion;
    console.log(economistValidation);
  });
}

// user1.isInDataBase(databases, 'ECONOMISTA');
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
  let {upperCase_user_name, upperCase_user_profession} = user1_info;
  upperCase_user_name = value_name.toUpperCase();
  upperCase_user_profession = value_profession.toUpperCase();
  (upperCase_user_name && upperCase_user_profession) ? (value_alreadyUser.innerHTML = `Welcome ${upperCase_user_profession}, ${upperCase_user_name}!`) : false;
}

document.getElementById("buttonReset_userKeys").addEventListener('click', deleteUser);
function deleteUser() {
  // -Descripción: borra los datos de usuario introducidos por él mismo.
  document.getElementById("input_Name").value = null;
  document.getElementById("input_Profession").value = null;
  localStorage.clear();
  document.getElementById("already_user").innerHTML = "";  
}

// -Agregando sweetalert cuando se clickea boton de Sign Up.
let user_signUp = document.getElementById("buttonSend_userData");
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
    window.open("calculator.html");
  }
})

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