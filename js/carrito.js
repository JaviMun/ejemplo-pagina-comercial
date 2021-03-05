class Carrito {

    //añadir un producto al carrito
    comprarProducto(e){
        e.preventDefault();
        if(e.target.classList.contains("compra")){
            const producto = e.target.parentElement;
            this.leerDatosProducto(producto);
            
        }
    }
    leerDatosProducto(producto){
        const infoProducto = {
            imagen : producto.querySelector("img").src,
            título : producto.querySelector(".proti strong").textContent,
            precio : producto.querySelector(".propre").textContent,
            id : producto.querySelector("a").getAttribute("data-id"),
            cantidad : 1
        }
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach((productoLS)=>{
            if(productoLS.id === infoProducto.id){
                productosLS = productoLS.id;
            }
        });
        if(productosLS === infoProducto.id){
            alert("producto ya agregado, las cantidades se especifican al final del proceso de compra");
        }else{
        this.insertarCarrito(infoProducto);
        }
    }
    insertarCarrito(producto){
        const row = document.createElement("tr");
        row.innerHTML = `<td>
                            <img src="${producto.imagen}"width=100>
                        </td><td>${producto.título}</td>
                        <td>${producto.precio}</td>
                        <td><a href="" class="borrar-producto" data-id="${producto.id}">-</a></td>`;
        listaProductos.appendChild(row);
        this.guardarCarritoLocalStorage(producto);
    }
    elminarProducto(e){
        e.preventDefault();
        let producto, productoID;
        if(e.target.classList.contains("borrar-producto")){
            e.target.parentElement.parentElement.remove();
            producto = e.target.parentElement.parentElement;
            productoID = producto.querySelector("a").getAttribute("data-id");
        }
        this.elminarProductoLocalStorage(productoID);
        this.calcularTotal();
    }
    vaciarCarrito(e){
        e.preventDefault();
        while(listaProductos.firstChild){
            listaProductos.removeChild(listaProductos.firstChild);
        }
        this.vaciarLocalStorage();
        return false;
    }
    guardarCarritoLocalStorage(producto){
        let productos;
        productos = this.obtenerProductosLocalStorage();
        productos.push(producto)
        localStorage.setItem("productos", JSON.stringify(productos));
    }
    obtenerProductosLocalStorage(){
        let productoLS;
        if(localStorage.getItem("productos") === null){
            productoLS = [];
        }else{
            productoLS = JSON.parse(localStorage.getItem("productos"));
        }
        return productoLS;
    }
    elminarProductoLocalStorage(productoID){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function(productoLS, index){
            if(productoLS.id === productoID){
                productosLS.splice(index, 1);
            }
        });

        localStorage.setItem("productos", JSON.stringify(productosLS));
    }
    leerLocalStorage(){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function(producto){
            const row = document.createElement("tr");
            row.innerHTML = `<td>
                            <img src="${producto.imagen}"width=100>
                        </td><td>${producto.título}</td>
                        <td>$ ${producto.precio}</td>
                        <td><a href="" class="borrar-producto" data-id="${producto.id}">-</a></td>`;
            listaProductos.appendChild(row);
        });
    }
    
    leerLocalStorageCompra(){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function(producto){
            const row = document.createElement("tr");
            row.innerHTML = `<td>
                            <img src="${producto.imagen}"width=100>
                        </td><td>${producto.título}</td>
                        <td class="productoPrecio"> ${producto.precio}</td>
                        <td>
                            <input type="number" class="form-control cantidad" min="1" value=${producto.cantidad}>
                        </td>
                        <td id='subtotales'>
                            $ ${producto.precio*producto.cantidad}
                        </td>
                        <td><a href="" class="borrar-producto" data-id="${producto.id}">-</a></td>`;
            listaCompra.appendChild(row);
        });
    }

    vaciarLocalStorage(){
        localStorage.clear();
    }
    procesarPedido(e){
        e.preventDefault();
        if(this.obtenerProductosLocalStorage().length === 0){
            alert("No hay productos en el carrito! Agrega algún producto :)")
        }else{
            location.href = "compra.html";
        }
    }
    calcularTotal(){
        let productoLS;
        let total = 0, subtotal = 0, igv = 0;
        productoLS = this.obtenerProductosLocalStorage();
        for(let i = 0; i < productoLS.length; i++){
            let element = Number(productoLS[i].precio * productoLS[i].cantidad);
            total = total + element;
        }
        igv = parseFloat(total * 0.24).toFixed(2);
        subtotal = parseFloat(total - igv).toFixed(2);
        
        document.getElementById("subtotal").innerHTML = "$" + subtotal;
        document.getElementById("igv").innerHTML = "$" + igv;
        document.getElementById("total").innerHTML = "$" + total.toFixed(2);
        
    }
    
    obtenerEvento(e) {
        e.preventDefault();
        let id, cantidad, producto, productosLS;
        if (e.target.classList.contains('cantidad')) {
            producto = e.target.parentElement.parentElement;
            id = producto.querySelector('a').getAttribute('data-id');
            cantidad = producto.querySelector('input').value;
            let actualizarMontos = document.querySelectorAll('#subtotales');
            productosLS = this.obtenerProductosLocalStorage();
            productosLS.forEach(function (productoLS, index) {
                if (productoLS.id === id) {
                    productoLS.cantidad = cantidad;                    
                    actualizarMontos[index].innerHTML ="$" + Number(cantidad * productosLS[index].precio);
                }    
            });
            localStorage.setItem('productos', JSON.stringify(productosLS));
        }
        else {
            console.log("click afuera");
        }
    }
} 