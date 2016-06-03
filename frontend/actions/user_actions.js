var Dispatcher = require('../dispatcher/dispatcher'),
    Constants = require('../constants/app_constants');

module.exports = {
  receiveCurrentUser:function(user) {
    Dispatcher.dispatch({
      actionType: Constants.LOGIN,
      user: user
    })
  },
  handleError:function(e){
    console.log(e);
  },
  removeCurrentUser:function(){
    Dispatcher.dispatch({
      actionType: Constants.LOGOUT
    })
  }
};
