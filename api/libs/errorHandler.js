const log = require("../../helpers/logger");


exports.procesarErrores =(fn) =>{
    return function (req,res,next){
        fn(req,res,next).catch(next);
    }
}

exports.procesarErroresDeBd = (err,req,res,next)=>{
   //codigo para procesar errores
}
exports.procesarErroresDeTamañoDeBody= (err,req,res,next)=>{
    if(err.status===413){
        log.error("Request enviada a la ruta "+req.path+" excedio el limite del tamaño, request no sera procesado");
        err.message="Sobrepasa el limite del tamaño , el limite permitido es "+err.limit+" bytes";
        next(err);
    }
}

exports.erroresEnProduccion = (err,req,res,next)=>{
    res.status(err.status || 500);
    res.send({
        message:err.message
    })
}
exports.erroresEnDesarrollo = (err,req,res,next)=>{
    res.status(err.status || 500);
    res.send({
        message:err.message,
        stack: err.stack || ''
    })
}