const express = require('express')
const app = express();
const productosRouter = require('./routers/productos');
const carritoRouter = require('./routers/carrito');
const port = (process.env.PORT || 8080)



app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/api/productos', productosRouter);
app.use('/api/carrito', carritoRouter);

app.listen(port,() => {console.log(`corriendo en puerto ${port}`)})
app.on("error", (err) => console.log("Error en el servidor", err));