import mongoose from "mongoose";
import key from './options/keysMongo.js';
import { logger, loggErrorFile} from './utils/logger.js';

mongoose.connect(key.mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
})
        .then ((db) => logger.info('Mongo Atlas is connected ☁'))
        .catch (err => loggErrorFile.error(err));