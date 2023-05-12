const express=require('express')
const path = require('path')
const router=express.Router()
const home_controller=require('../controller/home_controller')
router.get('/',home_controller.showHomePage)
router.get('/timer-update',home_controller.updateAsPerTimer)

module.exports = router