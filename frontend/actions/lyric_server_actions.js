var Dispatcher = require('../dispatcher/dispatcher'),
    Constants = require('../constants/app_constants');

module.exports = {
  receiveLyric: function(lyric) {
    Dispatcher.dispatch({
      actionType: Constants.LYRICRECEIEVED,
      lyric: lyric
    })
  },
  receiveLyrics: function(lyrics) {
    Dispatcher.dispatch({
      actionType: Constants.LYRICSRECEIEVED,
      lyrics: lyrics
    })
  },
  handleError: function(e){
    console.log(e);
  },
  receiveSearchResults: function(results){
    Dispatcher.dispatch({
      actionType: Constants.RESULTSRECIEVED,
      results: results
    })
  }
};
