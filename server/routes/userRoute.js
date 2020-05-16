const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

router.post('/id', userController.addUserDummy, (req, res) => {
  console.log("going thru the motions")
  res.sendStatus(200);
})


module.exports = router;