import twilio from "twilio";
import { logger, loggErrorFile } from "./logger.js";
import {globalVar} from '../options/env.js'



const client = twilio(globalVar.TWILIO_SID, globalVar.TWILIO_AUTH_TOKEN);

const whatsappInformation = async (productos, user) => {
    let prods = "";
    productos.forEach((producto) => {
        prods += `\n ${producto.nombre} -|- $${producto.precio}`;
    });

    try{
        await client.messages.create({
            body: `Ha llegado un pedido de ${user.name} (${user.email}): ${prods}`,
            from: "whatsapp:+14155238886",
            to: `whatsapp:${globalVar.TEL_ADMIN}`,
        })
        .then((message) => logger.info(message.sid))
        .done();
    }catch(e){
        loggErrorFile.error(e)
    }
}

const smsInformation = async (productos, user) => {
    let prods = "";
    productos.forEach((producto) => {
        prods += `\n ${producto.nombre} -|- $${producto.precio}`;
    });
    try{
        await client.messages.create({
            body: `Hola, ${user.name}! Tu pedido de: ${prods} \n esta siendo verificado, te avisaremos cuando se despache`,
            from: "+18433805885",
            to:`+${user.phoneNumber}`,
        })
        .then((message) => {
            logger.info(`numero : +${user.phoneNumber}`)
            logger.info(message.sid)})
        .done();
    }catch(e){
        loggErrorFile.error(e)
    }
};

export { whatsappInformation, smsInformation };