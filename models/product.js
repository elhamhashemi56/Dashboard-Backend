const mongoose = require("mongoose");
const {Schema} = mongoose;

const ProductSchema = new Schema({
    name: String,
    price: String,
    image: String,
    description : String
});

module.exports = mongoose.model("product", ProductSchema);
