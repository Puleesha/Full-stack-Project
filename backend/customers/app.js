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

// const {v4: uuidv4} = require('uuid');

// console.log(uuidv4());

const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
const PORT = 3000;

const customers = [
    {
        "name" : "Caleb",
        "industry" : "music"
    },
    {
        "name" : "John",
        "industry" : "networking"
    },
    {
        "name" : "Sal",
        "industry" : "sports medicine"
    }
]

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.get('/api/customers', (req, res) => {
    res.send({"customers" : customers});
})

app.post('/api/customers', (req, res) => {
    console.log(req.body);
    res.send(req.body);
})

app.post('/', (req, res) => {
    res.send("This is a post request");
})

app.listen(PORT, () => {
    console.log('App listening on port ' + PORT);
})