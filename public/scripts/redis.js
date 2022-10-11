const Redis = require('ioredis');
const util  = require('util')

const  redisClient = new Redis();

function getRedis(value) {
    const syncRedisGet = util.promisify(redisClient.get).bind(redisClient);
    return syncRedisGet(value);
}
function setRedis(key, value){
    const syncRedisSet = util.promisify(redisClient.set).bind(redisClient);
    return syncRedisSet(key, value)
}

module.export = {redisClient, getRedis, setRedis}
