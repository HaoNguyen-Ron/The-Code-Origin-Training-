import {createServer, IncomingMessage, ServerResponse} from 'http';
import { readFileSync } from 'fs';

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    const method = req.method;
    const url = req.url;
    
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    const content = readFileSync('./test.txt', {encoding: 'utf-8'});

    res.end(content);
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});