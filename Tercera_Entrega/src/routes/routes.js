import express from 'express';
import "../passport/local-auth.js"
import controller from '../controllers/controllers.js'
import upload from '../controllers/uploadFile.js';
import passport from 'passport';


const router = express.Router();

//----------- AUTENTICADOR --------------//
function isAuthenticated(req, res, next){
    if (req.isAuthenticated()){
            next()
    } else {
            res.redirect('/signup')
    }
}

////////////  RUTAS ////////////////

//----------- Ruta GET '/' ----------------//
router.get('/', isAuthenticated, controller.indexGet)


//----------- Ruta GET POST '/signup' ----------------//
router.get('/signup', controller.singupGet)

router.post('/signup', upload.single("photo"), controller.singupPost,
    passport.authenticate('signup',
        {
        successRedirect: '/login',
        failureRedirect: '/signup',
        passReqToCallback: true,
        })
) 

//----------- Ruta GET POST '/login' ----------------//
router.get('/login', controller.loginGet) 

router.post('/login', controller.loginPost,
    passport.authenticate('login',
            {    
            successRedirect: '/',
            failureRedirect: '/login',
            passReqToCallback: true,
            }) 
)

//----------- Ruta '/logout' ----------------//
router.get('/logout', isAuthenticated, controller.logoutGet)



//----------- Ruta '/productos' ----------------//
router.get('/productos', isAuthenticated, controller.productosGet)


//TO DO: post productos, get carrito, post carrito 



//----------- Ruta '/404 not found' ----------------//
router.use(controller.pageNotFound)


export default router