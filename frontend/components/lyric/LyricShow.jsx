var React = require("react"),
    ReactRouter = require('react-router'),
    hashHistory = ReactRouter.hashHistory,
    LyricStore = require('../../stores/lyric_store'),
    ApiUtil = require('../../util/apiUtil'),
    AnnotationForm = require('../AnnotationForm');

var LyricShow = React.createClass({
  componentDidMount: function(){
    this.lyricListener = LyricStore.addListener(this.getStateFromStore)
    ApiUtil.fetchLyric(parseInt(this.props.routeParams.lyricId));
  },
  componentWillUnmount: function(){
    this.lyricListener.remove();
  },
  getInitialState: function(){
    return ({ lyric: LyricStore.find(parseInt(this.props.routeParams.lyricId)),
            displayAnnotationForm: false,
            annotationPos: 0,
            selectIndices:[]
           });
  },
  // todo : dry this code up
  getStateFromStore: function(){
    this.setState( {
      lyric: LyricStore.find(parseInt(this.props.routeParams.lyricId)),
      displayAnnotationForm: false,
      annotationPos: 0,
      selectIndices: []
     });
  },
  textSelected: function(e){
    var selection = window.getSelection();
    if(selection.anchorOffset !== selection.focusOffset &&
      (Math.abs(selection.anchorOffset - selection.focusOffset) > 1) &&
      selection.anchorNode.parentNode.className === "lyrics-content" &&
      selection.focusNode.parentNode.className === "lyrics-content" ){
        var selectIndices = [selection.anchorOffset, selection.focusOffset];
        if (selection.anchorOffset > selection.focusOffset){
          selectIndices = [selection.focusOffset, selection.anchorOffset];
        }
        this.setState( {
          displayAnnotationForm: true,
          annotationPos: e.pageY,
          selectIndices: selectIndices
        } );
    }
    else if (this.state.displayAnnotationForm === true){
      this.setState({displayAnnotationForm: false});
    }
  },
  render: function(){
  
  this.AnnotationForm = "";
  if (this.state.displayAnnotationForm){
    this.AnnotationForm = <AnnotationForm pos={this.state.annotationPos}
      indices={this.state.selectIndices} lyricId={this.props.routeParams.lyricId}/>
  }
  if(!this.state.lyric){
    return(<div>{this.props.routeParams.lyricId} </div>);
  }else{
    return(
      <div>
        <div className="lyrics-banner">
          <img src={this.state.lyric.image_url}/>
          <div className="lyrics-banner-overlay"></div>
          <div className="lyrics-banner-detail">
            <div className="lyrics-banner-detail-inset">
              <h1>{this.state.lyric.title}</h1>
              <h2>{this.state.lyric.artist}</h2>
              <h3>{this.state.lyric.album}</h3>
            </div>
          </div>
        </div>
        <div className="lyrics-content" onMouseUp={this.textSelected}>{this.state.lyric.lyricBody}</div>
        {this.AnnotationForm}
      </div>
    )
  }
  }
})

module.exports = LyricShow;
