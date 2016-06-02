var Dispatcher=require('../dispatcher/dispatcher'),
    Store = require('flux/utils').Store,
    AppConstants = require('../constants/app_constants');

var _lyrics= {};

var LyricStore = new Store(Dispatcher);

LyricStore.setLyric = function(lyric){
  _lyrics.id = lyric;
};

LyricStore.setLyrics = function(lyrics){
  _lyrics = {};
  lyrics.forEach(function(lyric){
    _lyrics[lyric.id] = lyric;
  })
};

LyricStore.find = function(id){
  return _lyrics.id;
};

LyricStore.all = function(id){
  var lyrics = [];
  for (var id in _lyrics){
    lyrics.push(_lyrics[id]);
  }
  return lyrics;
};

LyricStore.__onDispatch = function(payload){
  switch (payload.actionType) {
    case AppConstants.LYRICRECEIEVED:
      LyricStore.setLyric(payload.lyric);
      LyricStore.__emitChange();
      break;
    }
  switch (payload.actionType) {
    case AppConstants.LYRICSRECEIEVED:
      LyricStore.setLyrics(payload.lyrics);
      LyricStore.__emitChange();
      break;
  }
}

module.exports = LyricStore;
