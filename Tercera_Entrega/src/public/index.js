const socket = io();
//import carritoApi from '../services/mongoCarrito'

class UI {

    agregarProdCarrito(element) {
        console.log("agregando")
        if (element.name ==='agregarProdCarrito'){
            const elementoPadre = element.parentElement.parentElement
            const nombre= elementoPadre.querySelector('td#nombre').textContent
            const precio= elementoPadre.querySelector('td#precio').textContent
            const thumbnail = elementoPadre.querySelector('td#thumbnail').querySelector('img').src
            const mail = emailUser.textContent

            let newProductCarrito = { 
                nombre: nombre,
                precio: precio, 
                thumbnail: thumbnail
            }
        
            return {newProductCarrito , mail}
        }
        else{console.log("el elemento no existe")}
    }

    eliminar(element){
        if (element.name ==='eliminarProdCarrito'){
            const elementoPadre = element.parentElement.parentElement
            console.log(elementoPadre)
            const id = elementoPadre.querySelector('td#_id').textContent
            const mail = emailUser.textContent
            elementoPadre.remove()
            return {id, mail}
        }
    }

    eliminarCarrito(){
        const mail = emailUser.textContent
        let tablaInfo = carritoTabla.lastElementChild.innerHTML;
        tablaInfo = `<tr>
                        <td id ="carrito vacio" colspan="6">Carrito Vacio</td>
                    </tr>`;
        carritoTabla.lastElementChild.innerHTML = tablaInfo
    
        console.log(mail)
        return mail
    }   
    
    comprarCarrito(){
        let tablaInfo = carritoTabla.lastElementChild.innerHTML;
        tablaInfo = `<tr>
                        <td id ="carrito vacio" colspan="6">Carrito Vacio</td>
                    </tr>`;
        carritoTabla.lastElementChild.innerHTML = tablaInfo
        return emailUser.textContent
    }
    
}
/// form productos//
const tabla = document.getElementById('tabla');
const agregarProdCarrito = document.getElementById("agregarProdCarrito");
const nombre = document.getElementById("nombre")
const precio = document.getElementById("precio")
const thumbnail = document.getElementById("foto")
const descripcion = document.getElementById("descripcion")
const codigo = document.getElementById("codigo")
const stock = document.getElementById("stock")
const mensajeProd = document.getElementById("no hay datos");
const emailUser = document.getElementById("emailUser")


/// modificar para carrito ///
const carritoTabla = document.getElementById("Carritotabla");
const eliminarProdCarrito = document.getElementById("eliminarProdCarrito");
const comprarCarrito = document.getElementById("ComprarCarrito");
const eliminarCarrito = document.getElementById("EliminarCarrito");
const mensajeCarrito = document.getElementById("carrito vacio");




document.getElementById("tabla")
.addEventListener('click', (e) =>{
    const ui = new UI();
        newProductCarrito = ui.agregarProdCarrito(e.target)
        socket.emit('new-prod-carrito', newProductCarrito.newProductCarrito, newProductCarrito.mail);
        
        e.preventDefault();
    })
    
    document.getElementById("Carritotabla")
    .addEventListener('click', (e) =>{
        const ui = new UI();
        idBorrar = ui.eliminar(e.target)
        socket.emit('carrito-delete-refresh', idBorrar.id, idBorrar.mail);
    })
    
eliminarCarrito.addEventListener('click', (e)=>{
    e.preventDefault();
    const ui = new UI();
    swal({
        title: "¿Seguro desea borrar el carrito?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        console.log(willDelete)
        if (willDelete) {
            swal("Poof! Carrito borrado!", {
                icon: "success",
            },);
            carritoMail = ui.eliminarCarrito()
            socket.emit('carrito-delete', carritoMail);
                
        } else {
            swal("Su carrito esta asalvo!");
            return null;
        }
    });
})

comprarCarrito.addEventListener('click', (e)=>{
    e.preventDefault();
    const ui = new UI();
    swal({
        title: "¿Seguro desea comprar el carrito?",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        console.log(willDelete)
        if (willDelete) {
            swal("Compra exitosa!", {
                title: "En breve le llegara un mensaje de texto con la verificacion",
                icon: "success",
            },);
            carritoMail = ui.comprarCarrito()
            socket.emit('carrito-comprar', carritoMail);
        } else {
            swal("Sigue comprando!");
            return null;
        }
    });
})



socket.on('carrito-refresh', (carrito)=>{
    let lastPord = carrito[0].productos.length - 1;
    
    let tablaInfo = carritoTabla.lastElementChild.innerHTML;
    tablaInfo += `                                                
                        <tr class="table table-dark table-striped-columns">
                            <td id="_id">${carrito[0].productos[lastPord]._id}</td
                            <td>${carrito[0].productos[lastPord].nombre}</td>
                            <td>${carrito[0].productos[lastPord].precio}</td>
                            <td>
                                <img src="${carrito[0].productos[lastPord].thumbnail}" size="5" alt="5">
                            </td>
                            <td>
                                <a type="submit" name="eliminarProdCarrito" class="btn btn-primary" style = "float: right;">Eliminar</a>
                            </tr> 
                        </tr>`;
    carritoTabla.lastElementChild.innerHTML = tablaInfo
  })

socket.on('carrito-delete', (carrito)=>{
let lastPord = carrito[0].productos.length - 1;

let tablaInfo = carritoTabla.lastElementChild.innerHTML;
tablaInfo = `                                                
                    <tr>
                        <td id="_id">${carrito[0].productos[lastPord]._id}</td
                        <td>${carrito[0].productos[lastPord].nombre}</td>
                        <td>${carrito[0].productos[lastPord].precio}</td>
                        <td>
                        <img src="${carrito[0].productos[lastPord].thumbnail}" size="5" alt="5">
                        </td>
                        <td>
                            <a type="submit" name="eliminarProdCarrito" class="btn btn-primary" style = "float: right;">Eliminar</a>
                        </tr> 
                    </tr>`;
carritoTabla.lastElementChild.innerHTML = tablaInfo
})