import {HydratedDocument, Schema, model} from 'mongoose';

interface IOrder{
    desciption: string,
    amountInCents?: number
};

// Question marks in attrbiutes indicate that they're optional

interface ICustomer{
    name: string,
    industry?: string,
    orders?: IOrder[]
};

const customerSchema = new Schema<ICustomer>({
    name : {
        type: String,
        required: true
    },
    industry : String,
    orders: [
        {
            descripion: String,
            amountInCents: Number
        }
    ]
});

const Customer = model('Customer', customerSchema);

const c: HydratedDocument<ICustomer> = new Customer({
    name: 'test',
    industry: 'test'
});

console.log(c.name);

export default Customer;