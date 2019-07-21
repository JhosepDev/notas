// Variables ////////////////////////////////////////////////////// >
const listaNotas = document.getElementById('lista-notas');
const mensajeDelete = document.getElementById('mensaje-delete');




// Event Listeners ////////////////////////////////////////////////////// >

eventListener();

function eventListener() {
   // Cuando se envia el formulario.
   document.querySelector('#formulario').addEventListener('submit', agregarNota);

   // Borrar nota
   listaNotas.addEventListener('click', borrarNota);

   // Contenido cargado
   document.addEventListener('DOMContentLoaded', localStorageListo);
}



// Funciones ////////////////////////////////////////////////////// >


// Anadir Nota del formulario. ------------------------------------------- >
function agregarNota(e) {
   e.preventDefault();

   // Leer el valor del textarea
   const nota = document.getElementById('nota').value;

   const botonBorrar = document.createElement('a');
   botonBorrar.classList = 'borrar-nota';
   botonBorrar.innerText = '';


   // Crear elemento y anadirle el contenido a la lista
   const li = document.createElement('li');
   li.innerText = nota;
   // Anade el boton de borrar y la tarea a la lista
   li.appendChild(botonBorrar);
   listaNotas.appendChild(li);


   // Anadir a Local Satorage
   agregarNotaLocalStorage(nota);
}


// Elimina la NOTA del DOM ------------------------------------------- >
function borrarNota(e) {
   e.preventDefault();
   if (e.target.className === 'borrar-nota') {
      e.target.parentElement.remove();
      borrarNotaLocalStorage(e.target.parentElement.innerText);


      // Mensaje de: Nota eliminada.
      mensajeDelete.classList = 'mensaje-delete';
      mensajeDelete.innerText = 'Eliminaste una nota';
      mensajeDelete.style.opacity = '1';
      mensajeDelete.style.transform = 'translateY(40px)';

      setTimeout(function () {
         mensajeDelete.style.opacity = '0';
         mensajeDelete.style.transform = 'translateY(20px)';
      }, 1000);
   }

}


// Mostrar datos de Local Storage en la lista ------------------------------------------- >
function localStorageListo() {
   let notas;

   notas = obtenerNotasLocalStorage();

   notas.forEach(function (nota) {
      const botonBorrar = document.createElement('a');
      botonBorrar.classList = 'borrar-nota';
      botonBorrar.innerText = '';


      // Crear elemento y anadirle el contenido a la lista
      const li = document.createElement('li');
      li.innerText = nota;
      // Anade el boton de borrar y la tarea a la lista
      li.appendChild(botonBorrar);
      listaNotas.appendChild(li);
   });
}


// Agraga NOTA a Local Storage ------------------------------------------- >
function agregarNotaLocalStorage(nota) {
   let notas;
   notas = obtenerNotasLocalStorage();
   // Anadir nueva nota
   notas.push(nota);
   // Convertir de string a arreglo para local storage
   localStorage.setItem('notas', JSON.stringify(notas));

   // localStorage.setItem('notas', nota);
}


//Comprobar que haya elementos en Local Storage (retorna un arreglo) ---------------------------- >
function obtenerNotasLocalStorage() {
   let notas;
   // Revisamos los valores de Local Storage
   if (localStorage.getItem('notas') === null) {
      notas = [];
   } else {
      notas = JSON.parse(localStorage.getItem('notas'));
   }

   return notas;
}


// Eliminar NOTA de Local Storage --------------------------------------------- >
function borrarNotaLocalStorage(nota) {

   let notas;
   let notaBorrar;

   notas = obtenerNotasLocalStorage();
   notaBorrar = nota;

   notas.forEach(function (nota, index) {

      if (notaBorrar === nota) {
         notas.splice(index, 1);
         console.log('EXITO');
      } else {
         console.log('ERROR');
      }
   });

   localStorage.setItem('notas', JSON.stringify(notas));

}

