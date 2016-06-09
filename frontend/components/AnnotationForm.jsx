var React = require("react"),
    UserStore = require("../stores/user_store"),
    ApiUtil = require('../util/apiUtil');

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
          <form>
            <span className="annotatable-text"> {this.props.selectedText}</span>
            <label>
              <textarea onChange={this.setAnnotationBody}/>
            </label>
            <input onClick={this.submitAnnotation} type="submit" value="Submit Annotation" className="begin-annotation" />
            <button className="annot-button cancel-annotation" onClick={this.toggleForm}>Cancel</button>
          </form>
        </div>
      )
    } else {
      if(UserStore.currentUser().username){
        return(
          <div className="annotation-area" style={divStyle}>
            <button className="begin-annotation" onClick={this.beginAnnotation}>Begin Annotation</button>
          </div>
        )
      }
      else{
        return(
          null
        )
      }
    }
  }
});

module.exports = AnnotationForm;
