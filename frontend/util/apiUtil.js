var Dispatcher = require('../dispatcher/dispatcher'),
    UserActions = require('../actions/user_actions');

module.exports={
  createUser: function(credentials){
    // $.ajax({
    //   url: "api/session",
    //   type: "POST",
    //   data: {user: credentials},
    //   success: UserActions.receiveCurrentUser,
    //   error: UserActions.handleError
    // })
  },
  loginUser: function(credentials){

    $.ajax({
      url: "api/session",
      type: "POST",
      data: {user: credentials},
      success: UserActions.receiveCurrentUser,
      error: UserActions.handleError
    })
  },
  logoutUser: function(){
    $.ajax({
      url: "api/session",
      type: "DELETE",
      success: UserActions.removeCurrentUser,
      error: UserActions.handleError
    })
  },
  fetchCurrentUser: function(complete){
    $.ajax({
			url: '/api/session',
			method: 'GET',
			success: UserActions.receiveCurrentUser,
			error: UserActions.handleError,
      complete: complete
		});
	},
}
