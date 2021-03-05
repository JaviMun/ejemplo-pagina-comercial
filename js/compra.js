const compra = new Carrito();
const listaCompra = document.querySelector("#lista-compra tbody");
const carrito = document.getElementById("carrito");
const procesarCompraBtn = document.getElementById("procesar-pedido");
const cliente = document.getElementById("nombre");
const email = document.getElementById("email");



cargarEventos();

function cargarEventos(){

    document.addEventListener("DOMContentLoaded", compra.leerLocalStorageCompra());

    carrito.addEventListener("click", (e)=>compra.elminarProducto(e));

    compra.calcularTotal();

    procesarCompraBtn.addEventListener("click", (e)=>procesarCompra(e));
    
    carrito.addEventListener('change', (e) => { compra.obtenerEvento(e) });
    carrito.addEventListener('keyup', (e) => { compra.obtenerEvento(e) });
}

function procesarCompra(e){
    e.preventDefault();
    if(compra.obtenerProductosLocalStorage().length === 0){
        alert("Debes agregar productos al carrito para poder procesar la compra!");
    }else if(cliente.value === "" || email.value === ""){
        alert("Debes ingresar un nombre y un email para ponerse en contacto con vos");
    }else{
        alert("Compra realizada");
    }
}
