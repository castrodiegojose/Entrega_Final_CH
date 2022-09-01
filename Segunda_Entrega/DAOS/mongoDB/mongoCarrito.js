import ContenedorMongo from '../../contenedores/contenedorMongo.js';
import CarritoModel from '../../models/carritoModel.js';

export default class mongoCarrito extends ContenedorMongo {

    constructor(){
        super(CarritoModel);
    }

    async addPalC(num, objeto) {
        try {
          this.array = await this.collection.find({_id: num});
          let newid = this.array[0].productos.length + 1;  
          objeto.timestamp = this.timestamp;  
          objeto._id = newid;        
          console.log(objeto);
          let carritoUpdate = await this.collection.updateOne({_id:num},{$push: {productos: objeto}});
          console.log(carritoUpdate);
        } 
        catch (err) {
          console.error("ERROR AL ESCRIBIR EL ARCHIVO", err);
        }
      }
       
    async deletePById(id, id_prod) {
        this.array = await this.collection.find({_id: id});       
        const prodIndex = this.array.productos.findIndex(item => item.id === id_prod)
        const prod= this.array.productos.find(item => item.id === id_prod)
        if(prod){
          this.array.productos.splice(prodIndex, 1)
          await this.collection.update({_id:id},{$set:{productos: this.array.productos}});
          return ({
              'Se elimino del carrito': id,
              'el producto con el siguiente id': id_prod
          })
        }
        else{
          return ({
              'En el carrito': id,
              'El producto con el siguiente id no existe': id_prod
        })
      }
    }
}     