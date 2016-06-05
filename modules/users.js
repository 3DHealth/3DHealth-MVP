/**
 * Created by 3dHealth-PC on 21-05-2016.
 */

var express = require('express');
var router = express.Router();

router.post('/', function(req, res){
    var resObj = {status : 'Failed', message : 'Failed due to internal server problem please try again.'};
    try{
        var obj = req.body;
        if(obj.name && obj.age && obj.mobile && obj.emailId && obj.userName && obj.password &&
            obj.qualification && obj.specialization && obj.organization && obj.role && obj.status && obj.isAdmin){

            db.findOne('Users',{ userName: obj.userName }, {}, function(err, userRec){
                try{
                    if(err){
                        log.Logger.error('Err at find User :'+err);
                        res.status(500).json(resObj);
                    }else{
                        if(userRec){
                            log.Logger.info('User already exists :'+JSON.stringify(userRec));
                            res.status(409).json({ status : 'Failed', message : 'User name already exits.'});
                        }else{
                            var user = {
                                name : obj.name,
                                age : obj.age,
                                mobile : obj.mobile,
                                emailId : obj.emailId,
                                userName : obj.userName,
                                password : obj.password,
                                qualification : obj.qualification,
                                specialization : obj.specialization,
                                organization : [obj.organization],
                                role : obj.role,
                                status : obj.status,
                                ísAdmin : obj.isAdmin
                            };
                            db.insert('Users', user, function(err, dbRes){
                                try{
                                    if(err){
                                        log.Logger.error('Err at insert Users :'+err);
                                        res.status(500).json(resObj);
                                    }{
                                        log.Logger.info('Res of insert User :'+JSON.stringify(dbRes));
                                        if(dbRes)
                                            res.status(201).json({status : 'Success', message : 'Successfully created.'});
                                        else
                                            res.status(200).json({status : 'Failed', message : 'Failed to created.'});
                                    }
                                }catch (err){
                                    log.Logger.error(err.stack);
                                    res.status(500).json(resObj);
                                }
                            });
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
router.put('/:id', function(req, res){
    var resObj = {status : 'Failed', message : 'Failed due to internal server problem please try again.'};
    try{
        var obj = req.body;
        if(req.params.id && obj.name && obj.age && obj.mobile && obj.emailId && obj.status && obj.isAdmin &&
            obj.qualification && obj.specialization && obj.organization && obj.role){
            var user = {
                name : obj.name,
                age : obj.age,
                mobile : obj.mobile,
                emailId : obj.emailId,
                qualification : obj.qualification,
                specialization : obj.specialization,
                organization : obj.organization,
                role : obj.role,
                status : obj.status,
                ísAdmin : obj.isAdmin,
                updateTime : lib.getTimeStamp(new Date())
            };
            var id = obj._id;
            db.update('Users', {_id : ObjectID(req.params.id)}, {$set : user}, function(err, dbRes){
                try{
                    if(err){
                        log.Logger.error('Err at insert Users :'+err);
                        //res.status(500).json(resObj);
                    }{
                        log.Logger.info('Res of update User :'+JSON.stringify(dbRes));
                        if(JSON.parse(dbRes).nModified > 0){
                            res.status(200).json({status : 'Success', message : 'Successfully modified.'});
                        }else{
                            res.status(200).json({status : 'Failed', message : 'Failed to modified.'});
                        }
                        /*    if(dbRes.nMatched > 0){
                         if(dbRes.nUpserted > 0)
                         res.status(200).json({status : 'Success', message : 'Successfully modified.'});
                         else
                         res.status(200).json({status : 'Failed', message : 'Failed to modified.'});
                         }else
                         res.status(404).json({status : 'Failed', message : 'Failed to modified.'});*/
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

router.get('/', function(req, res){
    var resObj = {status : 'Failed', message : 'Failed due to internal server problem please try again.', body : null};
    try{
        var id = req.query.id;
        if(id){
            db.findOne('Users', { _id : ObjectID(id)}, {}, function(err, dbRes){
                try{
                    if(err){
                        log.Logger.error('Err at find User :'+err);
                        res.status(500).json(resObj);
                    }else{
                        log.Logger.debug('Res of find User :'+JSON.stringify(dbRes));
                        if(dbRes)
                            res.status(200).json({status : 'Success', message : null, data : dbRes});
                        else
                            res.status(404).json({status : 'Failed', message : "No record found", data : null});
                    }
                }catch (err){
                    log.Logger.error(err.stack);
                    res.status(500).json(resObj);
                }
            });
        }else{
            res.status(200).json({status : 'Failed', message : 'Id messing.', body : null});
        }
    }catch (err){
        log.Logger.error(err.stack);
        res.status(500).json(resObj);
    }
});

router.delete('/:id', function(req, res){
    var resObj = {status : 'Failed', message : 'Failed due to internal server problem please try again.'};
    try{
        var id = req.params.id;
        if(id){
            db.remove('Users' ,{ _id : ObjectID(id)}, function(err, dbRes){
                try{
                    if(err){
                        log.Logger.error('Err at find User :'+err);
                        res.status(500).json(resObj);
                    }else{
                        log.Logger.debug('Res of User delete :'+dbRes);
                        if(JSON.parse(dbRes).ok > 0)
                            res.status(200).json({status : 'Success', message : 'Successfully deleted'});
                        else
                            res.status(404).json({status : 'Failed', message : "No record found"});
                    }
                }catch (err){
                    log.Logger.error(err.stack);
                    res.status(500).json(resObj);
                }
            });
        }else{
            res.status(200).json({status : 'Failed', message : 'Id messing.'});
        }
    }catch (err){
        log.Logger.error(err.stack);
        res.status(500).json(resObj);
    }
});

// GET /shoes?order=desc&shoe[color]=blue&shoe[type]=converse
router.get('/all', function(req, res){
    var resObj = {status : 'Failed', message : 'Failed due to internal server problem please try again.', body : null};
    try{
        var queryObj = req.query.obj;
        var query = (queryObj)?queryObj:{};
        db.findAll('Users', query, {}, null, null, function(err, dbRes){
            try{
                if(err){
                    log.Logger.error('Err at get Users :'+err);
                    res.status(500).json(resObj);
                }else{
                    log.Logger.debug('Res of findAll Users :'+JSON.stringify(dbRes));
                    res.status(200).json({status : 'Success', message : null, data : dbRes});
                }
            }catch (err){
                log.Logger.error(err.stack);
                res.status(500).json(resObj);
            }
        });
    }catch (err){
        log.Logger.error(err.stack);
        res.status(500).json(resObj);
    }
});
module.exports = router;