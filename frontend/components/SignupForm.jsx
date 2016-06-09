var React = require("react"),
    ApiUtil = require("../util/apiUtil"),
    UserStore = require("../stores/user_store"),
    ErrorStore = require("../stores/error_store");

var ReactRouter = require('react-router'),
    hashHistory = ReactRouter.hashHistory;

var SignupForm = React.createClass({
  getInitialState:function(){
    return({
      errors: [],
      username: "",
      email: "",
      password: ""
    });
  },
  componentDidMount: function(){
    this.errorListener = ErrorStore.addListener(this.errorCheck);
  },
  componentWillUnmount: function(){
    this.errorListener.remove();
  },
  errorCheck: function(){
    var errors = ErrorStore.formErrors("login");
    this.setState({errors: errors});
  },
  loginUser: function(e){
    e.preventDefault();
    ApiUtil.createUser({
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }, this.props.toggleSignUpModal);
  },
  setPass: function(e){
    this.setState({password: e.target.value})
  },
  setUserame: function(e){
    this.setState({username: e.target.value})
  },
  setEmail: function(e){
    this.setState({email: e.target.value})
  },
  outerClick:function(e){
    classes = e.target.classList;
    for (var i = 0; i < classes.length; i++) {
      if (classes[i] = "modal-bg"){
        this.props.toggleSignUpModal()
      }
    }
  },
  loginGuest: function(e){
    e.preventDefault();
    var credentials={
      password: "password",
      username: "guest"
    };
    ApiUtil.loginUser(credentials, this.props.toggleSignUpModal);
  },
  render:function(){
    var errorModal = null;
    if(this.state.errors.length !== 0){
      errorModal = <div className="errors-flash"> {this.state.errors}</div>;
    }
    if (this.props.modal === "signup"){
      return(
        <div className="modal-bg" onClick={this.outerClick}>
          <div className="modal-box">
          <h1>SIGN UP</h1>
          {errorModal}
            <div className="modal-box-detail">
              <a href="/auth/twitter" className="twitter-auth">Sign up with Twitter</a>
              <form onSubmit={this.loginUser}>
                <label>
                Username
                <br/>
                  <input type="text" value={this.state.username} onChange={this.setUserame}>
                  </input>
                </label>
                <br/>
                <label>
                Email
                <br/>
                  <input type="text" value={this.state.email} onChange={this.setEmail}>
                  </input>
                </label>
                <br/>
                <label>
                Password
                <br/>
                  <input type="password" value={this.state.password} onChange={this.setPass}>
                  </input>
                </label>
                <br/>
                <input type="submit" value="Sign Up"></input>
                <a className="guest-button" onClick={this.loginGuest}>Login as Guest</a>
              </form>
            </div>
          </div>
        </div>
      )
    }
    else{
      return(<div/>)
    }
  }
});
module.exports = SignupForm;
