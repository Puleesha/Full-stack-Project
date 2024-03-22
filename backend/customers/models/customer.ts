import {Schema, model} from 'mongoose';

const customerSchema = new Schema({
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

export const Customer = model('Customer', customerSchema);