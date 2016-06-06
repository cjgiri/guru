var React = require("react");

var AnnotationForm = React.createClass({
  getInitialState: function(){
    return ({ displayAnnotationForm: false });
  },
  beginAnnotation: function(){
    this.setState({displayAnnotationForm: true});
  },
  submitAnnotation: function(){
    
  },
  render: function(){
    var divStyle = {
      top: this.props.pos
    };
    if (this.state.displayAnnotationForm){
      return(
        <div className="annotation-area" style={divStyle}>
          <form>
            <label>
              <textarea/>
            </label>
            <button className="begin-annotation" onClick={this.submitAnnotation}>Submit Annotation</button>
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
