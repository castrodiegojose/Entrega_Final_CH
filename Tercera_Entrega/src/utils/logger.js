import log4js from 'log4js';

log4js.configure({
    appenders:{
        loggerInfo:{type: 'console'},
        loggerError:{type:'file', filename:'./src/logs/error.log'},
        loggerWarning:{type:'file', filename:'./src/logs/warn.log'},
    },
    categories:{
        default:{ appenders:["loggerInfo"], level:'trace'},
        consola:{ appenders:["loggerInfo"], level:'info'},
        errorArchivo:{ appenders:["loggerError", "loggerInfo"], level:'error'},
        warningArchivo:{ appenders:["loggerWarning", "loggerInfo"], level:'warn'},
    },
})

const logger = log4js.getLogger();
const loggErrorFile = log4js.getLogger('errorArchivo');
const loggWarningFile = log4js.getLogger('warningArchivo');

export {logger, loggErrorFile, loggWarningFile}


