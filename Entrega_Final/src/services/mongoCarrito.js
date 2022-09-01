import ContenedorMongo from './fatherClassMongo.js';
import CarritoModel from '../models/carritoModel.js';

class mongoCarrito extends ContenedorMongo {

    constructor(){
        super(CarritoModel);
    }

    async getCarritoById(mail){ 
      try{  
          console.log("entro al getCarritobyid")
          this.array = await this.collection.find({userMail: mail});
          console.log(this.array);

          if (this.array != []) return this.array;    
      
          return {Error:'No existe el ID'}
      }
      catch(err){
          throw new Error("ERROR AL ENLISTAR POR ID:", err);
      }
    }

    async testCarritoExist(email){
      this.array = await this.collection.find({userMail: email});
        if(this.array.length === 0){

          let cantidadCarrito = await this.collection.find()
          console.log("entro en el if")
          let arrayCarritos = []
          const primerCarrito = {productos:[]}
          primerCarrito.userMail = email

          let newid = cantidadCarrito.userMail + 1;            
          primerCarrito.timestamp = this.timestamp;
          primerCarrito._id = newid;


          //const primerCarrito = new this.collection([], this.timestamp,email,newid)
                      
          // primerCarrito.productos.push(objeto)
          arrayCarritos.push(primerCarrito)
          await this.saveInCollection(primerCarrito)
          return arrayCarritos
        //   await this.saveInCollection(primerCarrito);
          
        //   console.log("primer carrito creado")
        }
        else{
          return this.array
        }
    }

    async addPalC(mail, objeto) {
        try {
          this.array = await this.collection.find({userMail: mail});
          let newid = this.array[0].productos.length + 1;  
          objeto.timestamp = this.timestamp;  
          objeto._id = newid;        
          let carritoUpdate = await this.collection.updateOne({userMail: mail},{$push: {productos: objeto}});
          console.log("Se actualizo el carrito", carritoUpdate);
        } 
        catch (err) {
          console.error("ERROR AL ESCRIBIR EL ARCHIVO", err);
        }
      }
       
    async deletePById(id_prod, mail) {
        this.array = await this.collection.find({userMail:mail});  
        const prodIndex = this.array[0].productos.findIndex(item => item._id == id_prod)
        const prod= this.array[0].productos.find(item => item._id == id_prod)
        if(prod){
          this.array[0].productos.splice(prodIndex, 1)
          await this.collection.updateOne({userMail:mail},{$set:{productos: this.array[0].productos}});
          console.log("se elimino el prod")
          return this.array = await this.collection.find({userMail: mail})
        }
        else{
          console.log("no se pudo")
      }
    }

    async deleteCarritoByMail(mail){
      try{
          //this.array = await this.collection.find({userMail:mail}); 
          await this.collection.updateOne({userMail:mail},{$set:{productos:[]}});
          console.log("vaciando carrito de:", mail)
      }
      catch(err){
          throw new Error("ERROR AL ELIMINAR POR ID:", err);
      }
  }
}

const carritoApi = new mongoCarrito();

export default carritoApi;

