const mongoose = require('mongoose');
// const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const ProductSchema = new Schema({
    coverImage: String,
    name: {type : String, require: true, max:(60, '最大60文字まで')},
    price: Number,
    description: String,
    heading1: String,
    heading2: String,
    heading3: String,
    headingtext1: String,
    headingtext2: String,
    headingtext3: String
});

module.exports = mongoose.model('Product', ProductSchema)
