const winston = require('winston');
const config = require('../config');
/*
niveles de error:
    error: 0
    warn: 1
    info: 2
    verbose: 3
    debug 4
    silly; 5
*/
const incluirfecha = winston.format((info)=>{
    info.message= new Date().toISOString()+' | '+info.message;
    return info;
})

module.exports = winston.createLogger({
    transports:[
        new winston.transports.Console({
            level: config.suprimirlogs ? 'error':'silly',
            handleExceptions:true,
            format:winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            level:'silly',
            handleExceptions: true,
            format: winston.format.combine(
                incluirfecha(),
                winston.format.simple()
            ),
            maxsize: 5120000,   // 5MB
            maxFiles:5,
            filename: __dirname+'/../log/logs-de-aplicacion.log'
        })
    ]
});