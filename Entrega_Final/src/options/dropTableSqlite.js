///// Modulo creado para borrar la tabla de mensajes /////
import sqlite from 'sqlite3';
import { logger, loggErrorFile} from '../utils/logger.js';

let db = new sqlite.Database('../SqliteDB/mydb.sqlite');

db.run('DROP TABLE mensajes', (err)=>{
    if(err){
        loggErrorFile.error(err.message);
    }
    logger.info('Tabla Mensajes Borrada!')
})

db.run('DROP TABLE productos', (err)=>{
    if(err){
        loggErrorFile.error(err.message);
    }
    logger.info('Tabla productos Borrada!')
})
db.close()