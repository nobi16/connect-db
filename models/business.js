const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema

const businessSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true,
    },
    category: {
        type: String,
        // required: true
    },
    info:{
        type:String
    },
    mobile: {
        type: Number,
        // required: true
    },
    user: {
        type: ObjectId,
        ref: "User",
        // required: true
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
    longitude:{
        type: Number,
        // required: true
    },
    latitude:{
        type: Number,
        // required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Business", businessSchema)