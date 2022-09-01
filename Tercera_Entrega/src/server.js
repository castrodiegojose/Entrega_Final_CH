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
import productosApi from './services/mongoProductos.js'
import carritoApi from './services/mongoCarrito.js'
import router from './routes/routes.js';
import User from './models/user.model.js'
import { logger, loggErrorFile} from './utils/logger.js';
import { enviarMailCompra } from './utils/nodeMailer.js';
import { whatsappInformation, smsInformation } from './utils/twilio.js';



const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

///////////////// MIDDLEWARES////////////////////

//------- SESSION -----------//
app.use(cookieParser())
app.use(session({
    store: MongoStore.create({
        mongoUrl:`mongodb+srv://${process.env.MONGOATLAS_USER}:${process.env.MONGOATLAS_PASS}@cluster0.dcufv.mongodb.net/${process.env.MONGOATLAS_DB}?retryWrites=true&w=majority`,
        //mongoUrl: "mongodb://127.0.0.1:27017/mibase", // conexion local
        ttl: 10}),
    secret: '1234567890!"#$%&/()=',
    resave: false,
    saveUninitialized: false,
    cookie:{
        expires:6000000
    }
}))
//------- MOTOR DE PLANTILLAS --------//
app.use(express.static("./src/public"));
app.set("views", "./src/views");
app.set("view engine", ".ejs");

//---------CODIFICACION DE BODY-----//
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

httpServer.listen( port, function () {
    logger.info(`listening on port ${port}`);
}); 

///////////////// WEB SOCKET ////////////////////

io.on('connection', socket => {
    logger.info(`Un cliente se ha conectado:${socket.id.substring(0,4)}`);
    let productos=[];
    let carrito=[]
    
    socket.on('new-product', async (newProduct) => {
        try{
            await productosApi.saveInCollection(newProduct);
            productos = await productosApi.getAll();
            io.sockets.emit('product-refresh', productos);
        }
        catch(err){loggErrorFile.error(err);}
    });

    socket.on('new-prod-carrito', async (newProductCarrito, mail) => {
        try{
            await carritoApi.addPalC(mail,newProductCarrito);
            carrito = await carritoApi.getCarritoById(mail)
            //console.log(carrito)
            io.sockets.emit('carrito-refresh', carrito);
        }
        catch(err){loggErrorFile.error(err);}
    })

    socket.on('carrito-delete-refresh', async (idBorrar, mail)=>{
        try{
            carrito = await carritoApi.deletePById(idBorrar, mail)
        }
        catch(err){loggErrorFile.error(err);}
    })

    socket.on('carrito-delete', async (mail)=>{
        try{
            carrito = await carritoApi.deleteCarritoByMail(mail)
        }
        catch(err){loggErrorFile.error(err);}
    })

    socket.on('carrito-comprar', async (mail)=>{
        try{
            carrito = await carritoApi.getCarritoById(mail)
            let user = await User.find({email: mail})
            console.log("CARRITO Y USER :", carrito[0].productos, user[0].phoneNumber)
            await enviarMailCompra(carrito[0].productos, user)
            await whatsappInformation(carrito[0].productos, user[0])
            await smsInformation(carrito[0].productos, user[0])
            await carritoApi.deleteCarritoByMail(mail)
        }
        catch(err){loggErrorFile.error(err);}
    })
});





