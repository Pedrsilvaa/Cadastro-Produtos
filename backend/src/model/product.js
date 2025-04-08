
import mongoose from 'mongoose';

const product = mongoose.model('Product', mongoose.Schema({
    name: {
        type: String, 
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number, 
        required: true 
    },
    category: {
        type: String, 
        required: true 
    },
    amount: {
        type: Number, 
        required: true 
    },
    createdAt: {
        type: Date, 
        default: Date.now 
    }
}));

export default product;
