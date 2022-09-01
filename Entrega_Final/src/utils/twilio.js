import twilio from "twilio";
//import { logger, loggErrorFile } from "./logger.js";
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
        .then((message) => console.log(message.sid))
        .done();
    }catch(e){
        console.log(e)
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
            console.log(`numero : +${user.phoneNumber}`)
            console.log(message.sid)})
        .done();
    }catch(e){
        console.log(e)
    }
};

export { whatsappInformation, smsInformation };