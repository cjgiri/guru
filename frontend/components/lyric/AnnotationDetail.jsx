var React = require('react');

var AnnotationDetail = React.createClass({
  render: function(){
    var divStyle = {
      top: this.props.pos
    };
    return(
      //add a listener to 
      <div className="annotation-area" style={divStyle}>
        <h1>guru annotation</h1>
        {this.props.annotation.body}
      </div>
    );
  }
})

module.exports = AnnotationDetail;
