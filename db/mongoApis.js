/**
 * Created by Sudhir on 21-05-2016.
 */
try{
    var dbObj = { db : null};

    exports.connectToDb = function(){
        var mongodb = require('mongodb');
        var MongoClient = mongodb.MongoClient;
        try{
            var dbUrl = config.dbUrl;

            MongoClient.connect(dbUrl, function(err, db) {
                if(err) {
                    log.Logger.error('Failed to connect DB :'+err);
                }else{
                    try{
                        dbObj.db  = db;
                        log.Logger.info("DB connected on :"+dbUrl);
                    }catch (err){
                        log.Logger.error(err.stack);
                    }
                }
            });
        }catch (err){
            log.Logger.error(err.stack);
        }
    }

    function getCollection(name){
        try{
            return dbObj.db.collection(name);
        }catch (err){
            log.Logger.error(err.stack);
            return null;
        }
    };

    exports.insert = function(name, doc, callback){
        try{
            var collection = getCollection(name);
            if(collection){
                doc.createTime = lib.getTimeStamp(new Date());
                //log.Logger.debug('Insert '+name+' doc :'+JSON.stringify(doc));
                //collection.insert(doc, {w:1}, callback);
                collection.insert(doc, callback);
            }else{
                callback('Filed to get collection :'+name, null);
            }
        }catch (err){
            log.Logger.error(err.stack);
            callback('Failed to insert document', null);
        }
    };

    exports.update = function(name, query, doc, callback){
        try{
            var collection = getCollection(name);
            if(collection){
                log.Logger.debug('Update query :'+JSON.stringify(query));
                log.Logger.debug('Update '+name+' doc :'+JSON.stringify(doc));
                collection.update(query, doc, {multi :true}, callback);
            }else{
                callback('Failed to get collection :'+name, null);
            }
        }catch (err){
            log.Logger.error(err.stack);
            callback('Failed to update document', null);
        }
    };

    exports.findOne = function(name, query, projection, callback){
        try{
            var collection = getCollection(name);
            if(collection){
                log.Logger.debug('FindOne '+name+' query :'+JSON.stringify(query));
                collection.findOne(query, projection, callback);
            }else{
                callback('Failed to get collection :'+name, null);
            }
        }catch (err){
            log.Logger.error(err.stack);
            callback('Failed to get document', null);
        }
    };

    exports.findAll = function(name, query, projection, limit, offset, callback){
        try{
            var collection = getCollection(name);
            if(collection){
                log.Logger.debug('FindAll '+name+' query :'+JSON.stringify(query));
                var data = collection.find(query, projection);
                if(limit && offset){
                    data = data.skip(offset).limit(limit);
                }else if(limit){
                    data = data.limit(limit);
                }else if(offset){
                    data = data.skip(offset);
                }
                data.toArray(callback);
            }else{
                callback('Failed to get collection :'+name, null);
            }
        }catch (err){
            log.Logger.error(err.stack);
            callback('Failed to get all document', null);
        }
    };

    exports.remove = function(name, query, callback){
        try{
            var collection = getCollection(name);
            if(collection){
                log.Logger.info('Remove '+name+' query:'+JSON.stringify(query));
                collection.remove(query, callback);
            }else{
                callback('Failed to get collection :'+name, null);
            }
        }catch (err){
            log.Logger.error(err.stack);
            callback('Failed to remove document', null);
        }
    };

}catch(err){
    log.Logger.error(err.stack);
}