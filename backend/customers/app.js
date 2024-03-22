"use strict";
// const http = require('http');
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const customer_1 = require("./models/customer");
const cors = require('cors');
mongoose.set('strictQuery', false);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== 'production') { // If we dont flag npm run start with node environent = production
    dotenv.config();
}
const PORT = process.env.PORT || 3000;
const CONNECTION = process.env.CONNECTION;
const customers = [
    {
        "name": "Caleb",
        "industry": "music"
    },
    {
        "name": "John",
        "industry": "networking"
    },
    {
        "name": "Sal",
        "industry": "sports medicine"
    }
];
const customer = new customer_1.Customer({
    name: 'caleb',
    industry: 'marketing'
});
app.get('/', (req, res) => {
    res.send("Welcome!");
});
app.get('/api/customers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(yield mongoose.connection.db.listCollections().toArray());
    try {
        const result = yield customer_1.Customer.find();
        res.send({ "customers": result });
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
}));
app.get('/api/customers/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log({
        requestParams: req.params,
        requestQuery: req.query
    });
    try {
        const { id: customerId } = req.params;
        console.log(customerId);
        const customer = yield customer_1.Customer.findById(customerId);
        console.log(customer);
        if (!customer) {
            res.status(404).json({ error: 'User not found' });
        }
        else {
            res.json({ customer });
        }
    }
    catch (e) {
        res.status(500).json({ error: 'Something went wrong' });
    }
}));
// PUT method adds or replaces a resource
// POST method adds a resource
// PATCH updates a resource with only the required attributes being changed
app.put('/api/customers/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customerId = req.params.id;
        const customer = yield customer_1.Customer.findOneAndReplace({ _id: customerId }, req.body, { new: true });
        console.log(customer);
        res.json({ customer });
        // res.json({updatedCount: result.modifiedCount});
    }
    catch (e) {
        console.log(e.message);
        res.status(500).json({ error: 'Something went wrong' });
    }
}));
app.patch('/api/customers/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customerId = req.params.id;
        const customer = yield customer_1.Customer.findOneAndUpdate({ _id: customerId }, req.body, { new: true });
        console.log(customer);
        res.json({ customer });
    }
    catch (e) {
        console.log(e.message);
        res.status(500).json({ error: 'Something went wrong' });
    }
}));
app.patch('/api/orders/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params);
    const orderId = req.params.id;
    try {
        yield customer_1.Customer.findOneAndUpdate({ 'orders._id': orderId }, { $set: { 'orders.$': req.body } }, // $ refers to order that id matched
        { new: true });
        console.log(result);
        if (result) {
            res.json(result);
        }
        else {
            res.status(404).json({ error: 'something went wrong' });
        }
    }
    catch (e) {
        console.log(e.message);
        res.status(500).json({ error: 'something went wrong' });
    }
}));
app.get('/api/orders/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield customer_1.Customer.findOne({ 'orsers:_id': req.params.id });
        if (result) {
            res.json(result);
        }
        else {
            res.status(404).json({ 'error': 'Order not found' });
        }
    }
    catch (e) {
        console.log(e.message);
        res.status(500).json({ error: 'something went wrong' });
    }
}));
// Delete a resource
app.delete('/api/customers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customerId = req.params.id;
        const result = yield customer_1.Customer.deleteOne({ _id: customerId });
        res.json({ deletedCount: 1 });
    }
    catch (_a) {
        res.status(500).json({ error: 'Something went wrong' });
    }
}));
app.post('/api/customers', (req, res) => {
    console.log(req.body);
    const customer = new customer_1.Customer(req.body);
    try {
        customer.save();
        res.status(201).json({ customer });
        // res.status(201).json(customer);  // Another way
    }
    catch (e) {
        res.status(400).json({ error: e.message });
        // Bad request
    }
});
app.post('/', (req, res) => {
    res.send("This is a post request");
});
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose.connect(CONNECTION); // Not working :(
        console.log('App listening on port ' + PORT);
    }
    catch (e) {
        console.log(e.message);
    }
});
start();
