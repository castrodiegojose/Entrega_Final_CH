class UI {

    agregarProdCarrito(element) {
        if (element.name ==='agregarProdCarrito'){
            const elementoPadre = element.parentElement.parentElement
            const id= elementoPadre.querySelector('td#_id').textContent
            const nombre= elementoPadre.querySelector('td#nombre').textContent
            const precio= elementoPadre.querySelector('td#precio').textContent
            const thumbnail = elementoPadre.querySelector('td#thumbnail').querySelector('img').src
            const mail = emailUser.textContent

            let newProductCarrito = {
                _id: id, 
                nombre: nombre,
                precio: precio, 
                thumbnail: thumbnail
            }
            return {newProductCarrito , mail}
        }
        else{
            console.log("el elemento no existe")
        }
    }

    eliminar(element){
        if (element.name ==='eliminarProdCarrito'){
            const elementoPadre = element.parentElement.parentElement
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
    fetch (`http://localhost:8080/carrito/${newProductCarrito.mail}`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newProductCarrito.newProductCarrito),
    })
})

document.getElementById("Carritotabla")
.addEventListener('click', (e) =>{
    const ui = new UI();
    Borrar = ui.eliminar(e.target)
    fetch (`http://localhost:8080/carrito/borrarprod/${Borrar.mail}`,{
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({id: Borrar.id}),
    })
})
    
eliminarCarrito.addEventListener('click', (e)=>{
    const ui = new UI();
    swal({
        title: "¿Seguro desea borrar el carrito?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            swal("Poof! Carrito borrado!", {
                icon: "success",
            },);
            carritoMail = ui.eliminarCarrito()
            fetch (`http://localhost:8080/carrito/${carritoMail}`,{
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                },
            })
        } else {
            swal("Su carrito esta asalvo!");
            return null;
        }
    });
})

comprarCarrito.addEventListener('click', (e)=>{
    const ui = new UI();
    swal({
        title: "¿Seguro desea comprar el carrito?",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            swal("Compra exitosa!", {
                title: "En breve le llegara un mensaje de texto con la verificacion",
                icon: "success",
            },);
            carritoMail = ui.comprarCarrito()
            fetch (`http://localhost:8080/carrito/comprarcarrito/${carritoMail}`,{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
            })
        } else {
            swal("Sigue comprando!");
            return null;
        }
    });
})