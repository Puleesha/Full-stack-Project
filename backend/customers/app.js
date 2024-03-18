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
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const Customer = require('./models/customer');
mongoose.set('strictQuery', false);

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

if (process.env.NODE_ENV !== 'production'){  // If we dont flag npm run start with node environent = production
    dotenv.config();
}

const PORT = process.env.PORT || 3000;
const CONNECTION = process.env.CONNECTION;

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

const customer = new Customer({
    name : 'caleb',
    industry : 'marketing'
});

app.get('/', (req, res) => {
    res.send(customer);
});

app.get('/api/customers', (req, res) => {
    res.send({"customers" : customers});
});

app.post('/api/customers', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

app.post('/', (req, res) => {
    res.send("This is a post request");
});

const start = async() => {
    try{
        //await mongoose.connect(CONNECTION);  // Not working :(
        console.log('App listening on port ' + PORT);
    }catch(e){
        console.log(e.message);
    }
}

start();