const { Redis } = require('ioredis');
const { promisify } = require('util')

const redisClient = new Redis();

const getRedis = (value) => {
    const syncRedisGet = promisify(redisClient.get).bind(redisClient);
    return syncRedisGet(value);
}

const setRedis = (key, value) => {
    const syncRedisGet = promisify(redisClient.set).bind(redisClient);
    return syncRedisGet(key, value);
}

module.exports = { redisClient, getRedis, setRedis };