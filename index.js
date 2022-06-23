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
  
}

//* AddEventListener de cambios en los parametros introducidos por el usuario.
document.getElementById("input_CI").addEventListener('change', interesCompuesto);
document.getElementById("input_Interes").addEventListener('change', interesCompuesto);
document.getElementById("input_Plazo").addEventListener('change', interesCompuesto);
document.getElementById("input_CR").addEventListener('change', interesCompuesto);

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
    // let DOMCapitalFinal = document.createElement("div");
    // DOMCapitalFinal.innerHTML = `
    //                             <div class="row">
    //                               <div class="col-lg-12">
    //                                 <h3 class="finalCapitalText">C.F.</h3>
    //                                 <h3 class="mount">${resultadoCapital} $</h3>
    //                               </div>
    //                             </div>`;
    // document.body.appendChild(DOMCapitalFinal);
    let DOMCapitalFinal = document.getElementById("DOMCapitalFinal_div");
    let DOMCapitalFinal_h3 = document.createElement("h3");
    DOMCapitalFinal_h3.innerHTML = `<p id="mountCapitalFinal_p">El interés ganado a los ${eventTiempoDeAhorro} meses es de: ${resultadoCapital} $</p><p id="mountCapitalFinal_p">El capital final es de: ${resultadoInteres} $</p>`;
    DOMCapitalFinal.append(DOMCapitalFinal_h3);

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
isInDataBase(databases, 'ECONOMISTA');

//* Creacion de etiqueta HTML modificando el DOM mediante JS.
let footer_dev = "Developed by Bruno Pontiz"
let footer_sign = document.createElement("div")
footer_sign.innerHTML = `<footer class="container-fluid><div class="row"><h5 class="footerSign">${footer_dev}</h5></div></footer>`;
document.body.appendChild(footer_sign);