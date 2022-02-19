const ambiente = process.env.NODE_ENV || 'development';
require('dotenv').config();
const configuracionBase ={
    jwt:{},
    puerto:process.env.PUERTO,
    suprimirlogs:process.env.LOGS ==='true' || process.env.LOGS ==='TRUE' ? true:false,
    user_swagger:process.env.USER_SWAGGER,
    userpass_swagger:process.env.USERPASS_SWAGGER
};
let configuracionDeAmbiente ={};

switch(ambiente){
    case 'desarrollo':
    case 'dev':
    case 'development':
        configuracionDeAmbiente = require('./dev');
        break;
    case 'produccion':
    case 'prod':
        configuracionDeAmbiente = require('./prod');
        break;
    case 'test':
        configuracionDeAmbiente= require('./test');
        break;
    default:
        configuracionDeAmbiente = require('./dev');
}
module.exports = {
    ...configuracionBase,
    ...configuracionDeAmbiente
}