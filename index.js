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
    console.log(array_newUser);
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
document.getElementById("input_Name").addEventListener('change', sendUser);
document.getElementById("input_Name").addEventListener('change', userLocalStorage);
document.getElementById("input_Profession").addEventListener('change', sendUser);
document.getElementById("input_Profession").addEventListener('change', userLocalStorage);
document.getElementById("buttonReset_userKeys").addEventListener('click', deleteUser);

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
  let value_alreadyUser = document.getElementById("already_user");
  let {validate_user_name, validate_user_profession} = user1_info;
  validate_user_name = value_name.toUpperCase();
  validate_user_profession = value_profession.toUpperCase();
  (validate_user_name && validate_user_profession) ? (value_alreadyUser.innerHTML = `Welcome ${validate_user_profession}, ${validate_user_name}!`) : false;
}

function deleteUser() {
  //* Descripción: borra los datos de usuario introducidos por él mismo.
  document.getElementById("input_Name").value = null;
  document.getElementById("input_Profession").value = null;
  localStorage.clear();
}

//* Agregando sweetalert cuando se clickea boton de Sign Up.
let user_signUp = document.getElementById("buttonSend_userData");
user_signUp.addEventListener('click', () => {
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'User registered',
    showConfirmButton: false,
    timer: 2000
  })}
)