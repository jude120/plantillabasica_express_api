const express = require('express');
const { Sequelize } = require('sequelize');
const morgan = require('morgan');
const models = require('./models');
const config = require("./config");
const cors = require('cors');
//const rutamarcas = require('./api/recursos/marca/marca.router');
const localizacion_routes_swagger=[
  //  './api/recursos/marca/marca.router.js',
];


const logger = require("./helpers/logger");
const errorHandler = require('./api/libs/errorHandler');

//swagger
const basicAuth = require('express-basic-auth');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

//cors 

const corsOptions = {
  origin:  [config.origin],
  methods:'GET, POST, OPTIONS, PUT, DELETE',
  allowedHeaders:'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method',
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};


const app = express();
//configuracion basica de express
app.use(express.urlencoded({ extended: true }));
app.use(express.raw({type:'image/*' , limit:'20mb'})); 
app.use(express.json());
/* Configuracion de swagger para autodocumentacion */
// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        version: "1.0.0",
        title: "Nabelle API",
        description: "Documentación del API de Nabelle",
        contact: {
          name: "Nabelle Admin",
          email: "",
        },
      },
      servers: [
        {
          url: "http://localhost:"+config.puerto,
          description: 'Url de la Api de desarrollo',
        },
      ],
    },
    // ['.routes/*.js']
    apis: localizacion_routes_swagger
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  const usersw =config.user_swagger;
  const userswpass =config.userpass_swagger;
  app.use("/api/api-docs",basicAuth({
    users: {usersw : userswpass},
    challenge: true,
  }), swaggerUi.serve, swaggerUi.setup(swaggerDocs, { explorer: true }));
//configurar CORS  
app.use(cors(corsOptions));


/*app.use((req, res, next) => {
    //res.header("Access-Control-Allow-Origin", `${C.PROTOCOL}://${C.DOMAIN}:${C.PORT}`);
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    //res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});*/
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