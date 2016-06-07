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
    return this.stateHelper();
  },
  // todo : dry this code up
  getStateFromStore: function(){
    this.setState( this.stateHelper() );
  },
  stateHelper: function(){
    return ({ lyric: LyricStore.find(parseInt(this.props.routeParams.lyricId)),
            displayAnnotationForm: false,
            annotationPos: 0,
            selectIndices:[]
           });
  },
  textSelected: function(e){
    debugger
    var selection = window.getSelection();
    if(selection.anchorOffset !== selection.focusOffset &&
      (Math.abs(selection.anchorOffset - selection.focusOffset) > 1) &&
      selection.anchorNode.parentNode.parentNode.className === "lyrics-content" &&
      selection.focusNode.parentNode.parentNode.className === "lyrics-content" ){
        var selectIndices = [selection.anchorOffset, selection.focusOffset];
        if (selection.anchorOffset > selection.focusOffset){
          selectIndices = [selection.focusOffset, selection.anchorOffset];
        }
        //fix selectIndices here
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
  toggleAnnotationDetail: function(e){
    e.preventDefault();
    if (e.target.dataset.annotationId === "none"){
      return false
    }else{

    }
  },
  annotateBody: function(){
    var annotationObjects = [];
    var lastEndChar = 0;
    var annotationAr = this.state.lyric.annotations.slice();

    annotationAr.sort(function(a,b){
      if (a.start_char < b.start_char) return -1;
      if (a.start_char > b.start_char) return 1;
      return 0;
    });

    for (var i = 0; i < annotationAr.length; i++) {
      var currentStart = annotationAr[i].start_char;
      var currentEnd = annotationAr[i].end_char;
      var lyricBody = this.state.lyric.lyricBody;

      if (currentStart > lastEndChar){
        annotationObjects.push({
          text: lyricBody.substring(lastEndChar, currentStart),
          endIndex: currentStart,
          annotationId: "none",
          className: "lyric-text"
        });
        lastEndChar = currentEnd;
      }
      annotationObjects.push({
        text: lyricBody.substring(currentStart, currentEnd),
        endIndex: currentEnd,
        annotationId: annotationAr[i].id,
        className: "annotation-highlight"
      });
    }

    if (annotationAr.length === 0){
      return(<span className="lyric-text" data-annotation-id="none">{this.state.lyric.lyricBody}</span>)
    }

    return annotationObjects.map(function(object, index){
      return(
        <span key={index} className={object.className}
        data-annotation-id={object.annotationId} onClick={this.toggleAnnotationDetail}>
          {object.text}
        </span>
      )
    }.bind(this));
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
    this.annotationObjects = this.annotateBody();
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
        <div className="lyrics-content" onMouseUp={this.textSelected}>{this.annotationObjects}</div>
        {this.AnnotationForm}
      </div>
    )
  }
  }
})

module.exports = LyricShow;
