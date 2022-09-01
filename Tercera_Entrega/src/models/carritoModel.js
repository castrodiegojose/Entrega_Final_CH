import mongoose from 'mongoose';

const carritosCollection = "carritos"

const carritoSchema = new mongoose.Schema({
    productos:{
        type: Array,
        required: true
    },
    timestamp: {
        type: String,
        required: true
    },
    userMail:{
        type: String,
        required: true
    },
    _id: {
        type:Number,
        required: true
    }
})
const CarritoModel = mongoose.model(carritosCollection, carritoSchema);
export default CarritoModel;

