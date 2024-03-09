let mostrador = document.getElementById("mostrador");
let seleccion = document.getElementById("seleccion");
let imgSeleccionada = document.getElementById("img");
let modeloSeleccionado = document.getElementById("modelo");
let descripSeleccionada = document.getElementById("descripcion");
let precioSeleccionado = document.getElementById("precio");

function cargar(item){
    quitarBordes();
    mostrador.style.width = "60%";
    seleccion.style.width = "40%";
    seleccion.style.opacity = "1";
    item.style.border = "2px solid red";

    imgSeleccionada.src = item.getElementsByTagName("img")[0].src;

    modeloSeleccionado.innerHTML =  item.getElementsByTagName("p")[0].innerHTML;

    descripSeleccionada.innerHTML = "Descripción del modelo ";

    precioSeleccionado.innerHTML =  item.getElementsByTagName("span")[0].innerHTML;


}
function cerrar(){
    mostrador.style.width = "100%";
    seleccion.style.width = "0%";
    seleccion.style.opacity = "0";
    quitarBordes();
}
function quitarBordes(){
    var items = document.getElementsByClassName("item");
    for(i=0;i <items.length; i++){
        items[i].style.border = "none";
    }
}
// Obtener referencia al botón
const contactSellerBtn = document.getElementById('contactSellerBtn');

// Agregar evento de clic al botón
contactSellerBtn.addEventListener('click', function() {
  // Obtener la ruta de la imagen seleccionada
  const imgSrc = document.getElementById('img').getAttribute('data-img-src');
  
  // Mensaje predeterminado que incluye la imagen
  const message = `Hola Diego DM, estoy interesado en comprar un producto `;
  
  // Crear el enlace para abrir WhatsApp con el mensaje predeterminado
  const whatsappLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
  
  // Abrir WhatsApp en una nueva ventana
  window.open(whatsappLink);
});
