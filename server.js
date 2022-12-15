const http = require('http');
const app = require('./index');

const server = http.createServer(app);

server.listen(app.get('port'), () => {
  console.log(`🔥🔥 Server running on PORT : ${app.get('port')}`);
});

exports.server = server;
