/**
 * Created by Sudhir on 21-05-2016.
 */
try{
    var winston = require('winston');

    winston.loggers.add('Logger', {
        console: {
            level: 'silly',
            colorize: true,
            label: '3DHLog'
        },
        file: {
            filename: 'F:\\Naresh\\3DHealth-MVP\\log\\3DHLog'
        }
    });
    var Logger = exports.Logger = winston.loggers.get('Logger');
}catch (err){
    console.log(err.stack);
}
//module.exports = log;