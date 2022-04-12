const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        trim: true,
        required: true
    },
    info: {
        type: String,
        required: true
    },
    photo: {
        type: String
    },
    rating: {
        type: Number,
        default: 0
    },
    count:{
        type: Number,
        default:0
    },
    user: {
        type: ObjectId,
        ref: "User",
        // required: true
    },
    business_id: {
        type: ObjectId,
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model("Product", productSchema)