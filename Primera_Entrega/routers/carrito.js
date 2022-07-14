const express = require('express')
const router = express.Router();
const classCarrito = require('../classCarrito');

const carrito = new classCarrito('./carrito.txt')



router.get('/:id/productos', function(req, res) {        

    id = parseInt(req.params.id)
   
    res.send(carrito.getCById(id))

    
})



router.post('/', function (req, res) {

    newCarrito = req.body;
    
    res.send(carrito.saveC(newCarrito));    
})

router.post('/:id/productos', function (req, res) {

    id = parseInt(req.params.id)
    newProd = req.body;
    carrito.addPalC(id, newProd);
    res.send({
        'Nuevo Producto': newProd,
        'Agregado al carrito': id    
    }); 

})


router.delete('/:id', function (req, res) {
    id = parseInt(req.params.id)
    res.send(carrito.deleteCById(id));


})

router.delete('/:id/productos/:id_prod', function (req, res) {
    id = parseInt(req.params.id);
    id_prod = parseInt(req.params.id_prod);    
    
    res.send(carrito.deletePById(id,id_prod));


})

module.exports = router