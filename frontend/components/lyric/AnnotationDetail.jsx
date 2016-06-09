var React = require('react'),
    UserStore = require('../../stores/user_store'),
    ApiUtil = require('../../util/apiUtil');

var AnnotationDetail = React.createClass({
  getInitialState: function(){
    return ({editing: false, bodyText: "empty"})
  },
  preventHide: function(e){
    e.stopPropagation();
  },
  editPost: function(e){
    e.preventDefault();
    this.setState({
      editing:true,
      bodyText: this.props.annotation.body
    })
  },
  deletePost: function(e){
    e.preventDefault();
    ApiUtil.destroyAnnotation(this.props.annotation.id)
  },
  setAnnotationBody: function(e){
    e.preventDefault();
    this.setState( { bodyText: e.target.value } );
  },
  submitAnnotation: function(e){
    e.preventDefault();
    ApiUtil.updateAnnotation({
      id: this.props.annotation.id,
      body: this.state.bodyText
    })
  },
  toggleForm: function(e){
    e.preventDefault();
    e.stopPropagation();
    this.setState( { editing: false } );
  },
  protectForm: function(e){
    e.stopPropagation();
  },
  render: function(){
    var divStyle = {
      top: this.props.pos
    };
    var editOptions= null;
    if (this.state.editing){
      return(
        <div className="annotation-area" onClick={this.protectForm} style={divStyle}>
          <form>
            <span className="annotatable-text"> {this.props.selectedText}</span>
            <label>
              <textarea onChange={this.setAnnotationBody} value={this.state.bodyText}/>
            </label>
            <input onClick={this.submitAnnotation} type="submit" value="Submit" className="begin-annotation" />
            <button className="annot-button cancel-annotation" onClick={this.toggleForm}>Cancel</button>
          </form>
        </div>
      )
    }
    else if (UserStore.currentUser().id === this.props.annotation.authorId){
      editOptions = <div className="group">
        <button className="annot-button delete-button" onClick={this.deletePost}>delete</button>
        <button className="annot-button edit-button" onClick={this.editPost}>edit</button>
      </div>
    }
    return(
      <div className="annotation-area" style={divStyle} onClick={this.preventHide}>
        <div className="group">
          <h1>guru annotation</h1> <h2>by {this.props.annotation.author} </h2>
        </div>
        {this.props.annotation.body}
        {editOptions}
      </div>
    );
  }
})

module.exports = AnnotationDetail;
