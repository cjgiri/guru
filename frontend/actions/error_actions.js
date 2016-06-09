var Dispatcher = require('../dispatcher/dispatcher'),
    Constants = require('../constants/app_constants');

module.exports = {
  clearErrors: function(){
    Dispatcher.dispatch({
      actionType: Constants.CLEARERRORS
    })
  },
  setErrors: function(form, errors){
    Dispatcher.dispatch({
      actionType: Constants.SETERRORS,
      errors: errors,
      form: form
    })
  }
};
