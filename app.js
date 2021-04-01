const express = require('express');
const { Sequelize } = require('sequelize');
const morgan = require('morgan');
const models = require('./models');
const config = require("./config");
//const rutamarcas = require('./api/recursos/marca/marca.router');


const logger = require("./helpers/logger");
const errorHandler = require('./api/libs/errorHandler');


const app = express();
//configuracion basica de express
app.use(express.urlencoded({ extended: true }));
app.use(express.raw({type:'image/*' , limit:'20mb'})); 
app.use(express.json());


app.use((req, res, next) => {
    //res.header("Access-Control-Allow-Origin", `${C.PROTOCOL}://${C.DOMAIN}:${C.PORT}`);
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    //res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
//configuracion del log con morgan y winston
app.use(morgan('short', {
    stream: {
        write: message => logger.info(message.trim())
    }
}));


//definicion de las rutas del api

//app.use('/api/marca', rutamarcas);

if (config.ambiente == "prod") {
    app.use(errorHandler.erroresEnProduccion);
} else {
    app.use(errorHandler.erroresEnDesarrollo);
}

app.get('/', (req, res) => {
    res.send('hola mundo desde express');
});


const server = app.listen(config.puerto, () => {
    logger.info("escuchando en el puerto: " + config.puerto);
    models.sequelize.sync({ force: false }).then(function () {
        logger.info("Conexion a base de datos correcta");
    });
});

module.exports = {
    app, server
}



//npx sequelize-cli model:generate --name Grupo --attributes nombre:string
//npx sequelize-cli db:migrate
//npx sequelize-cli db:migrate:undo
//npx sequelize-cli seed:generate --name estado-productoseed
//npx sequelize-cli db:seed:all
//npm install --save-dev sequelize-cli