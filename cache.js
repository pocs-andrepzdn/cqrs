const redis = require('redis');

const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const client = redis.createClient({
  socket: {
    host: REDIS_HOST,
   port: REDIS_PORT
  }
});

client.connect().catch(console.error);

client.on('error', (err) => console.error('Redis Error:', err));

module.exports = client;

