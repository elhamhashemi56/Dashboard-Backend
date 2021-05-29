const multer = require('multer');
const express = require('express');
const router = express.Router();
const {getProductList, productPostController, productDeleteController} = require('../controller/product_controller')
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


router
    .route('/')
    .get(getProductList)
    

router
    .delete("/:productId", productDeleteController)

router.post("/", upload.single("image"), productPostController)

module.exports = router;