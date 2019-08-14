var express = require('express');
var router = express.Router();
var userController = require('../controller/userController');
var holidayController = require('../controller/holidayController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/phone_api/login',userController.login);

router.post('/phone_api/register',userController.register);

router.post('/phone_api/addHoliday',holidayController.addHoliday);

router.post('/phone_api/getHoliday',holidayController.getHolidays);

module.exports = router;
