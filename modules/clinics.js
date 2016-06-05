/**
 * Created by 3dHealth-PC on 6/1/2016.
 */
var express = require('express');
var router = express.Router();

router.post('/', function(req, res){
    var resObj = {status : 'Failed', message : 'Failed due to internal server problem please try again.'};
    try{
        var obj = req.body;
        if(obj.name && obj.details && obj.accountStatus){

            db.findOne('Clinics',{ name: obj.name }, {}, function(err, clinicRec){
                try{
                    if(err){
                        log.Logger.error('Err at find Clinic :'+err);
                        res.status(500).json(resObj);
                    }else{
                        if(clinicRec){
                            log.Logger.info('Clinic already exists :'+JSON.stringify(clinicRec));
                            res.status(409).json({ status : 'Failed', message : 'Clinic name already exits.'});
                        }else{
                            var clinic = {
                                name : obj.name,
                                details : obj.details,
                                accountStatus : obj.accountStatus
                            };
                            db.insert('Clinics', clinic, function(err, dbRes){
                                try{
                                    if(err){
                                        log.Logger.error('Err at insert Clinic :'+err);
                                        res.status(500).json(resObj);
                                    }{
                                        log.Logger.info('Res of insert Clinic :'+JSON.stringify(dbRes));
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
        if(req.params.id && obj.name && obj.details && obj.accountStatus){
            var clinic = {
                name : obj.name,
                details : obj.details,
                accountStatus : obj.accountStatus
            };
            db.update('Clinics', {_id : ObjectID(req.params.id)}, {$set : clinic}, function(err, dbRes){
                try{
                    if(err){
                        log.Logger.error('Err at insert Clinic :'+err);
                        //res.status(500).json(resObj);
                    }{
                        log.Logger.info('Res of update Clinic :'+JSON.stringify(dbRes));
                        if(JSON.parse(dbRes).nModified > 0){
                            res.status(200).json({status : 'Success', message : 'Successfully modified.'});
                        }else{
                            res.status(200).json({status : 'Failed', message : 'Failed to modified.'});
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

router.get('/', function(req, res){
    var resObj = {status : 'Failed', message : 'Failed due to internal server problem please try again.', body : null};
    try{
        var id = req.query.id;
        if(id){
            db.findOne('Clinics', { _id : ObjectID(id)}, {}, function(err, dbRes){
                try{
                    if(err){
                        log.Logger.error('Err at find Clinic :'+err);
                        res.status(500).json(resObj);
                    }else{
                        log.Logger.debug('Res of find Clinic :'+JSON.stringify(dbRes));
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
            db.remove('Clinics' ,{ _id : ObjectID(id)}, function(err, dbRes){
                try{
                    if(err){
                        log.Logger.error('Err at find Clinic :'+err);
                        res.status(500).json(resObj);
                    }else{
                        log.Logger.debug('Res of Clinic delete :'+dbRes);
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
        db.findAll('Clinics', query, {}, null, null, function(err, dbRes){
            try{
                if(err){
                    log.Logger.error('Err at get Clinics :'+err);
                    res.status(500).json(resObj);
                }else{
                    log.Logger.debug('Res of findAll Clinics :'+JSON.stringify(dbRes));
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