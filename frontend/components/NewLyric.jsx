var React = require("react"),
    ApiUtil = require("../util/apiUtil"),
    UserStore = require("../stores/user_store"),
    ApiUtil = require("../util/apiUtil");

var ReactRouter = require('react-router'),
    hashHistory = ReactRouter.hashHistory;


var NewLyric = React.createClass({
  getInitialState:function(){
    return({
      artist: "",
      title: "",
      album: "",
      content: ""
    });
  },
  setArtist: function(e){
    this.setState({artist: e.target.value})
  },
  setTitle: function(e){
    this.setState({title: e.target.value})
  },
  setAlbum: function(e){
    this.setState({album: e.target.value})
  },
  setContent: function(e){
    this.setContent({title: e.target.value})
  },
  submitLyric: function(){
    ApiUtil.submitLyric(this.state, function(){
      debugger
      hashHistory.push("/");
    }.bind(this));
  },
  render:function(){
      return(
      <div className="new-song-form">
          <div className="new-song-form-inner">
            <h1>Add Song</h1>
            <form onSubmit={this.submitLyric}>
              <label>
                Artist
                <br/>
                <input type="text" value={this.state.artist} onChange={this.setArtist}>
                </input>
              </label>
              <br/>
              <label>
                Title
                <br/>
                <input type="text" value={this.state.title} onChange={this.setTitle}>
                </input>
              </label>
              <br/>
              <label>
                Album
                <br/>
                <input type="text" value={this.state.album} onChange={this.setAlbum}>
                </input>
              </label>
              <br/>
              <label>
                Lyrics
                <br/>
                <textarea type="text" value={this.state.lyricBody} onChange={this.setLyricBody}>
                </textarea>
              </label>
              <br/>
              <input type="submit" value="Submit"></input>
            </form>
          </div>
        </div>
    )
  }

});
module.exports = NewLyric;
