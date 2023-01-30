import app from './app';
import http from 'http';

const port = 3001;
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
export default server;
