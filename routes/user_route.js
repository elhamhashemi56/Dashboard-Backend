const express = require('express');
const router = express.Router();
const {userGetController,
        userPostController,
        userEinloggen,
       }=require('../controller/users_controller')

router
    .route('/')
        .get(userGetController)
        .post(userPostController)
        

router.route('/login')
        .post(userEinloggen)



module.exports = router;