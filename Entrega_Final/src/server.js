///////////////// IMPORTS////////////////////
//----------- Librerias --------------------//
import express from 'express';
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import flash from 'connect-flash'
import dotenv from 'dotenv';
import compression from 'compression';
dotenv.config();

//---------- Persistencia por Mongo -----------//
import MongoStore from 'connect-mongo';

//---------- Modulos ------------------------//
import {port} from './options/env.js'
import './signupDB.js'
import classSqLite from './services/classDB.js';
import router from './routes/routes.js';
import { logger, loggErrorFile} from './utils/logger.js';



const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

classSqLite.createTableMsj();

///////////////// MIDDLEWARES////////////////////

//------- SESSION -----------//
app.use(cookieParser())
app.use(session({
    store: MongoStore.create({
        mongoUrl:`mongodb+srv://${process.env.MONGOATLAS_USER}:${process.env.MONGOATLAS_PASS}@cluster0.dcufv.mongodb.net/${process.env.MONGOATLAS_DB}?retryWrites=true&w=majority`,
        ttl: 10}),
    secret: '1234567890!"#$%&/()=',
    resave: false,
    saveUninitialized: false,
    cookie:{
        expires:60000000
    }
}))
//------- MOTOR DE PLANTILLAS --------//
app.use(express.static("./src/public"));
app.set("views", "./src/views");
app.set("view engine", ".ejs");

//---------CODIFICACION DE BODY-----//
app.use(express.json())
app.use(express.urlencoded({extended: true}));

//------- FLASH --------//
app.use(flash());
//------- PASSPORT --------//
app.use(passport.initialize());
app.use(passport.session());
//------- COMPRESSION --------//
app.use(compression());

app.use((req,res,next)=>{
   app.locals.signupMessage = req.flash('signupMessage');
   app.locals.loginMessage = req.flash('loginMessage');
   next();
})
// ///////////////// RUTAS ////////////////////
app.use('/', router)

///////////////// SERVER ////////////////////

// httpServer.listen( port, function () {
httpServer.listen( port, ()=>{   
    logger.info(`listening on port ${port}`);
}); 

///////////////// WEB SOCKET ////////////////////

io.on('connection', socket => {
    logger.info(`Un cliente se ha conectado:${socket.id.substring(0,4)}`);
    socket.on('new-message', async (data) => {
        let mensajes=[];
        classSqLite.guardarMensaje(data)
        mensajes = await classSqLite.getAllMessages()
        io.sockets.emit('message-refresh', mensajes);
    });
});