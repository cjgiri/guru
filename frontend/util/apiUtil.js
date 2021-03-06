var Dispatcher = require('../dispatcher/dispatcher'),
    UserActions = require('../actions/user_actions'),
    LyricServerActions = require('../actions/lyric_server_actions'),
    ErrorActions = require('../actions/error_actions');

module.exports={
  loginUser: function(credentials, callback){
    $.ajax({
      url: "api/session",
      type: "POST",
      data: {user: credentials},
      success: function(user){
        UserActions.receiveCurrentUser(user);
        ErrorActions.clearErrors();
        callback();
      },
      error: function(xhr){
        var errors = xhr.responseJSON;
	      ErrorActions.setErrors("login", errors);
      }
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
      success: function(user){
        UserActions.receiveCurrentUser(user);
        ErrorActions.clearErrors();
        callback();
      },
      error: function(xhr){
        var errors = xhr.responseJSON;
	      ErrorActions.setErrors("login", errors);
      }
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
          lyric_body: data.lyricBody,
          image_url: data.albumArtUrl
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
  },
  submitAnnotation: function(data){
    $.ajax({
      url: '/api/annotation',
      method: 'POST',
      data: {
        annotation:{
          body: data.annotationBody,
          start_char: data.startChar,
          end_char: data.endChar,
          lyric_id: data.lyricId
        }
      },
      success: LyricServerActions.receiveLyric,
      error: UserActions.handleError
    })
  },
  updateAnnotation: function(data){
    $.ajax({
      url: '/api/annotation',
      method: 'PATCH',
      data: data ,
      success: LyricServerActions.receiveLyric,
      error: UserActions.handleError
    })
  },
  destroyAnnotation: function(id){
    $.ajax({
      url: "api/annotation",
      type: "DELETE",
      data: {
        id: id
      },
      success: LyricServerActions.receiveLyric,
      error: UserActions.handleError
    })
  },
  searchLyrics: function(query){
    $.ajax({
			url: '/api/search/' + query,
			method: 'GET',
			success: LyricServerActions.receiveSearchResults,
			error: LyricServerActions.handleError
		});
  }
}
