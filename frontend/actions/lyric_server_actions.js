var Dispatcher = require('../dispatcher/dispatcher'),
    Constants = require('../constants/app_constants');

module.exports = {
  receiveCurrentUser:function(user) {
    Dispatcher.dispatch({

    })
  },
  handleError:function(e){
    debugger
  },
  removeCurrentUser:function(){
    Dispatcher.dispatch({
      actionType: Constants.LOGOUT
    })
  }
};
