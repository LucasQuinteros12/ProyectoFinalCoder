import { carritoIndex, renderProductosCarrito } from "./carritoIndex.js";
import { getData } from "./getData.js";

let carritoDeCompras = []

const carritoVacio = carritoDeCompras || [];

const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorCarrito = document.getElementById('carrito-contenedor');

const botonTerminar = document.getElementById('terminar');
const finCompra = document.getElementById('fin-compra');

const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');

const buscador = document.getElementById('search');

//buscador 

buscador.addEventListener('input', (e) => {
    console.log(e.target.value)
    let busca = stockProductos.filter(el => el.nombre.toLowerCase().includes(e.target.value))
    mostrarProductos(busca)
})


//loading
// const loading = () => {
//     contenedorProductos.innerHTML = '<img class= "loading"src="https://i.gifer.com/T04A.gif">'

//     setTimeout(() => {
//         mostrarProductos(productos)
//     }, 3000)
// }



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
    })
}

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
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {

        }
    })
})



// loading();
