import {sqliteOptions} from '../options/sqliteDB.js' 
import knex from 'knex';
import {logger, loggErrorFile} from '../utils/logger.js'

const knexsqLite = knex(sqliteOptions);

class BaseMaria {

    async createTableMsj(){            

        await knexsqLite.schema.hasTable('mensajes').then(function(exists){
            if(!exists){
                knexsqLite.schema.createTable('mensajes', (table) =>{
                    table.increments('id');
                    table.string('author');
                    table.string('text');
                }) 
                .then(() => logger.info('tabla mensajes creada'))
                .catch(err => {loggErrorFile.error(err); throw err})
            }
            else{
                logger.info('la tabla mensajes ya existe');
                }
        })
    }

    async  getAllMessages(){        
        let mensajes;         
         await knexsqLite.from('mensajes')
             .select('*')
             .then((rows)=>{
                mensajes=rows;
             })
             .catch(err => {loggErrorFile.error(err);})
         return mensajes;          
     } 
    async guardarMensaje(msj){
        knexsqLite('mensajes').insert(msj)
            .then(() => logger.info('mensajes agregados'))
            .catch(err => {loggErrorFile.error(err); throw err})
    }
}
const classSqLite = new BaseMaria();

export default classSqLite