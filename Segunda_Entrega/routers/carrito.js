/// Requiero express para usar el constructor Router
import express from "express";
import { carritoApi } from "../DAOS/index.js";
export const routerCarr = new express.Router();



/// GET devuelve todos los carritos
routerCarr.get('/:id/productos', async (req, res)=> {
    const id = parseInt(req.params.id)
    res.send(await carritoApi.getById(id))
})


/// POST guarda un carritoApi nuevo
routerCarr.post('/', async (req, res) => {
    let newCarrito = req.body;
    res.send(await carritoApi.save(newCarrito))
})



/// POST agrega un producto a un carrito
routerCarr.post('/:id/productos', async (req, res) => {
    const id = parseInt(req.params.id)
    const newProd = req.body;
    await carritoApi.addPalC(id, newProd);
    res.send({
        'Nuevo Producto': newProd,
        'Agregado al carrito': id
    })
})


/// DELETE elimina un carrito
routerCarr.delete('/:id', async (req, res) => {
    let id = parseInt(req.params.id)
    res.send(await carritoApi.deleteById(id));
})

/// DELETE elimina un producto de un carrito

routerCarr.delete('/:id/productos/:id_prod', async (req, res) => {
    let id = parseInt(req.params.id);
    let id_prod = parseInt(req.params.id_prod);
    res.send(await carritoApi.deletePById(id, id_prod));
});

