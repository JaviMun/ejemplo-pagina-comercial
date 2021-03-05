const carro = new Carrito;
const carrito = document.getElementById("carrito");
const productos = document.getElementById("productos");
const listaProductos = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
const procesarCompraBtn = document.getElementById("procesar-compra");

cargarEventos();
function cargarEventos(){

    productos.addEventListener("click", (e)=>carro.comprarProducto(e));

    carrito.addEventListener(("click"), (e)=>carro.elminarProducto(e));

    vaciarCarritoBtn.addEventListener(("click"), (e)=>carro.vaciarCarrito(e));

    document.addEventListener("DOMContentLoaded", carro.leerLocalStorage());

    procesarCompraBtn.addEventListener("click", (e)=>carro.procesarPedido(e))
} 