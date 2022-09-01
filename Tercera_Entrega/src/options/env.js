import minimist from 'minimist';
import dotenv from 'dotenv';
dotenv.config()

const argv = minimist(process.argv.slice(2));

const globalVar = {
    MOBILE_ADMIN:process.env.MOBILE_ADMIN,
    EMAIL_ADMIN:process.env.EMAIL_ADMIN,
    PASS_ADMIN_EMAIL:process.env.PASS_ADMIN_EMAIL,
    TEL_ADMIN:process.env.TEL_ADMIN,
    TWILIO_AUTH_TOKEN:process.env.TWILIO_AUTH_TOKEN,
    TWILIO_SID:process.env.TWILIO_SID
}
const port = process.env.PORT ||argv.port || 8080;
export {port,globalVar};