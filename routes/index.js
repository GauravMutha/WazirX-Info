const express=require('express');
const path = require('path');
const router=express.Router();

// console.log('Router Loaded')

const home_controller=require('../controller/home_controller')
router.get('/',home_controller.showHomePage);

module.exports = router;