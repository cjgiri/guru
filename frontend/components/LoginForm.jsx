var React = require("react"),
    ApiUtil = require("../util/apiUtil"),
    UserStore = require("../stores/user_store"),
    ErrorStore = require("../stores/error_store");

var ReactRouter = require('react-router'),
    hashHistory = ReactRouter.hashHistory;


var LoginForm = React.createClass({
  getInitialState:function(){
    return({
      errors: [],
      name: "",
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
  setPass: function(e){
    this.setState({password: e.target.value})
  },
  setName: function(e){
    this.setState({name: e.target.value})
  },
  loginUser: function(e){
    e.preventDefault();
    var credentials={password: this.state.password};
    if (this.state.name.indexOf("@") === -1){
      credentials.username = this.state.name;
    } else{
      credentials.email = this.state.name;
    }
    // TODO toggle modal/ show errors on failure to login
    ApiUtil.loginUser(credentials, this.props.toggleLoginModal);
  },
  loginGuest: function(e){
    e.preventDefault();
    var credentials={
      password: "password",
      username: "guest"
    };
    this.props.toggleLoginModal()
    ApiUtil.loginUser(credentials);
  },
  outerClick:function(e){
    classes = e.target.classList;
    for (var i = 0; i < classes.length; i++) {
      if (classes[i] = "modal-bg"){
        this.props.toggleLoginModal()
      }
    }
  },
  render:function(){
    if (this.props.modal === "login"){
      var errorModal = null;
      if(this.state.errors.length !== 0){
        errorModal = <div className="errors-flash"> {this.state.errors}</div>;
        }
      return(
        <div className="modal-bg" onClick={this.outerClick}>
          <div className="modal-box">
          <h1>SIGN IN</h1>
          {errorModal}
            <div className="modal-box-detail">
              <a href="/auth/twitter" className="twitter-auth">Sign in with Twitter</a>
              <form onSubmit={this.loginUser}>
                <label>
                Username or Email
                <br/>
                  <input type="text" value={this.state.name} onChange={this.setName}>
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
                <input type="submit" value="Login"></input>
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
module.exports = LoginForm;
