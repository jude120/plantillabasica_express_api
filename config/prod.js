require('dotenv').config();
module.exports={
    jwt:{
        secreto: process.env.JWTSECRET,
        tiempoExpiracion: process.env.JWTTIMEEXPIRATION
    },
    origin: process.env.CORS_ORIGIN_PROD,
    
}