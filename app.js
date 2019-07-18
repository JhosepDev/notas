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
   }

   mensajeDelete.classList = 'mensaje-delete';
   mensajeDelete.innerText = 'Eliminaste una nota';
   mensajeDelete.style.opacity = '1';
   mensajeDelete.style.transform = 'translateY(110px)';

   setTimeout(function () {
      mensajeDelete.style.opacity = '0';
      mensajeDelete.style.transform = 'translateY(50px)';
   }, 1000);
}


// Agraga la NOTA a Local Storage ------------------------------------------- >
function agregarNotaLocalStorage(nota) {
   let notas;
   notas = obtenerNotasLocalStorage();
   // Anadir nueva nota
   notas.push(nota);
   // Convertir de string a arreglo para local storage
   localStorage.setItem('notas', JSON.stringify(notas));

   // localStorage.setItem('notas', nota);
}


//Local Storage ------------------------------------------- >
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