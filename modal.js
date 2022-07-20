import { eliminarProductoCarrito } from "./carritoIndex.js";

const carritoAbrir = document.getElementById('boton-carrito');
const carritoCerrar = document.getElementById('carritoCerrar');

const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
const modalCarrito = document.getElementsByClassName('modal-carrito')[0]


carritoAbrir.addEventListener('click', ()=> {
    contenedorModal.classList.toggle('modal-active')
})
carritoCerrar.addEventListener('click', ()=> {
    contenedorModal.classList.toggle('modal-active')
})
modalCarrito.addEventListener('click', (e) => {
    // Detiene la propagación del vento click dentro del contenedor modalCarrito
    e.stopPropagation();

    // Si el elemento tiene la clase "boton-eliminar" invoco a la funcion que elimina un producto
    if (e.target.classList.contains("boton-eliminar")) {
        eliminarProductoCarrito(Number(e.target.value));
        
        Toastify({
            text: "Producto eliminado",
            duration: 3000,
            gravity: 'bottom',
            style: {
                background: 'black'
            }
        }).showToast();
    }
    
});
contenedorModal.addEventListener('click', ()=>{
    carritoCerrar.click()
})



const formCerrar = document.getElementById('form-cerrar');
const formAbrir = document.getElementById('btn-account');
const formAbrir2 = document.getElementById('btn-form2');


const modal = document.querySelectorAll('.modal-close')[0];
const modalC = document.querySelectorAll('.modal-container')[0];


formAbrir.addEventListener('click', (e)=>{
    e.preventDefault();
    modalC.style.opacity = "1";
    modalC.style.visibility = "visible";
    modal.classList.toggle('modal-close')
});

formAbrir2.addEventListener('click', (e)=>{
    e.preventDefault();
    modalC.style.opacity = "1";
    modalC.style.visibility = "visible";
    modal.classList.toggle('modal-close')
});

formCerrar.addEventListener('click', ()=>{
    modal.classList.toggle('modal-close')
   
    setTimeout(function(){
        modalC.style.opacity = "0";
        modalC.style.visibility = "hidden";
    },200)
});

window.addEventListener('click', (e)=>{
    if(e.target == modalC){
        modal.classList.toggle('modal-close')
   
        setTimeout(function(){
            modalC.style.opacity = "0";
            modalC.style.visibility = "hidden";
        },200)
    }
});

const favAbrir = document.getElementById('btn-fav');
const modalFav = document.getElementsByClassName('modal-contenedor-favoritos')[0];
const favCerrar = document.getElementById('favoritosCerrar');

favAbrir.addEventListener('click', (e) => {
    e.preventDefault();
    modalFav.classList.add('modal-show');
});

favCerrar.addEventListener('click', () => {
    modalFav.classList.remove('modal-show');
});

window.addEventListener('click', (e) => {
    if (e.target == modalFav) {
        modalFav.classList.remove('modal-show');
    }
});

const notiAbrir = document.getElementById('btn-noti');
const notiCerrar = document.getElementById('notificacionesCerrar')
const modalNoti = document.getElementsByClassName('notificaciones')[0];

notiAbrir.addEventListener('click', (e) => {
    e.preventDefault();
    modalNoti.classList.add('notificaciones-show');
});

notiCerrar.addEventListener('click', () => {
    modalNoti.classList.remove('notificaciones-show');
});

window.addEventListener('click', (e) => {
    if (e.target == modalNoti) {
        modalNoti.classList.remove('notificaciones-show');
    }
});
