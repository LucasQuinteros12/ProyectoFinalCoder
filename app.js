import { carritoIndex, renderProductosCarrito } from "./carritoIndex.js";
import { getData } from "./getData.js";
import { productos } from "./stock.js"

let carritoDeCompras = []

const carritoVacio = carritoDeCompras || [];

const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorCarrito = document.getElementById('carrito-contenedor');

const botonTerminar = document.getElementById('terminar');
const finCompra = document.getElementById('fin-compra');

const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');

const buscador = document.getElementById('search');
const buscador2 = document.getElementById('buscadorFooter');

//Logica

export const mostrarProductos = async () => {

    const productos = await getData();

    contenedorProductos.innerHTML = ""
    productos.forEach(el => {
        const { img, nombre, id, desc, precio } = el
        let div = document.createElement('div')
        div.className = 'producto'
        div.innerHTML = `<div class="card">
                            <div class="card-image">
                                <img src="${img}">
                                <span class="card-title">${nombre}</span>
                                <a id="fav${id}" class="btn-floating halfway-fab waves-effect waves-light red"><i class="fa-solid fa-star material-icons"></i></a>
                                <a id="boton${id}" class="btn-floating halfway-fab waves-effect waves-light red"><i class="fa-solid fa-cart-arrow-down material-icons"></i></a>
                            </div>
                            <div class="card-content">
                                <p>${desc}</p>
                                <p> $${precio}</p>
                            </div>
                        </div>`

        contenedorProductos.appendChild(div)
        let btnAgregar = document.getElementById(`boton${id}`)
        btnAgregar.addEventListener('click', () => {

            Toastify({
                text: "Producto añadido",
                duration: 3000,
                gravity: 'bottom',
                style: {
                    background: 'black'
                }
            }).showToast();
            carritoIndex(id);
        })
        let btnFav = document.getElementById(`fav${id}`)
        btnFav.addEventListener('click', () => {

            Toastify({
                text: "Producto añadido a Favoritos",
                duration: 3000,
                gravity: 'bottom',
                style: {
                    background: 'black'
                }
            }).showToast();
            
        })
    })
}


//buscador 

buscador.addEventListener('keyup', (e) => {
    const busqueda = e.target.value.toLowerCase();
    const productos = document.querySelectorAll('.producto');
    productos.forEach(el => {
        const nombre = el.innerText.toLowerCase();
        if (nombre.indexOf(busqueda) != -1) {
            el.style.display = 'block';
        } else {
            el.style.display = 'none';
        }
    })
})

buscador2.addEventListener('keyup', (e) => {
    const busqueda = e.target.value.toLowerCase();
    const productos = document.querySelectorAll('.producto');
    productos.forEach(el => {
        const nombre = el.innerText.toLowerCase();
        if (nombre.indexOf(busqueda) != -1) {
            el.style.display = 'block';
        } else {
            el.style.display = 'none';
        }
    })
})


export const actualizarCarrito = (carritoDeCompras) => {
    contadorCarrito.innerText = carritoDeCompras.reduce((acc, item) => acc + item.cantidad, 0);
    precioTotal.innerText = carritoDeCompras.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    localStorage.setItem("carrito", JSON.stringify(carritoDeCompras));
}

const finalizarCompra = document.getElementById('finalizarCompra')

finalizarCompra.addEventListener('click', () => {

    renderProductosCarrito(carritoVacio);
    actualizarCarrito(carritoVacio);
    carritoDeCompras = []
    carritoCerrar.click()
    let timerInterval
    Swal.fire({
        icon: 'success',
        title: 'Compra Realizada!',
        html: 'Esto se cerrara solo en <b></b>.',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft()
            }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {

        }
    })
})



// loading();
