var Dispatcher=require('../dispatcher/dispatcher'),
    Store = require('flux/utils').Store,
    AppConstants = require('../constants/app_constants');

var ErrorStore = new Store(Dispatcher);

var _errors = [];
var _form = "";

ErrorStore.formErrors = function(form){
  var result = [];

  if (form !== _form) {
    return result;
  }

  return _errors.slice();
};

ErrorStore.form = function() {
  return _form.slice();
}

ErrorStore.__onDispatch = function(payload){
  switch (payload.actionType) {
    case AppConstants.SETERRORS:
      _errors = payload.errors;
      _form = payload.form;
      ErrorStore.__emitChange();
      break;
    case AppConstants.CLEARERRORS:
      _errors = {};
      _form = "";
      ErrorStore.__emitChange();
      break;
  }
}

module.exports = ErrorStore;
