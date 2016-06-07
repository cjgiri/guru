var React = require('react');

var AnnotationDetail = React.createClass({
  preventHide: function(e){
    e.stopPropagation();
  },
  render: function(){
    var divStyle = {
      top: this.props.pos
    };
    return(
      <div className="annotation-area" style={divStyle} onClick={this.preventHide}>
        <h1>guru annotation</h1>
        {this.props.annotation.body}
      </div>
    );
  }
})

module.exports = AnnotationDetail;
