import multer from "multer";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
    destination: path.join( __dirname, '../public/avatars'),
    filename:function(req,file,cb){
        cb(null, Date.now() + "-" + file.originalname)
    }   
})

const upload = multer({
    storage,    
    dest:path.join( __dirname, '../public/avatars')
})

export default upload;