//variable que almacena los datos de los productos una vez cargados del json
let PRODUCTOS = [];
//variables fijas de selección de elementos de interés
//contenedor de los productos y de la lista final de compra
const MARKET = document.getElementById("market");
//tabla que muesta los elemento que agregamos al carrito en el nav
const CARRO = document.getElementById("carro");
//contenedor que se encarga de englobar la lista del carrito en el nav
const DROPDOWN = document.getElementById("dropdown-table");
//numero que acompña al boton del carrito de compras
const NUMERO_ARTICULOS = document.getElementById("numero-articulos");

//creamos la variable carrito que almancenara los productos que queremos comprar
let carrito = [];

//creamos una función que carga los productos y los coloca en la página
function crearCardProducto(nombre, imagen, descripcion, precio, i){
    let contenedorProducto = document.createElement("div");
    contenedorProducto.setAttribute("class", "producto");
    let datos = `
            <h3>${nombre}</h3>
            <img src="${imagen}" alt="${nombre}">
            <p>${descripcion}</p>
            <p>$${precio}</p>
            <div>
                <button onclick="anadirProducto(${i})">Añadir al carrito</button>
                <button onclick="caracteristicas(${i})">Saber más</button>
            </div>
        `
    contenedorProducto.innerHTML += datos;
    MARKET.appendChild(contenedorProducto);
}

/*creamos una conexión asíncrona que traiga los datos de los productos y ejecutamos
la función que pinta los productos en la página*/

function cargarProductos(){
    fetch('./productos.json')
    .then(response => response.json())
    .then ((data) =>{
        let indice = 0
        data.forEach((elemento) =>{
            PRODUCTOS.push(elemento);
            crearCardProducto(
                elemento.nombre,
                elemento.imagen,
                elemento.descripcion,
                elemento.precio,
                indice
                );
                indice++;
            })
        });
    }
//Ejecutamos la carga asíncrona para que muestre los productos
cargarProductos();

/*llamamos a esta función para agregar un producto al carrito,
le pasamos como parametro su ubicación en el array productos*/
function anadirProducto(id) {
    let index = carrito.findIndex(producto => PRODUCTOS[id].id == producto.id);
    if(index < 0){
        let art = Object.assign({}, PRODUCTOS[id]);
        carrito.push(art);
    }else{
        carrito[index].cantidad += 1; 
    }
    graficarCarrito();
    numeroArticulos();
}

//Función que contruye la vista del carrito de compras del nav
function graficarCarrito() {
    CARRO.innerHTML = `
        <thead>
            <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Valor</th>
                <th>Remover</th>
            </tr>
        </thead>
        <tbody>

        </tbody>
    `;
    for (let i = 0; i < carrito.length; i++) {
        let fila = document.createElement("tr");
        let datos = `
            <td>${carrito[i].nombre}</td>
            <td>${carrito[i].cantidad}</td>
            <td>${carrito[i].precio}</td>
            <td><button onclick="eliminarProductoDesplegable(${i})">X</button></td>
        `
        fila.innerHTML += datos;
        CARRO.appendChild(fila);
    }
}

/*Es llamada para refrescar la vista el carrito de compras
del nav cuando eliminamos un elmento*/
function eliminarProductoDesplegable(id){
    let eliminado = carrito.splice(id, 1);
    NUMERO_ARTICULOS.innerHTML = Number(NUMERO_ARTICULOS.innerText) - eliminado[0].cantidad;
    graficarCarrito();
}

//Eliminamos todos los elementos de la variable carrito y llamamos a mostrarproductos()
function vaciarCarrito() {
    carrito = [];
    CARRO.innerHTML = `
        <thead>
            <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Valor</th>
                <th>Remover</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    `
    MARKET.innerHTML = ` `
    NUMERO_ARTICULOS.innerText = "0";
    let indice = 0;
    PRODUCTOS.forEach((elemento)=>{
        crearCardProducto(
            elemento.nombre,
            elemento.imagen,
            elemento.descripcion,
            elemento.precio,
            indice
            );
        indice++;
    })
    mostrarCarrito();
}

/*Generamos una nuevas vista con la lista definitiva de compras
 y un formulario para que el cliente agregue sus datos*/
function finalizarCompra(){
    let container = document.createElement("div");

    let primeraParte = `
    <form action="#" class="comprador">
        <h3>Datos del comprador</h3>
        <input type="text" aria-label="Nombre Completo" placeholder="Nombre Completo">
        <input type="text" aria-label="Email" placeholder="Email">
        <input type="text" aria-label="DNI" placeholder="DNI">
        <input type="text" aria-label="Domicilio" placeholder="Domicilio">
        <input type="text" aria-label="Codigo Postal" placeholder="Codigo Postal">
        <input type="hidden" name="articulos" id="ticket" value="">
        <button type="submit" aria-label="Finalizar compra">Finalizar compra</button>
    </form>
    <table class="tabla-final">
        <thead>
            <tr>
                <th>Producto</th>
                <th>Imagen</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Precio Total</th>
                <th>Quitar</th>
            </tr>
        </thead>
        <tbody id="factura">
        <!--Acá se insertan dinámicamente los elementos del carrito de compras para finalizar la compra-->
        </tbody>
    </table>
    `;
    
    container.innerHTML += primeraParte;
    
    MARKET.innerHTML = "";
    MARKET.append(container);

    const FACTURA = document.getElementById("factura");
    for(let i = 0; i < carrito.length; i++){
        let fila = document.createElement("tr");
        let datos = `
            <td>${carrito[i].nombre}</td>
            <td><img src="${carrito[i].imagen}" alt="${carrito[i].nombre}" width="50px"></td>
            <td>${carrito[i].cantidad}</td>
            <td>${carrito[i].precio}</td>
            <td>${carrito[i].precio * carrito[i].cantidad}</td>
            <td><button onclick="eliminarProductoFC(${i})">X<button></td>
        `
        fila.innerHTML += datos;
        FACTURA.append(fila);
    };

    let total = 0;
    for(let i = 0; i < carrito.length; i++){
        total += carrito[i].cantidad * carrito[i].precio;
    };
    let filaTotal = document.createElement("tr");
    let cierreFactura = `
        <td colspan="4">Total</td>
        <td colspan="2">${total}</td>
    `
    filaTotal.innerHTML = cierreFactura;
    FACTURA.append(filaTotal);

    const TICKET = document.getElementById("ticket");
    let carritoString = JSON.stringify(carrito);
    TICKET.setAttribute("value", carritoString);
    DROPDOWN.className = "hidden";
}

/*Eliminamos un productos en la vista de finalizar compra,
 los saca de la variable carrito y refresca la vista tanto de la lista final como
 del carrito desplegable del nav*/ 
function eliminarProductoFC(id){
    let eliminado = carrito.splice(id, 1);
    finalizarCompra();
    graficarCarrito();
    NUMERO_ARTICULOS.innerHTML = Number(NUMERO_ARTICULOS.innerText) - eliminado[0].cantidad;
}

//asociada con el boton carrito del nav, muestra o esconde el carrito desplegable
function mostrarCarrito(){
    let control = DROPDOWN.className;
    if(control === "hidden"){
        DROPDOWN.className = "show";
    }else{
        DROPDOWN.className = "hidden";
    }
}

//se encarga de manejar el numero de articulos que se muestra en el boton carrito del nav
function numeroArticulos(){
    NUMERO_ARTICULOS.innerHTML = Number(NUMERO_ARTICULOS.innerText) + 1;
}

//crea una vista nueva en la que se muestra las especificaciones del articulo seleccionado
function caracteristicas(id){
    MARKET.innerHTML = "";
    let contenedorProducto = document.createElement("div");
    contenedorProducto.setAttribute("class", "saber-mas");
    let datos = `
        <div>
            <h3>${PRODUCTOS[id].nombre}</h3>
            <img src="${PRODUCTOS[id].imagen}" alt="${PRODUCTOS[id].nombre}">
        </div>
        <div>
            <p>${PRODUCTOS[id].fichaTecnica}</p>
            <p>$${PRODUCTOS[id].precio}</p>
            <div>
                <button onclick="anadirProducto(${id})">Comprar</button>
                <button onclick="mostrarProductos()">Volver a la tienda</button>
            </div>
        </div>
    `
    contenedorProducto.innerHTML += datos;
    MARKET.appendChild(contenedorProducto);
}

function mostrarProductos(){
    MARKET.innerHTML = ` `;
    let indice = 0;
    PRODUCTOS.forEach((elemento)=>{
        crearCardProducto(
            elemento.nombre,
            elemento.imagen,
            elemento.descripcion,
            elemento.precio,
            indice
            );
        indice++;
    })
}