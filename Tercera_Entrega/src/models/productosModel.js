import mongoose from 'mongoose';

const productosCollection = "productos"
 
const productoSchema = new mongoose.Schema({
    
    nombre: {
        type: String,
        required: true
    },
    precio:{
        type: Number,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    codigo: {
        type: Number,
        required: true
    },
    stock:{
        type: Number,
        required: true
    },    
    timestamp:{
        type: String,
        required: true
    },
    _id:{
        type: Number,
        required: true
    }
      
})
const ProductoModel = mongoose.model(productosCollection, productoSchema);
export default ProductoModel;


