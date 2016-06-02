var Dispatcher = require('../dispatcher/dispatcher'),
    UserActions = require('../actions/user_actions');
    LyricServerActions = require('../actions/lyric_server_actions');

module.exports={
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
  createUser: function(user, callback){
    $.ajax({
      url: "api/user",
      type: "POST",
      data: {user: user},
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
  submitLyric: function(data, callback){
    $.ajax({
      url: '/api/lyric',
      method: 'POST',
      data: {
        lyric:{
          title: data.title,
          album: data.album,
          artist: data.artist,
          lyric_body: data.lyricBody
        }
      },
      success: callback,
      error: UserActions.handleError
    })
  },
  fetchLyric: function(id){
    $.ajax({
			url: '/api/lyric/' + id,
			method: 'GET',
			success: LyricServerActions.receiveLyric,
			error: LyricServerActions.handleError
		});
  },
  fetchAllLyrics: function(){
    $.ajax({
			url: '/api/lyric',
			method: 'GET',
			success: LyricServerActions.receiveLyrics,
			error: LyricServerActions.handleError
		});
  }
}
