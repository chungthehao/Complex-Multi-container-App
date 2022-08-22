// Importing
const keys = require('./keys')
const redis = require('redis')

// Creating redis client, set up the connection
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
})
const sub = redisClient.duplicate()

// Calculating function
const fib = index => {
  if (index < 2) return 1
  return fib(index - 1) + fib(index - 2)
}

// Watching the new coming index in Redis
sub.on('message', (channel, message) => {
  redisClient.hset('values', message, fib(parseInt(message)))
})
sub.subscribe('insert')