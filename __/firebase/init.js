const express = require('express');
const https = require ('https');
const fs = require ('fs');
const firebaseConfig = require('./firebaseConfig.js');

const app = express();
const options ={
   key: fs.readFileSync('config\python\Python312\Lib\test\certdata\ssl_key.pem'),
   cert: fs.readFileSync('config\python\Python312\Lib\test\certdata\keycert.pem'),
};
const server = https.createServer(options, app);

const admin = require('firebase-admin');
admin.initializeApp({
   crediential: admin.credential.cert(firebaseConfig),
});

const PORT_HTTP = 5000;
const PORT_HTTPS = 443;

server.listen(PORT_HTTPS, () => {
   console.log('HTTPS Server is runnign on port ${PORT_HTTPS');
});
const http = require('http');
http.createServer((req, res) => {
   res.writeHead(301, { "Location": `https://${req.headers['host']}${req.url}` });
   res.end();
}).listen(PORT_HTTP, () => {
   console.log('HTTP service is running on port ${PORT_HTTP');
})
//#region {
listen;
5000;
listen;
443;
ssl;
server_name;
'pdubbssolutions';
'https://pdubbs-final.web.app;'

SSL;
certificate;
config;
for (HTTPS; ;);
