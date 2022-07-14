/// Llamo y ejecuto express
import express from 'express';
const app = express(); 

/// Llamo a los respectivos Routers
import {routerProd} from './routers/productos.js';
import {routerCarr} from './routers/carrito.js';

import config from './config.js';
const port = config.port;

/// Midlewear JSON
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/productos', routerProd);
app.use('/api/carrito', routerCarr);

app.listen(port,() => {console.log(`corriendo en puerto ${port}`)})
app.on("error", (err) => console.log("Error en el servidor", err));
