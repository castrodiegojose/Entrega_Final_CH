import productosApi from '../services/mongoProductos.js'
import carritoApi from '../services/mongoCarrito.js'
import "../passport/local-auth.js"
import {logger, loggWarningFile, loggErrorFile} from '../utils/logger.js'


const controller = {};

controller.indexGet = async (req, res) => { 
    let user = req.user.email
    console.log(user)
    //await carritoApi.primerCarrito(user)
    const productos = await productosApi.getAll()
    const carrito = await carritoApi.testCarritoExist(user)
    console.log("este es el elemento", carrito)
    res.render('index', {productos, carrito, user})    
}

controller.singupGet = async (req, res, next) => {
    logger.info(`Ruta ${req.url} y Metodo ${req.method}`)
    res.render('signup')
}

controller.singupPost = async (req, res, next) => {
    console.log(req.file)
    logger.info(`Ruta ${req.url} y Metodo ${req.method}`);
    next();
 }


controller.loginGet = async (req, res) => {
    res.render('login')
}

controller.loginPost = async (req, res, next) => {
    logger.info(`Ruta ${req.url} y Metodo ${req.method}`);
    next();
    }


controller.logoutGet = async (req, res) => {
        logger.info(`Ruta ${req.url} y Metodo ${req.method}`);
        let user = req.user.email  
        req.session.destroy(err=>{
            if (!err) {
                res.render('logout', {user});
            }
            else res.send({status: 'Logout ERROR', body: err});        
        })
    }
    
controller.productosGet = async (req,res) => {
    try{
        let user = req.user.email
        const productos = await productosApi.getAll()
        res.render('productos', {productos,user})
    }
    catch (error){loggErrorFile.error(err);}  
}

controller.pageNotFound = (req, res, next) => {
    loggWarningFile.warn(`Ruta ${req.url} y Metodo ${req.method} no establecido`)
    res.status(404).render('error-notfound')
}


// export {userMail, controller}
export default controller;