var Dispatcher=require('../dispatcher/dispatcher'),
    Store = require('flux/utils').Store,
    AppConstants = require('..constants/app_constants');

var _currentUser = {};

var _currentUserHasBeenFetched = false;

var UserStore = new Store(Dispatcher);

UserStore.isUserLoggedIn = function(){
  return _currentUserHasBeenFetched;
};

UserStore.currentUser = function(){
  if _currentUserHasBeenFetched{
    return _currentUser
  };
};

UserStore.__onDispatch = function(payload){
  switch (payload.actionType) {
    case AppConstants.LOGIN:
      UserStore.login(payload.user);
      UserStore.__emitChange();
      break;
    case AppConstants.LOGOUT:
      UserStore.logout
      UserStore.__emitChange();
      break;

  }
}

module.exports = UserStore;
