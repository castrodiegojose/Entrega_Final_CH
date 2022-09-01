const socket = io();

/// form productos//
const tabla = document.getElementById('tabla');
const agregar = document.getElementById("agregar");
const nombre = document.getElementById("nombre")
const precio = document.getElementById("precio")
const thumbnail = document.getElementById("foto")
const descripcion = document.getElementById("descripcion")
const codigo = document.getElementById("codigo")
const stock = document.getElementById("stock")
const mensajeProd = document.getElementById("no hay datos");

/// modificar para carrito ///

agregar.addEventListener('click', (e) =>{
    e.preventDefault();
    let newProduct = { 
        nombre: nombre.value,
        precio: precio.value, 
        thumbnail: thumbnail.value,
        descripcion: descripcion.value,
        codigo: codigo.value,
        stock: stock.value
    }    
    socket.emit('new-product', newProduct);
    nombre.value ='';
    precio.value = '';
    thumbnail.value = '';
    descripcion.value = '';
    codigo.value = '';
    stock.value = '';
    if(mensajeProd.value !=''){ mensajeProd.innerHTML = '';}       
})

socket.on('product-refresh', (productos)=>{
    let lastPord = productos.length - 1;
    let tablaInfo = tabla.lastElementChild.innerHTML;
    tablaInfo += `                                                
                        <tr>
                            <td>${productos[lastPord].nombre}</td>
                            <td>${productos[lastPord].precio}</td>
                            <td>
                            <img src="${productos[lastPord].thumbnail}" size="5" alt="5">
                            </td>
                            <td>${productos[lastPord].descripcion}</td>
                            <td>${productos[lastPord].codigo}</td>
                            <td>${productos[lastPord].stock}</td>
                        </tr>`;
    tabla.lastElementChild.innerHTML = tablaInfo
  })

