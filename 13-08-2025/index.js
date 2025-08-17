import { createServer } from 'http';
import fs from 'fs';
import ejs from 'ejs';

const server = createServer((req, res) => {
    const method = req.method;
    const url = req.url;

    if (method) {
        switch (url) {
            case '/html':
                const content = fs.readFileSync('index.html', 'utf8');

                const table = [
                    { method: 'GET', url: '/', status: 200 },
                    { method: 'GET', url: '/unknown', status: 404 },
                    { method: 'POST', url: '/', status: 405 }
                ]

                const template = ejs.render(content, { table });

                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(template);

                break;

            default:
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Hello World');
                break;
        }
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
})

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
