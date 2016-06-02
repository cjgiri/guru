var React = require('react'),
    LyricStore = require('../../stores/lyric_store'),
    ReactRouter = require('react-router'),
    hashHistory = ReactRouter.hashHistory;

var LyricsIndexItem = React.createClass({
  showDetail: function(){
    hashHistory.push('/lyrics/'+this.props.lyric.id);
  },
  render: function(){
    return(
      <li onClick={this.showDetail} className="lyric-index-list-item">
        <div className="lyric-text-container">
          <div className="lyric-index-list-item-text">
            <h1>{this.props.lyric.title}</h1>
            <br/>
            <h2>{this.props.lyric.artist}</h2>
          </div>
        </div>
      </li>
    )
  }
});

module.exports = LyricsIndexItem;
