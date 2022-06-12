//* Consigna: CREAR UN SIMULADOR INTERACTIVO INCORPORANDO ARRAYS
//*           Y UTILIZANDO METODOS Y CLASES VISTOS EN CLASE.

//? Enunciado: Calcular la tasa de interés compuesto a una 
//?            determinada cantidad de tiempo en meses.

class Interes {
  constructor(nombre, apellido, profesion) {
    this.nombre = nombre.toUpperCase();
    this.apellido = apellido.toUpperCase();
    this.profesion = profesion.toUpperCase();
  }
  mostrarUser() {
    /*
    * Descripción: función que muestra por consola los datos del usuario.
    */
    console.log("Las credenciales del usuario son: "+"\n"+this.nombre+" "+this.apellido+"\n"+this.profesion);
  }
  interesCompuesto() {
    /*
    * Descripción: función que calcula el interés compuesto a partir
    * de capital inicial sin reinversión parcial.
    */
  let capitalInicial, capitalFinal, tasaDeInteres, tiempoDeAhorro;
  alert("A continuación ingreserá los datos de la calculadora.");
  capitalInicial = parseInt(prompt("Ingrese capital inicial. Ej: 3000"));
  tasaDeInteres = parseInt(prompt("Ingrese tasa de interés. Ej: 37%"));
  tiempoDeAhorro = parseInt(prompt("Ingrese tiempo de ahorro en meses. Ej: 2"));
  alert("Chequea la consola!");
  for( let i = 0; i <= tiempoDeAhorro; i++ ){
      //! Formula de interes compuesto
      capitalFinal = capitalInicial * ( 1 + ((tasaDeInteres/100)/12) ) ** i;
      let resultadoInteres = capitalFinal.toFixed(2);
      console.log("El capital final al mes " + i + " es: " + resultadoInteres);  
  }
  let diferenciaCapital = capitalFinal - capitalInicial;
  let resultadoCapital = diferenciaCapital.toFixed(2);
  console.log("La ganancia total luego del tiempo de ahorro es de: " + resultadoCapital);
  }
}

//* Declarando objetos para armado de base de datos.
const database = [];
alert("Bienvenido a la calculadora de interés compuesto!");
let pedirNombre = prompt("Ingrese su nombre:");
let pedirApellido = prompt("Ingrese su apellido:");
let pedirProfesion = prompt("Ingrese su profesion:");
database.push(new Interes(pedirNombre, pedirApellido, pedirProfesion));
for(const interes of database){
  interes.mostrarUser();
  interes.interesCompuesto();
}