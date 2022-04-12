const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true
    },
    price: {
        type: Number,
        trim: true,
        // required: true
    },
    info: {
        type: String,
        // required: true
    },
    photo: {
        type: String,
        // required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    count: {
        type: Number,
        default: 0
    },
    business_id: {
        type: ObjectId,
        // required: true
    },
    duration: {
        type: Number,
        // required: true
    },
    user: {
        type: ObjectId,
        ref: "User",
        // required: true
    },
}, { timestamps: true })

module.exports = mongoose.model("Service", serviceSchema)