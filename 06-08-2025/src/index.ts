import { createMathServer } from './server';

const server = createMathServer(3001);

server.listen(() => {
    console.log('Server is running on http://localhost:3001');
});