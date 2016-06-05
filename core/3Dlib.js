/**
 * Created by Sudhir on 21-05-2016.
 */
try{
    exports.getTimeStamp = function(date){
        try{
            return Math.round(date.getTime()/1000);
        }catch (err){
            log.Logger.error(err.stack);
            return null;
        }
    };
}catch (err){
    log.Logger.error(err.stack);
}