//////////////////////////////////////////////////////////////////////////////////
// Copyright David Wesley Craig 2018, University of Southern California
//////////////////////////////////////////////////////////////////////////////////
const express  = require('express');
const mongoose = require('mongoose');
const compression = require('compression');
const bodyParser   = require('body-parser');
const http = require('http');
const dotenv = require('dotenv');
var debug = require('debug')('ripple:server');
const app      = express();
require('dotenv').config();
var port = normalizePort(process.env.PORT || '3000');

app.set('port', port);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

 // ALLOW CORS (Modify as appropriate)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); 

//////////////////////////////////////////////////////////////////////////////////
 // API  Server
 //////////////////////////////////////////////////////////////////////////////////

var GenesConnection=mongoose.createConnection('mongodb://localhost:' + process.env.MONGODB_PORT + '/' + process.env.MONGODB_DB);
var Schema = mongoose.Schema;
var geneSchema = mongoose.Schema({},{collection: 'gene_info' });
var Gene = GenesConnection.model('gene_info', geneSchema);
function gene(req, res) {
    var mygene=req.params.gene;
    Gene.find({'gene':mygene}, function(err, gene) {
        if (err) { console.log ("error");res.json({})}           
        if (gene) {
            res.json(gene);                 
        } else (res.json({}))                
    });
}; 
app.get('/api/gene/:gene',gene); // Public
//app.get('/api/private/gene/:gene',checkJwt,gene);// Private  
app.use('/api/public',  express.static(__dirname + '/public'));// Misc  
  //////////////////////////////////////////////////////////////////////////////////
 // END API  Server
//////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////
 // JWT  
 //////////////////////////////////////////////////////////////////////////////////
// JWT via Auth0
//if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
//  throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file'
//}
//app.use(cors());
//const checkJwt = jwt({
//  secret: jwksRsa.expressJwtSecret({
//    cache: true,
//    rateLimit: true,
//    jwksRequestsPerMinute: 5,
//    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
//  }),
//  audience: process.env.AUTH0_AUDIENCE,
//  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
//  algorithms: ['RS256']
//});
//app.get('/api/private/gene/:gene',checkJwt,gene);// Private  
  //////////////////////////////////////////////////////////////////////////////////
 // END JWT  Server
//////////////////////////////////////////////////////////////////////////////////

/** Create  server.*/
app.use(compression()); 
app.set('port', port);
var server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
console.log('ITG RESTful API server started on: ' + port);

/** Event listeners for HTTP  */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) { return val;}
  if (port >= 0) {return port;}
  return false;
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

