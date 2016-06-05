var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

global.mongoDb = "";
global.log = require('./config/logger');
global.config = require('config');
global.lib = require('./core/3Dlib');
global.db = require('./db/mongoApis');
const roles = {
    'Doctor' : {users : ['GET'], clinics : ['GET']},
    'DoctorYes' : {users : ['GET', 'POST', 'PUT', 'DELETE'], clinics : ['GET']}
};
db.connectToDb();
global.ObjectID = require('mongodb').ObjectID;
var users = require('./modules/users'),
    clinics = require('./modules/clinics'),
    login = require('./modules/login');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.all('*', function(req, res, next) {
   try{
       res.header("Access-Control-Allow-Origin", "*");
       res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
       res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
       if ('OPTIONS' == req.method){
           return res.send(200);
       }
       if(req.path != '/login'){
           var authorization = req.headers.authorization;
           if(!authorization){
               res.status(401).json({status : 'Failed', message : 'Authorization problem try again'});
           }else{
               db.findOne('Session', {token : authorization}, {}, function(err, authRes){
                  try{
                      if(err){
                          log.Logger.error('Err at get session :'+err);
                          res.status(500).json({status : 'Failed', message : 'Failed due to internal server problem please try again.'});
                      }else{
                          log.Logger.info('Res of session :'+JSON.stringify(authRes));
                          if(authRes){
                              req.body['sessionObj'] = authRes;
                              next();
                          }else{
                              res.status(401).json({status : 'Failed', message : 'Authorization problem try again'});
                          }
                      }
                  } catch (err){
                      log.Logger.error(err.stack);
                      res.status(500).json({status : 'Failed', message : 'Failed due to internal server problem please try again.'});
                  }
               });
           }
       }
       else
           next();
   }catch (err){
       log.Logger.error(err.stack);
       res.status(500).json({status : 'Failed', message : 'Failed due to internal server problem please try again.'});
   }
});

app.use(function(req, res, next){
    try{
        var reqObj = req.body.sessionObj,
            reqPath = req.path.split("/")[1],
            resObj = {status : 'Failed', message : 'Account you have currently logged in as does not have permission to perform the action you are attempting'};
        if(reqObj){
            var role = reqObj.role;
            if(role != 'Admin' && reqPath != 'login'){
                if(roles[role].hasOwnProperty(reqPath)){
                    if(roles[role][reqPath].indexOf(req.method) < 0){
                        res.status(550).json(resObj);
                    }else{
                        next();
                    }
                }else{
                    res.status(550).json(resObj);
                }
            }else{
                next();
            }
        } else if(reqPath == 'login'){
            next();
        }else{
            res.status(401).json({status : 'Failed', message : 'Authorization problem try again'});
        }
    }catch (err){
        log.Logger.error(err.stack);
        res.status(500).json({status : 'Failed', message : 'Failed due to internal server problem please try again.'});
    }

});

app.use('/users', users);
app.use('/clinics', clinics);
app.use('/login', login);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
    res.send({
        message: err.message,
        error: err
    });
});

var port = config.serverPort;
app.set('port', port);
var server = http.createServer(app);
server.listen(port);

module.exports = app;
