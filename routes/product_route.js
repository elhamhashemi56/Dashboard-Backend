const multer = require('multer');
const express = require('express');
const router = express.Router();
const {
    getProductList,
    productPostController,
    getOneProduct,
    productPutController,
    productDeleteController
} = require('../controller/product_controller')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const imagefilename = new Date().getTime() + "-" + file.originalname
        cb(null, imagefilename)
    }
});

const upload = multer({storage});


// router.get("/edit/:productId", getOneProduct)

// router
//     .route('/')
//     .get(getProductList)

// router.put("/:productId", upload.single("image"), productPutController)

// router
//     .delete("/:productId", productDeleteController)

// router.post("/", upload.single("image"), productPostController)

//**************************************** */

router
    .route('/')
     .get(getProductList)
     .post(upload.single("image"), productPostController)

router
    .route('/:productId')
        .delete(productDeleteController)
        .put(upload.single("image"), productPutController)

router
    .route('/edit/:productId')
        .get(getOneProduct)

module.exports = router;