import express from "express";
import {productoApi} from '../DAOS/index.js'
export const routerProd =  new express.Router();



routerProd.get('/:id?', async (req, res) => {
    const id = parseInt(req.params.id);
    if (id) {
        res.send(await productoApi.getById(id));
    } else {
        res.send(await productoApi.getAll());
    }
})


routerProd.post('/', auth, async(req, res) => {
    const newProduct = req.body;
    await productoApi.save(newProduct);
    res.send({ 'Nuevo Producto agregado': newProduct });
})

routerProd.put('/:id', auth, async (req, res) => {
    const  id = parseInt(req.params.id);
    const newprod = req.body;
    res.send(await productoApi.updateById(id, newprod));
})

routerProd.delete('/:id', auth, async (req, res) => {
    const id = parseInt(req.params.id);
    res.send(await productoApi.deleteById(id));
});


function auth(req, res, next) {
    if (req.query.admin === 'true') {
        next();
    } else {
        res.send({ error: -1, description: `ruta ${req.path} para el metodo ${req.method} no autorizada` });
    }
}   

