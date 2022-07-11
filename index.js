import { actualizarCarrito } from "./app.js";
import { mostrarProductos } from "./app.js";
import { obtenerCarritoStorage, renderProductosCarrito } from "./carritoIndex.js";
// import { stockProductos } from "./stock.js";


document.addEventListener("DOMContentLoaded", () => {

  mostrarProductos();

  if (localStorage.getItem("carrito")) {
    const carritoStorage = obtenerCarritoStorage();
    renderProductosCarrito(carritoStorage);
    actualizarCarrito(carritoStorage);
  }
})