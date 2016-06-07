var React = require("react"),
    ApiUtil = require("../util/apiUtil");

var AnnotationForm = React.createClass({
  getInitialState: function(){
    return ({ displayAnnotationForm: false, annotationBody:"" });
  },
  beginAnnotation: function(){
    this.setState({displayAnnotationForm: true});
  },
  setAnnotationBody: function(e){
    this.setState({annotationBody: e.target.value})
  },
  submitAnnotation: function(){

    ApiUtil.submitAnnotation({
      lyricId: this.props.lyricId,
      startChar: this.props.indices[0],
      endChar: this.props.indices[1],
      annotationBody: this.state.annotationBody
    })
  },
  render: function(){
    var divStyle = {
      top: this.props.pos
    };
    if (this.state.displayAnnotationForm){
      return(
        <div className="annotation-area" style={divStyle}>
          <form onSubmit={this.submitAnnotation}>
            <label>
              <textarea onChange={this.setAnnotationBody}/>
            </label>
            <input type="submit" value="Submit Annotation"className="begin-annotation" />
            <button className="cancel-annotation">Cancel</button>
          </form>
        </div>
      )
    } else {
      return(
        <div className="annotation-area" style={divStyle}>
          <button className="begin-annotation" onClick={this.beginAnnotation}>Begin Annotation</button>
        </div>
      )
    }
  }
});

module.exports = AnnotationForm;
