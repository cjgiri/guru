module.exports={
  fetchAlbumImage: function(data, callback){
    var parsedArtist = data.artist.toLowerCase();
    var parsedAlbum = data.album.toLowerCase();
    parsedAlbum = parsedAlbum.replace(/ /gi, '+');
    parsedArtist = parsedArtist.replace(/ /gi, '+');
    var url = 'https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=cf2831cba4d8e5c758bae51f9c41d7e2&artist='+parsedArtist+'&album='+parsedAlbum+'&format=json';
    $.ajax({
      url: url,
      method: 'GET',
      success: function(value){
        if ( value.album && value.album.image && value.album.image.length >= 2){
          data.albumArtUrl = value.album.image[value.album.image.length-2]['#text'];
        } else {
          data.albumArtUrl = "";
        }
        callback(data)
      },
      error: function(image){
        console.log("couldnt get image");
        data.albumArtUrl = "";
        callback(data)
      },
    });
  }
}
