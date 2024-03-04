/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
navToggle.addEventListener('click', () =>{
   navMenu.classList.add('show-menu')
})

/* Menu hidden */
navClose.addEventListener('click', () =>{
   navMenu.classList.remove('show-menu')
})

/*=============== SEARCH ===============*/
const search = document.getElementById('search'),
      searchBtn = document.getElementById('search-btn'),
      searchClose = document.getElementById('search-close')

/* Search show */
searchBtn.addEventListener('click', () =>{
   search.classList.add('show-search')
})

/* Search hidden */
searchClose.addEventListener('click', () =>{
   search.classList.remove('show-search')
})

/*=============== LOGIN ===============*/
const login = document.getElementById('login'),
      loginBtn = document.getElementById('login-btn'),
      loginClose = document.getElementById('login-close')

/* Login show */
loginBtn.addEventListener('click', () =>{
   login.classList.add('show-login')
})

/* Login hidden */
loginClose.addEventListener('click', () =>{
   login.classList.remove('show-login')
})
/*Login Page */
document.getElementById('loginForm').addEventListener('submit', function(event) {
   event.preventDefault();
   
   // Obtener los valores del formulario
   const username = document.getElementById('username').value;
   const password = document.getElementById('password').value;

   // Validar las credenciales
   if (username === 'Diego' && password === 'D13g0DM') {
     // Credenciales válidas, redirigir a la página de administración
     window.location.href = 'Gestion_Inventario.html';
   } else {
     // Credenciales inválidas, mostrar mensaje de error
     alert('Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.');
     // Limpiar los campos del formulario
     document.getElementById('username').value = '';
     document.getElementById('password').value = '';
     // Enfocar el campo de usuario
     document.getElementById('username').focus();
   }
 });
 