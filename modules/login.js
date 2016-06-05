/**
 * Created by 3dHealth-PC on 6/1/2016.
 */
/**
 * Created by 3dHealth-PC on 6/1/2016.
 */
var express = require('express');
var router = express.Router();
var crypto = require('crypto');

router.post('/', function(req, res){
    var resObj = {status : 'Failed', message : 'Failed due to internal server problem please try again.', body: null};
    try{
        var obj = req.body;
        if(obj.userName && obj.password){

            db.findOne('Users',{ userName: obj.userName }, {}, function(err, userRes){
                try{
                    if(err){
                        log.Logger.error('Err at find user :'+err);
                        res.status(500).json(resObj);
                    }else{
                        if(userRes && userRes.password == obj.password){
                            log.Logger.info('Res of get user :'+JSON.stringify(userRes));
                            crypto.randomBytes(32, function(err, token){
                                try{
                                    if(err){
                                        log.Logger.error('Err at generate token :'+err);
                                        res.status(500).json(resObj);
                                    }else{
                                        if(token){
                                            var role = userRes.role,
                                                isAdmin = role+userRes.isAdmin;
                                            var obj = {userName : userRes.userName, role : role, token : token.toString('hex'), isAdmin : isAdmin};
                                            db.insert('Session', obj, function(err, sessionRes){
                                                try{
                                                    if(err){
                                                        log.Logger.error('Err at insert session :'+err);
                                                        res.status(500).json(resObj);
                                                    }else{
                                                        if(sessionRes){
                                                            res.status(200).json({status : 'Success', message : null, body : obj});
                                                        }
                                                    }
                                                } catch (err){
                                                    log.Logger.error(err.stack);
                                                    res.status(500).json(resObj);
                                                }
                                            });
                                        }else{
                                            res.status(500).json(resObj);
                                        }
                                    }
                                }catch (err){
                                    log.Logger.error(err.stack);
                                    res.status(500).json(resObj);
                                }
                            });
                        }else{
                            res.status(401).json({status : 'Failed', message: 'Invalid credentials', body : null});
                        }
                    }
                }catch (err){
                    log.Logger.error(err.stack);
                    res.status(500).json(resObj);
                }
            });
        }else{
            res.status(200).json({status : 'Failed', message : 'Required parameters messing.'});
        }
    }catch (err){
        log.Logger.error(err.stack);
        res.status(500).json(resObj);
    }
});

router.get('/logout', function(req, res){
    var resObj = {status : 'Failed', message : 'Failed due to internal server problem please try again.'};
   try{
       var token = req.headers.authorization;
       if(token){
           db.remove('Session', {token : token}, function(err, delRes){
              try{
                  if(err){
                      log.Logger.error('Err at remove session :'+err);
                  }else{
                      log.Logger.info('Res of  remove session :'+delRes);
                      if(JSON.parse(delRes).ok > 0)
                          res.status(200).json({status : 'Success', message : 'Successfully LogOut'});
                      else
                          res.status(200).json({status : 'Failed', message : "Failed to LogOut please try again"});
                  }
              } catch (err){
                  log.Logger.error(err.stack);
                  res.status(500).json(resObj);
              }
           });
       }else{
           res.status(200).json({status: 'Failed', message : 'token is messing'});
       }
   } catch (err){
       log.Logger.error(err.stack);
       res.status(500).json(resObj);
   }
});

module.exports = router;