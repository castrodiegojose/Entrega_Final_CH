import ContenedorMongo from '../../contenedores/contenedorMongo.js';
import ProductoModel from '../../models/productosModel.js';

export default class mongoProductos extends ContenedorMongo {

    constructor(){
        super(ProductoModel);
    }
}      
