var React = require("react"),
    ReactRouter = require('react-router'),
    hashHistory = ReactRouter.hashHistory,
    LyricStore = require('../../stores/lyric_store'),
    ApiUtil = require('../../util/apiUtil');

var LyricShow=React.createClass({
  componentDidMount: function(){
    this.lyricListener = LyricStore.addListener(this.getStateFromStore)
    ApiUtil.fetchLyric(parseInt(this.props.routeParams.lyricId));
  },
  componentWillUnmount: function(){
    this.lyricListener.remove();
  },
  getInitialState: function(){
    return ({ lyric: LyricStore.find(parseInt(this.props.routeParams.lyricId)) });
  },
  getStateFromStore: function(){

    this.setState( { lyric: LyricStore.find(parseInt(this.props.routeParams.lyricId)) });
  },
  render: function(){
    if(!this.state.lyric){
    return(<div>{this.props.routeParams.lyricId} </div>);
  }else{
    return(
      <div>
        <div className="lyrics-banner">
          <div className="lyrics-banner-detail">
            <div className="lyrics-banner-detail-inset">
              <h1>{this.state.lyric.title}</h1>
              <h2>{this.state.lyric.artist}</h2>
              <h3>{this.state.lyric.album}</h3>
            </div>
          </div>
        </div>
        <div className="lyrics-content">{this.state.lyric.lyricBody}></div>
      </div>
    )
  }
  }
})

module.exports = LyricShow;
