import { actualizarCarrito } from "./app.js";
import { productos } from "./stock.js";

export const carritoIndex = (productoId) => {
    let carritoDeCompras = [];
    if (localStorage.getItem("carrito")) {
        carritoDeCompras = obtenerCarritoStorage();
    }
    let productoRepetido = carritoDeCompras.find(producto => producto.id === productoId);
    contarProductosRepetidos(productoRepetido, productoId, carritoDeCompras);
}

const contarProductosRepetidos = (prodRepetido, productoId, carritoDeCompras) => {
    if (prodRepetido) {
        prodRepetido.cantidad++
        document.getElementById(`cantidad${prodRepetido.id}`).innerHTML = `<p id=cantidad${prodRepetido.id}>Cantidad:${prodRepetido.cantidad}</p>`;
        actualizarCarrito(carritoDeCompras);
    } else {
        agregarProductoAlCarrito(productoId, carritoDeCompras);
    }
}

const agregarProductoAlCarrito = (productoId, carritoDeCompras) => {
    const contenedor = document.getElementById('carrito-contenedor');
    const producto = productos.find(producto => producto.id === productoId);
    carritoDeCompras.push(producto);

    producto.cantidad = 1;

    const div = document.createElement('div');
    div.classList.add('productoEnCarrito');
    div.innerHTML = ` <p>${producto.nombre}</p>
                    <p>Precio:${producto.precio}</p>
                    <p id=cantidad${producto.id}>Cantidad:${producto.cantidad}</p>
                    <button id=eliminar${producto.id} class="btn waves-effect waves-light boton-eliminar" value="${producto.id}">X</i></button>
                  `
    contenedor.appendChild(div);
    actualizarCarrito(carritoDeCompras);
};

export const eliminarProductoCarrito = (productoId) => {
    const carritoStorage = obtenerCarritoStorage();
    const carritoActualizado = carritoStorage.filter(producto => producto.id !== productoId);

    actualizarCarrito(carritoActualizado);
    renderProductosCarrito(carritoActualizado);
};


export const renderProductosCarrito = (carritoDeCompras) => {

    const contenedor = document.getElementById('carrito-contenedor');

    contenedor.innerHTML = "";

    carritoDeCompras.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('productoEnCarrito');
        div.innerHTML = ` <p>${producto.nombre}</p>
                      <p>Precio:${producto.precio}</p>
                      <p id=cantidad${producto.id}>Cantidad:${producto.cantidad}</p>
                      <button id=eliminar${producto.id} class="btn waves-effect waves-light boton-eliminar" value="${producto.id}">X</button>
                    `
        contenedor.appendChild(div);
    });
};

export const obtenerCarritoStorage = () => {
    const carritoStorage = JSON.parse(localStorage.getItem("carrito"))
    return carritoStorage;
}



