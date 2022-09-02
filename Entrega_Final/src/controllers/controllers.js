import productosApi from '../services/mongoProductos.js'
import carritoApi from '../services/mongoCarrito.js'
import User from '../models/user.model.js';
import jwt from "jsonwebtoken";
import "../passport/local-auth.js"
import { enviarMailCompra } from '../utils/nodeMailer.js';
import { smsInformation, whatsappInformation } from '../utils/twilio.js';
import {logger, loggWarningFile, loggErrorFile} from '../utils/logger.js'
import classSqLite from '../services/classDB.js';


export class Controller {

    async indexGet(req, res){ 
        let user = req.user.email
        const productos = await productosApi.getAll()
        const carrito = await carritoApi.testCarritoExist(user)
        res.render('index', {productos, carrito, user})    
    }

    async singupGet(req, res, next){
        logger.info(`Ruta ${req.url} y Metodo ${req.method}`)
        res.render('signup')
    }

    async singupPost(req, res, next){
        logger.info(`Ruta ${req.url} y Metodo ${req.method}`);
        next();
    }


    async loginGet(req, res){
        res.render('login')
    }

    async loginPost(req, res){
        logger.info(`Ruta ${req.url} y Metodo ${req.method} | body ${req.body.email}`);
            const token = jwt.sign({ user: req.body.email }, process.env.ACCESS_TOKEN_SECRET || 'top_secret', { expiresIn: process.env.JWT_COOKIE_EXPIRES });
            res.cookie('jwt', token)
            res.status(200).redirect('/')
        }


    async logoutGet (req, res){
            logger.info(`Ruta ${req.url} y Metodo ${req.method}`);
            let user = req.user.email  
            await carritoApi.deleteCarritoByMail(user)
            req.session.destroy(err=>{
                if (!err) {
                    res.clearCookie('jwt').render('logout', {user});
                }
                else res.send({status: 'Logout ERROR', body: err});        
            })
        }
        
    async productosGet(req,res){
        logger.info(`Ruta ${req.url} y Metodo ${req.method}`);
        try{
            let user = req.user.email
            const productos = await productosApi.getAll()
            res.render('productos', {productos,user})
        }
        catch (error){loggErrorFile.error(err);}  
    }

    async productosPost(req,res){
        logger.info(`Ruta ${req.url} y Metodo ${req.method}`);
        try{
            let newProduct = req.body
            await productosApi.saveInCollection(newProduct);
        }
        catch (error){loggErrorFile.error(err);}  
    }

    async productosDelete(req,res){
        logger.info(`Ruta ${req.url} y Metodo ${req.method}`);
        try{
            let idDelete = req.params.id
            await productosApi.deleteById(idDelete);
        }
        catch (error){loggErrorFile.error(err);}  
    }

    async carritoPost(req,res){
        logger.info(`Ruta ${req.url} y Metodo ${req.method}`);
        try{
            let newProductCarrito = req.body
            let mail = req.params.mail
            await carritoApi.addPalC(mail, newProductCarrito);
        }
        catch (error){loggErrorFile.error(err);}  
    }

    async carritoProdDelete(req,res){
        logger.info(`Ruta ${req.url} y Metodo ${req.method}`);
        let id = req.body
        let mail = req.params.mail
        try{
            await carritoApi.deletePById(id.id, mail);
        }
        catch (error){loggErrorFile.error(err);}  
    }

    async carritoDelete(req,res){
        logger.info(`Ruta ${req.url} y Metodo ${req.method}`);
        let mail = req.params.mail
        try{
            await carritoApi.deleteCarritoByMail(mail)
        }
        catch (err){loggErrorFile.error(err);}  
    }

    // TODO Enviar toda la logica al Service 
    async carritoComprar(req,res){
        logger.info(`Ruta ${req.url} y Metodo ${req.method}`);
        let mail = req.params.mail
        try{
            const carrito = await carritoApi.getCarritoById(mail)
            let user = await User.find({email: mail})
            await enviarMailCompra(carrito[0].productos, user)
            await whatsappInformation(carrito[0].productos, user[0])
            await smsInformation(carrito[0].productos, user[0])
            await carritoApi.deleteCarritoByMail(mail)
        }
        catch (err){loggErrorFile.error(err);}  
    }

    async chatGet(req, res){
        let user = req.user.email
        const mensajes = await classSqLite.getAllMessages()
        res.render('chat', {mensajes, user})  
    }

    async pageNotFound (req, res, next){
        loggWarningFile.warn(`Ruta ${req.url} y Metodo ${req.method} no establecido`)
        res.status(404).render('error-notfound')
    }
}