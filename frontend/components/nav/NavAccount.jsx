var React = require("react"),
    ReactRouter = require('react-router'),
    hashHistory = ReactRouter.hashHistory,
    UserStore = require('../../stores/user_store'),
    LoginForm = require("../LoginForm"),
    ApiUtil = require("../../util/apiUtil");

var NavAccount = React.createClass({
  getInitialState:function(){
    return( { user: UserStore.currentUser(), modal:"none" } );
  },
  componentDidMount: function(){
    UserStore.addListener(this.updateUser);
  },
  updateUser:function () {
    debugger
    this.setState({ user: UserStore.currentUser()});
  },
  signOut:function(){
    ApiUtil.logoutUser();
    debugger
  },
  toggleLoginModal:function(){
    var modalVal = this.state.modal;
    modalVal = (modalVal === "none") ? "login" : "none";
    this.setState({modal: modalVal});
  },
  toggleSignUpModal:function(){

  },
  render: function(){
    // if(UserStore.isUserLoggedIn() === true){
    if(this.state.user.username){

      return(
        <div className="nav-user-actions">
          <a onClick={this.signOut}>Sign Out</a>
        </div>
      )
    }else{
      return(
        <div className="nav-user-actions">
          <a onClick={this.signUp}>Sign Up</a>
          <a onClick={this.toggleLoginModal}>Sign In</a>
          <LoginForm toggleLoginModal={this.toggleLoginModal} modal={this.state.modal}/>
        </div>
      )
    }
  }
});

module.exports = NavAccount;
