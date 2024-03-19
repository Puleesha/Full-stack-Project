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
    res.send("Welcome!");
});

app.get('/api/customers', async (req, res) => {
    console.log(await mongoose.connection.db.listCollections().toArray());
    try{
        const result = await Customer.find();
        res.send({"customers" : result});
    }catch(e){
        res.status(500).json({error: e.message});
    }
});

app.get('/api/customers/:id/', async(req, res) => {
    console.log({
        requestParams : req.params,
        requestQuery: req.query
    });
    try{
        const {id: customerId} = req.params;
        console.log(customerId);
        const customer = await Customer.findById(customerId);
        console.log(customer);
        if (!customer){
            res.status(404).json({error: 'User not found'});
        }else{
            res.json({customer});
        }
    }catch(e){
        res.status(500).json({error: 'Something went wrong'})
    }
});

app.post('/api/customers', (req, res) => {
    console.log(req.body);
    const customer = new Customer(req.body);
    try{
        customer.save();
        res.status(201).json({customer});
        // res.status(201).json(customer);  // Another way
    }catch(e){
        res.status(400).json({error: e.message}); 
        // Bad request
    }
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