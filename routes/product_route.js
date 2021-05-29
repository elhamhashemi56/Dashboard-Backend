var multer=require('multer')
var upload=multer({dest:'uploads/'})
const express = require('express');
const router = express.Router();
const {getProductList,productPostController,productDeleteController}=require('../controller/product_controller')

router
    .route('/')
        .get(getProductList)
        .post(productPostController)
        
router
    .delete("/:productId",productDeleteController)

router.post("/product",upload.single("image"),productPostController)
    
module.exports = router;
