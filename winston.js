var winston = require('winston');
var Elasticsearch = require('winston-elasticsearch');

// define the custom settings for each transport (file, console)
var options = {
  file: {
    level: 'info',
    filename: `./Helloworld/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

// instantiate a new Winston Logger with the settings defined above
var esTransportOpts = {
    level: 'debug',
    clientOpts: { node: 'http://your IP Address:9200'}
    };
var logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
    new Elasticsearch(esTransportOpts)
  ],
  exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  },
};

module.exports = logger;
