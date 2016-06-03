var ImageApiUtil = require('../util/imageApiUtil'),
    ApiUtil = require('../util/apiUtil');
module.exports = {
  submitLyric: function(data,callback){
      ImageApiUtil.fetchAlbumImage(data, function(){
      ApiUtil.submitLyric(data, callback);
    })
  }
}
