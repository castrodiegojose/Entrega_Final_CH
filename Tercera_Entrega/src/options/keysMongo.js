import dotenv from 'dotenv';
dotenv.config();

const key =  {
    port: process.env.PORT || 8080,
    TIPO_DB: process.env.TIPO_DB,
    mongoUrl:`mongodb+srv://${process.env.MONGOATLAS_USER}:${process.env.MONGOATLAS_PASS}@cluster0.dcufv.mongodb.net/${process.env.MONGOATLAS_DB}?retryWrites=true&w=majority` || "mongodb://127.0.0.1:27017/mibase"
}
export default key