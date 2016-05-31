var Dispatcher = require('../dispatcher/dispatcher'),
    Constants = require('../constants/app_constants');
module.exports = {
  receiveCurrentUser:function(user) {
    console.log(user);
    Dispatcher.dispatch({
      actionType: constants.LOGIN,
      user: user
    })
  },
  handleError:function(e){
    console.log(e);
  }
};
