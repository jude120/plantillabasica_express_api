require('dotenv').config();
module.exports={
    jwt:{
        secreto: process.env.JWTSECRET,
        tiempoExpiracion: process.env.JWTTIMEEXPIRATION
    },
    suprimirlogs:process.env.LOGS,
    origin: process.env.CORS_ORIGIN_TEST
}