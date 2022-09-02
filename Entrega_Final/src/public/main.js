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
    })
})