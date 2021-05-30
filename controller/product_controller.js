const Product = require("../models/product");

//npm i google-auth-library

//GET ************************************
const getProductList = (req, res, next) => {
    Product.find().then(products => {
        res.status(200).send(products);
    }).catch(err => {
        res.status(400).send(err.message);
    })
}


//POST PRODUCT ****************************
const productPostController = async (req, res, next) => {
    try {
        const newProduct = req.body
         console.log('newProduct',newProduct);
         const imagefilename = req.file.filename
         console.log("imagefilename=",imagefilename)
        // await Product.create({ ...newProduct,image:"http://localhost:" + process.env.PORT + "/" + imagefilename})
        await Product.create({ ...newProduct,image:"https://dashboard-backend-elham.herokuapp.com" + "/" + imagefilename})
        // await Product.create(newProduct)
        res.status(201).send(true);
    } catch (fehler) {
        next(fehler)
    }
}


//DELETE PRODUCT ******************************
const productDeleteController = async (req, res, next) => {
    try {
        const {productId} = req.params;
        await Product.findByIdAndDelete(productId);
        res.send(true)
    } catch (fehler) {
        next(fehler)
    }
}


module.exports = {getProductList, productPostController, productDeleteController}
