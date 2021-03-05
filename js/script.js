(function(global){

    let zn = {};
    let homeHtml = "snippet/inicio.html";
    let quienesSomos = "snippet/quienesSomos.html";
    let servicios = "snippet/servicios.html";
    let productos = "snippet/market.html";
    let compra = "snippet/compra.html";

    //función que inserta el html en el elemento que queremos.
    let insertarHtml = function(elemento, html){
        let lugar = document.querySelector(elemento);
        lugar.innerHTML = html;
    }

    //mostrar icono cargando mientras se realiza la petición.
    let mostrarCargando = function(elemento){
        let html = "<div class='text-center'>";
        html += "<img src='img/ajax-loader.gif'></div>";
        insertarHtml(elemento, html)
    }

    //hacemos que se ejecute con la carga de la página.
    document.addEventListener("DOMContentLoaded", function(event){
        mostrarCargando("#main-content");
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                document.getElementById("main-content")
                    .innerHTML = this.responseText;
            }else{
                document.getElementById("main-content")
                    .innerHTML = this.readyState + " " + this.status;
            }
        };
        xhttp.open("GET", homeHtml, false);
        xhttp.send(null);
    });

    zn.quienesSomos = function(){
        mostrarCargando("#main-content");
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                document.getElementById("main-content")
                    .innerHTML = this.responseText;
            }else{
                document.getElementById("main-content")
                    .innerHTML = this.readyState + " " + this.status;
            }
        };
        xhttp.open("GET", quienesSomos, false);
        xhttp.send(null);
    }

    zn.servicios = function(){
        mostrarCargando("#main-content");
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                document.getElementById("main-content")
                    .innerHTML = this.responseText;
            }else{
                document.getElementById("main-content")
                    .innerHTML = this.readyState + " " + this.status;
            }
        };
        xhttp.open("GET", servicios, false);
        xhttp.send(null);
    }
    
    global.$zn = zn;

})(window);
