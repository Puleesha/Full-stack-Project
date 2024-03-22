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
// const dotenv = require('dotenv');
// dotenv.config();
const app = express();
// const Customer = require('./models/customer');
import {Customer} from './models/customer';
const cors = require('cors');
import {Request, Response} from 'express';

mongoose.set('strictQuery', false);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

if (process.env.NODE_ENV !== 'production'){  // If we dont flag npm run start with node environent = production
    //dotenv.config();
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


app.get('/', (req: Request, res: Response) => {
    res.send("Welcome!");
});

app.get('/api/customers', async (req: Request, res: Response) => {
    console.log(await mongoose.connection.db.listCollections().toArray());
    try{
        const result = await Customer.find();
        res.send({"customers" : result});
    }catch(e){
        res.status(500).json({error: e.message});
    }
});

app.get('/api/customers/:id', async(req: Request, res: Response) => {
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

// PUT method adds or replaces a resource
// POST method adds a resource
// PATCH updates a resource with only the required attributes being changed
app.put('/api/customers/:id', async(req: Request, res: Response) => {
    try{
        const customerId = req.params.id
        const customer = await Customer.findOneAndReplace({_id: customerId}, req.body, {new: true});
        console.log(customer);
        res.json({customer});
        // res.json({updatedCount: result.modifiedCount});
    }catch(e){
        console.log(e.message);
        res.status(500).json({error: 'Something went wrong'});
    }
});

app.patch('/api/customers/:id', async (req: Request, res: Response) => {
    try{
        const customerId = req.params.id
        const customer = await Customer.findOneAndUpdate({_id: customerId}, req.body, {new: true});
        console.log(customer);
        res.json({customer});
    }catch(e){
        console.log(e.message);
        res.status(500).json({error: 'Something went wrong'});
    }
});

app.patch('/api/orders/:id', async (req: Request, res: Response) => {
    console.log(req.params);
    const orderId = req.params.id;
    try{
        const result = await Customer.findOneAndUpdate(
            {'orders._id': orderId},
            {$set: {'orders.$': req.body}},  // $ refers to order that id matched
            {new: true}
        );

        console.log(result);

        if(result){
            res.json(result);
        }else{
            res.status(404).json({error: 'something went wrong'});
        }
    }catch(e){
        console.log(e.message);
        res.status(500).json({error: 'something went wrong'});
    }
});

app.get('/api/orders/:id', async (req: Request, res: Response) => {
    try{
        const result = await Customer.findOne({'orsers:_id': req.params.id});
        if(result){
            res.json(result);
        }else{
            res.status(404).json({'error': 'Order not found'});
        }
    } catch(e){
        console.log(e.message);
        res.status(500).json({error: 'something went wrong'});
    }
})

// Delete a resource
app.delete('/api/customers', async (req: Request, res: Response) => {
    try{
        const customerId = req.params.id;
        const result = await Customer.deleteOne({_id: customerId});
        res.json({deletedCount: 1});
    }catch{
        res.status(500).json({error: 'Something went wrong'});
    }
})

app.post('/api/customers', (req: Request, res: Response) => {
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

app.post('/', (req: Request, res: Response) => {
    res.send("This is a post request");
});

const start = async() => {
    try{
        await mongoose.connect(CONNECTION);  // Not working :(
        console.log('App listening on port ' + PORT);
    }catch(e){
        console.log(e.message);
    }
}

start();