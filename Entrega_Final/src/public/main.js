// import fetch from 'node-fetch';
// import port from '../options/env.js';
// const socket = io();
class UI{
    eliminar(element){
        if (element.name ==='eliminarProd'){
            const elementoPadre = element.parentElement.parentElement
            const id = elementoPadre.querySelector('td#_id').textContent
            elementoPadre.remove()
            return id
        }
    }

}


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
    let newProduct = { 
        nombre: nombre.value,
        precio: precio.value, 
        thumbnail: thumbnail.value,
        descripcion: descripcion.value,
        codigo: codigo.value,
        stock: stock.value
    } 
    
    fetch (`http://localhost:8080/productos`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
    })
    nombre.value ='';
    precio.value = '';
    thumbnail.value = '';
    descripcion.value = '';
    codigo.value = '';
    stock.value = '';
    if(mensajeProd.value !=''){ mensajeProd.innerHTML = '';}       
   // e.preventDefault();
})

document.getElementById("tabla")
.addEventListener('click', (e) =>{
    const ui = new UI();
    idBorrar = ui.eliminar(e.target)
    fetch (`http://localhost:8080/productos/${idBorrar}`,{
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        },
        // body: JSON.stringify(idBorrar),
    })
   // socket.emit('carrito-delete-refresh', idBorrar.id, idBorrar.mail);
})
    


// }

// function refreshTable(newProduct)
// socket.on('product-refresh', (productos)=>{
//     let lastPord = productos.length - 1;
//     let tablaInfo = tabla.lastElementChild.innerHTML;
//     tablaInfo += `                                                
//                         <tr>
//                             <td>${productos[lastPord].nombre}</td>
//                             <td>${productos[lastPord].precio}</td>
//                             <td>
//                             <img src="${productos[lastPord].thumbnail}" size="5" alt="5">
//                             </td>
//                             <td>${productos[lastPord].descripcion}</td>
//                             <td>${productos[lastPord].codigo}</td>
//                             <td>${productos[lastPord].stock}</td>
//                         </tr>`;
//     tabla.lastElementChild.innerHTML = tablaInfo
//   })

