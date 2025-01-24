const Log = require('../dbModel/logs/schema')
// Middleware function to log request details
const requestLogger = async (req, res, next) => {
  const start = Date.now()
  // Listen for the 'finish' event on the response to determine when the response has been sent
  res.on('finish', async () => {
    const duration = Date.now() - start
    // Create a new log entry with relevant request data
    const log = new Log({
      method: req.method, // HTTP method used (GET, POST, etc.)
      url: req.originalUrl, // URL of the request
      status: res.statusCode, // HTTP status code of the response
      responseTime: duration, // Duration of the request in milliseconds
      headers: req.headers, // Headers sent with the request
      body: req.body, // Body of the request (for POST/PUT requests)
    })

    try {
      await log.save()
    } catch (error) {
      console.error('Error saving log:', error.message) // Log any errors that occur while saving
    }
  })

  next() // Proceed to the next middleware or route handler
}

module.exports = requestLogger
