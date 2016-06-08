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
  submitAnnotation: function(e){
    e.preventDefault();
    e.stopPropagation();
    ApiUtil.submitAnnotation({
      lyricId: this.props.lyricId,
      startChar: this.props.indices[0],
      endChar: this.props.indices[1],
      annotationBody: this.state.annotationBody
    })
  },
  toggleForm: function(e){
    e.preventDefault();
    this.setState({displayAnnotationForm: false});
  },
  render: function(){
    var divStyle = {
      top: this.props.pos
    };
    if (this.state.displayAnnotationForm){
      return(
        <div className="annotation-area" style={divStyle}>
          <form >
            <label>
              <textarea onChange={this.setAnnotationBody}/>
            </label>
            <input onClick={this.submitAnnotation} type="submit" value="Submit Annotation"className="begin-annotation" />
            <button className="cancel-annotation" onClick={this.toggleForm}>Cancel</button>
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
