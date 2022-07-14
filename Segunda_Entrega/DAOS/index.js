import mongoCarrito from './mongoDB/mongoCarrito.js';
import mongoProductos from './mongoDB/mongoProductos.js';
import config from '../config.js';


const db = config.TIPO_DB || 'mongodb';
console.log(config.TIPO_DB)
console.log("☁ conectado a:",db);

let productoApi;
let carritoApi;
switch (db) {
    case 'mongodb': 
        productoApi= new mongoProductos();
        carritoApi = new mongoCarrito();
        break;
    default:
        productoApi = new firebaseProductos();
        carritoApi = new firebaseCarrito();
        break;
}
export {productoApi, carritoApi};