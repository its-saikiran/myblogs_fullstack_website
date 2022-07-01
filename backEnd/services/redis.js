const redis = require('redis')

const redisClient = redis.createClient({
    host: 'localhost',
    port: 6379
})

redisClient.connect();
redisClient.on('connect', () => console.log('connected.'))
redisClient.on('error', (err) => console.log('redis client error:', err))

module.exports = redisClient;