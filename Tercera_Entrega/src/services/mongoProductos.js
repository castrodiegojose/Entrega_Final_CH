import ContenedorMongo from './fatherClassMongo.js';
import ProductoModel from '../models/productosModel.js';

class mongoProductos extends ContenedorMongo {

    constructor(){
        super(ProductoModel);
    }
}      

const productosApi = new mongoProductos();
export default productosApi;