var React = require("react"),
    ReactRouter = require('react-router'),
    hashHistory = ReactRouter.hashHistory,
    LyricStore = require('../../stores/lyric_store'),
    ApiUtil = require('../../util/apiUtil'),
    AnnotationForm = require('../AnnotationForm'),
    AnnotationDetail = require('./AnnotationDetail');

var LyricShow = React.createClass({
  componentDidMount: function(){
    this.lyricListener = LyricStore.addListener(this.getStateFromStore)
    ApiUtil.fetchLyric(parseInt(this.props.routeParams.lyricId));
  },
  componentWillUnmount: function(){
    this.lyricListener.remove();
  },
  componentWillReceiveProps: function(props){
    ApiUtil.fetchLyric(parseInt(props.routeParams.lyricId));
  },
  getInitialState: function(){
    return this.stateHelper();
  },
  getStateFromStore: function(){
    this.setState( this.stateHelper() );
  },
  stateHelper: function(){
    return ({ lyric: LyricStore.find(parseInt(this.props.routeParams.lyricId)),
            displayAnnotationForm: false,
            displayAnnotationDetail: false,
            annotationPos: 0,
            selectIndices:[],
            selectedText: ""
           });
  },
  textSelected: function(e){
    var selection = window.getSelection();
    if(selection.anchorOffset !== selection.focusOffset &&
      (Math.abs(selection.anchorOffset - selection.focusOffset) > 1) &&
      selection.anchorNode.parentNode.className === "lyric-text" &&
      selection.focusNode.parentNode.className === "lyric-text"){
        var startOffset = parseInt(selection.anchorNode.parentNode.dataset.startIndex);
        var aOffset= selection.anchorOffset + startOffset;
        var fOffset= selection.focusOffset + startOffset;
        var selectIndices = [aOffset, fOffset];
        if (aOffset > fOffset){
          selectIndices = [fOffset, aOffset];
        }

        this.setState( {
          selectedText: selection.toString(),
          displayAnnotationForm: true,
          displayAnnotationDetail: false,
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
    // if click on a text snippet that is annotated
    if (e.target.dataset.annotationId && e.target.dataset.annotationId !== "none")
        // if click on a text snippet that isn't the selected one
        if (e.target.dataset.annotationId !== this.state.displayAnnotationDetail){

        this.setState({
          annotationPos: e.pageY,
          displayAnnotationDetail: e.target.dataset.annotationId,
          displayAnnotationForm: false,
          selectedText: e.target.innerHTML
        });
      }else{
        return false;
      }
    else{
      this.setState({displayAnnotationDetail: false});
    }
  },
  annotateBody: function(){
    var annotationObjects = [];
    var lastEndChar = 0;
    var annotationAr = this.state.lyric.annotations.slice();
    var lyricBody = this.state.lyric.lyricBody;

    if (annotationAr.length === 0){
      return(<span className="lyric-text" data-annotation-id="none" data-start-index="0">
      {this.state.lyric.lyricBody}
    </span>)
    }

    annotationAr.sort(function(a,b){
      if (a.start_char < b.start_char) return -1;
      if (a.start_char > b.start_char) return 1;
      return 0;
    });

    for (var i = 0; i < annotationAr.length; i++) {
      var currentStart = annotationAr[i].start_char;
      var currentEnd = annotationAr[i].end_char;


      if (currentStart > lastEndChar){
        annotationObjects.push({
          text: lyricBody.substring(lastEndChar, currentStart),
          startIndex: lastEndChar,
          annotationId: "none",
          className: "lyric-text"
        });
      }
      annotationObjects.push({
        text: lyricBody.substring(currentStart, currentEnd),
        startIndex: currentStart,
        annotationId: annotationAr[i].id,
        className: "annotation-highlight"
      });
      lastEndChar = currentEnd;
    }
    if (lastEndChar < lyricBody.length){
      annotationObjects.push({
        text: lyricBody.substring(lastEndChar, lyricBody.length),
        startIndex: lastEndChar,
        annotationId: "none",
        className: "lyric-text"
      });
    }

    return annotationObjects.map(function(object, index){
      if (object.annotationId.toString() === this.state.displayAnnotationDetail){
        object.className = object.className +" current-selected-annotation"
      }
      return(
        <span key={index} className={object.className}
        data-annotation-id={object.annotationId} data-start-index={object.startIndex}>
          {object.text}
        </span>
      )
    }.bind(this));
  },
  findAnnotation: function(id){
      return this.state.lyric.annotations.find(function(el){
      return (el.id.toString() === id)
    });
  },
  render: function(){
    this.AnnotationForm = null;
    this.AnnotationDetail = null;
    if (this.state.displayAnnotationForm){

      this.AnnotationForm = <AnnotationForm pos={this.state.annotationPos}
        indices={this.state.selectIndices} lyricId={this.props.routeParams.lyricId} selectedText={this.state.selectedText}/>
    }
    if (this.state.displayAnnotationDetail){
      var annotationId = this.state.displayAnnotationDetail;

      var annotation = this.findAnnotation(annotationId);
      this.AnnotationDetail = <AnnotationDetail selectedText={this.state.selectedText} pos={this.state.annotationPos}
        annotation={annotation} />
    }

    if(!this.state.lyric || !this.state.lyric.annotations){
      return(<div></div>);
    }else{
      this.annotationSpans = this.annotateBody();
      return(
        <div onClick={this.toggleAnnotationDetail}>
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
          <div className="lyrics-content" onMouseUp={this.textSelected}>
            {this.annotationSpans}
          </div>
          {this.AnnotationForm}
          {this.AnnotationDetail}
        </div>
      )
    }
  }
})

module.exports = LyricShow;
