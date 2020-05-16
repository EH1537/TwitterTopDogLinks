const models = require('../models/userModel');
const userController = {};



userController.addUserDummy = (req, res, next) => {
  console.log('in add Dummy');
  console.log(req.body)
  let {name} = req.body; //the object from the request contains a key value pair, key is the name of the user

  models.User.findOne({ nameString: name }, (err, user) => {
    if (err) {
      return next({
        log: 'userController.addUserDummy: ERROR: Error from findOne in adduser',
        message: { err: 'Error occurred in userController.addUserDummy. Check server logs for more details.' }
      });
    }
    else if (user === null) {
      models.User.create({name: name}, (err, user) => {
        if (err) {
          return next({
            log: 'userController.addUserDummy: ERROR: Error from adding document in adduser',
            message: { err: 'Error occurred in userController.addUserDummy. Check server logs for more details.' }
          });
        }
        else {
          console.log("user created", user);
          return next();
        }
      })
    }
  })
};

module.exports = userController