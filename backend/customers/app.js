// const http = require('http');

// const server = http.createServer((req, res) => {
//     // Callback function
//     res.statusCode = 200; // 200 = OK
//     res.setHeader('Content-Type', 'text/html');
//     res.end('<h1>Welcome to my  page</h1>');
// });

// server.listen(300, '127.0.0.1', () => {
//     console.log('Server running...');
// }
// )

const {v4: uuidv4} = require('uuid');

console.log(uuidv4());