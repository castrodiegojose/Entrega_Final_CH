import express from 'express';
import "../passport/local-auth.js"
import User from '../models/user.model.js';
import { Controller } from '../controllers/controllers.js'
import { promisify } from 'util'
import upload from '../controllers/uploadFile.js';
import passport from 'passport';
import jwt from 'jsonwebtoken'

const controller = new Controller();

const router = express.Router();

//----------- AUTENTICADOR --------------//
async function isAuthenticated (req, res, next){
        if(!req.cookies.jwt){
                res.status(400)
                .clearCookie('jwt')
                .redirect('/login')
        } else {
                try{
                        const deco = await promisify(jwt.verify)(req.cookies.jwt, process.env.ACCESS_TOKEN_SECRET)
                        const userExist = await User.findOne({email: deco.user})
                        if(!userExist) {
                                res.status(403)
                                .clearCookie('jwt')
                                .redirect('/login')
                                }
                        else {
                                return next() }
                }catch(err){
                        res.status(400)
                        .clearCookie('jwt')
                        .redirect('/login')
                } 
        }
}

////////////  RUTAS ////////////////

//----------- Ruta GET '/' ----------------//
router.get('/', isAuthenticated, controller.indexGet)


//----------- Ruta GET POST '/signup' ----------------//
router.get('/signup', controller.singupGet)

router.post('/signup', upload.single("photo"), 
        passport.authenticate('signup',
        {
        successRedirect: '/login',
        failureRedirect: '/signup',
        passReqToCallback: true,
        }),
        controller.singupPost,
) 

//----------- Ruta GET POST '/login' ----------------//
router.get('/login', controller.loginGet) 

// router.post('/login', controller.loginPost)
router.post('/login', 
        passport.authenticate('login',
            {    
            // successRedirect: '/',
            failureRedirect: '/login',
            passReqToCallback: true,
            }),
        controller.loginPost,
)

//----------- Ruta '/logout' ----------------//
router.get('/logout', isAuthenticated, controller.logoutGet)

//----------- Ruta '/productos' ----------------//
router.get('/productos', isAuthenticated, controller.productosGet)

router.post('/productos', isAuthenticated, controller.productosPost)

router.delete('/productos/:id', isAuthenticated, controller.productosDelete)

//----------- Ruta '/carrito' ----------------//
router.post('/carrito/:mail', isAuthenticated, controller.carritoPost);

router.delete('/carrito/:mail', isAuthenticated, controller.carritoDelete)

router.put('/carrito/borrarprod/:mail', isAuthenticated, controller.carritoProdDelete)

router.post('/carrito/comprarcarrito/:mail', isAuthenticated, controller.carritoComprar)

//------------ Ruta '/chat' --------------//
router.get('/chat', isAuthenticated, controller.chatGet)

//----------- Ruta '/404 not found' ----------------//
router.use(controller.pageNotFound)


export default router