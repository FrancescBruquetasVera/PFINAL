window.addEventListener('load',iniciar,false);

/*Contador inicializado en cero*/
var contador=0;

function iniciar(){
    setInterval('cambiarImg()',2000);
}

var obj=document.getElementById('slider');
var obj2=obj.getElementsByTagName('img');

function cambiarManual(sentido)
{
    if (sentido=="DER") {
        obj2[contador].style.opacity=0;
        if (contador<obj2.length-1) 
        {
            contador++;
            obj2[contador].style.opacity=1;
            console.log('Contador vale ' + contador + ' Longitud ' + obj2.length);
        }
        else
        {
            contador=0;
            obj2[contador].style.opacity=1;
            console.log('Contador vale ' + contador + ' Longitud ' + obj2.length);
        }
    }
    else if (sentido=="IZQ") 
    {
        obj2[contador].style.opacity=0;
        if (contador!=0) 
        {
            contador--;
            obj2[contador].style.opacity=1;
        }
        else
        {
            contador=obj2.length-1;
            obj2[contador].style.opacity=1;
        }
    }
}

function cambiarImg(){	        

    if(contador==obj2.length){
        for(var i=0; i<obj2.length; i++){
            obj2[i].style.opacity='0';
            contador--;
        }
        obj2[contador].style.opacity='1';
    }
    else
    {
        obj2[contador].style.opacity='1';
        contador++;
    }
    
}
var carritoVisible = false;

// Esperamos que todos los elementos de la página carguen para ejecutar el script
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    // Agregamos funcionalidad a los botones eliminar del carrito
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for (var i = 0; i < botonesEliminarItem.length; i++) {
        botonesEliminarItem[i].addEventListener('click', eliminarItemCarrito);
    }

    // Agrego funcionalidad al botón sumar cantidad
    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for (var i = 0; i < botonesSumarCantidad.length; i++) {
        botonesSumarCantidad[i].addEventListener('click', sumarCantidad);
    }

    // Agrego funcionalidad al botón restar cantidad
    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for (var i = 0; i < botonesRestarCantidad.length; i++) {
        botonesRestarCantidad[i].addEventListener('click', restarCantidad);
    }

    // Agregamos funcionalidad al botón agregar al carrito
    var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for (var i = 0; i < botonesAgregarAlCarrito.length; i++) {
        botonesAgregarAlCarrito[i].addEventListener('click', agregarAlCarritoClicked);
    }

    // Agregamos funcionalidad al botón comprar
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarClicked);
}

function pagarClicked() {
    alert("Gracias por la compra");
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    while (carritoItems.hasChildNodes()) {
        carritoItems.removeChild(carritoItems.firstChild);
    }
    actualizarTotalCarrito();
    ocultarCarrito();
}

function agregarAlCarritoClicked(event) {
    var button = event.target;
    var item = button.closest('.item');
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;

    agregarItemAlCarrito(titulo, precio, imagenSrc);
    hacerVisibleCarrito();
}

function hacerVisibleCarrito() {
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    var items = document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%';
}

function agregarItemAlCarrito(titulo, precio, imagenSrc) {
    var item = document.createElement('div');
    item.classList.add('item');

    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for (var i = 0; i < nombresItemsCarrito.length; i++) {
        if (nombresItemsCarrito[i].innerText === titulo) {
            alert("El item ya se encuentra en el carrito");
            return;
        }
    }

    var itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>`;

    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);
    item.getElementsByClassName('restar-cantidad')[0].addEventListener('click', restarCantidad);
    item.getElementsByClassName('sumar-cantidad')[0].addEventListener('click', sumarCantidad);

    actualizarTotalCarrito();
}

function sumarCantidad(event) {
    var selector = event.target.parentElement;
    var cantidadElemento = selector.getElementsByClassName('carrito-item-cantidad')[0];
    var cantidadActual = parseInt(cantidadElemento.value);
    cantidadElemento.value = cantidadActual + 1;
    actualizarTotalCarrito();
}

function restarCantidad(event) {
    var selector = event.target.parentElement;
    var cantidadElemento = selector.getElementsByClassName('carrito-item-cantidad')[0];
    var cantidadActual = parseInt(cantidadElemento.value);
    if (cantidadActual > 1) {
        cantidadElemento.value = cantidadActual - 1;
        actualizarTotalCarrito();
    }
}

function eliminarItemCarrito(event) {
    var buttonClicked = event.target.closest('.carrito-item');
    buttonClicked.remove();
    actualizarTotalCarrito();
    ocultarCarrito();
}

function ocultarCarrito() {
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if (carritoItems.childElementCount === 0) {
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;

        var items = document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';
    }
}

function actualizarTotalCarrito() {
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;

    for (var i = 0; i < carritoItems.length; i++) {
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        var precio = parseFloat(precioElemento.innerText.replace('$', '').replace('.', ''));
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        var cantidad = parseInt(cantidadItem.value);
        total += precio * cantidad;
    }

    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$' + total.toLocaleString("es") + ",00";
}


