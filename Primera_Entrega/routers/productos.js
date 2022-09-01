const express = require('express')
const router = express.Router();
const classProductos = require('../classProductos.js')


const productos = new classProductos('./productos.txt')



router.get('/:id?', function(req, res) {        

        id = parseInt(req.params.id)

        if(id){
                console.log('dentro del if')
                res.send(productos.getById(id))
        }
        else{
                res.send(productos.getAll())
        }

})
        

router.post('/', auth, function(req, res){
        newProduct= req.body
        productos.save(newProduct)
        res.send({'Nuevo Producto agregado': newProduct})
})

router.put('/:id', auth, function(req, res){

        id = parseInt(req.params.id)
        newprod = req.body
        res.send(productos.putUpload(id, newprod))

})

router.delete('/:id',auth, function(req, res){

        id = parseInt(req.params.id)
        res.send(productos.deleteById(id));


})



function auth(req, res, next){
        if (req.query.admin === 'true'){
                next()
        } else {
                res.send({error:-1, description: `ruta ${req.path} para el metodo ${req.method} no autorizada`})
        }
}

module.exports = router;

