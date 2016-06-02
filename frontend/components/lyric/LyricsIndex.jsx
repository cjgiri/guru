var React = require('react'),
    LyricStore = require('../../stores/lyric_store'),
    ApiUtil = require('../../util/apiUtil'),
    LyricIndexItem = require('./LyricIndexItem');

var LyricsIndex = React.createClass({
  getInitialState: function(){
    return ({ lyrics: LyricStore.all() });
  },
  componentDidMount: function(){
    this.lyricListener = LyricStore.addListener(this.getStateFromStore)
    ApiUtil.fetchAllLyrics();
  },
  componentWillUnmount: function(){
    this.lyricListener.remove();
  },
  getStateFromStore: function(){
    this.setState( { lyrics: LyricStore.all() });
  },
  render: function(){
  var lyricIndexItemList = "";
  if(this.state.lyrics){
    lyricIndexItemList =
    <ul className="lyric-index-list group">
       {this.state.lyrics.map(function (lyric) {
         return <LyricIndexItem key={lyric.id} lyric={lyric} />;
       })}
     </ul>;
   }
    return(
      <div>
        {lyricIndexItemList}
      </div>
    )
  }
});

module.exports = LyricsIndex;
