var React = require("react"),
    ReactRouter = require('react-router'),
    hashHistory = ReactRouter.hashHistory,
    UserStore = require('../../stores/user_store'),
    LoginForm = require("../LoginForm"),
    SignupForm = require("../SignupForm"),
    ApiUtil = require("../../util/apiUtil");

var NavAccount = React.createClass({
  getInitialState:function(){
    return( { user: UserStore.currentUser(), modal:"none" } );
  },
  componentDidMount: function(){
    UserStore.addListener(this.updateUser);
  },
  updateUser:function () {
    this.setState({ user: UserStore.currentUser()});
  },
  signOut:function(){
    ApiUtil.logoutUser();
  },
  toggleLoginModal:function(){
    var modalVal = this.state.modal;
    modalVal = (modalVal === "login") ? "none" : "login";
    this.setState({modal: modalVal});
  },
  toggleSignUpModal:function(){
    var modalVal = this.state.modal;
    modalVal = (modalVal === "signup") ? "none" : "signup";
    this.setState({modal: modalVal});
  },
  addSong: function(){
    hashHistory.push("/new");
  },
  render: function(){

    if(this.state.user.username){

      return(
        <div className="nav-user-actions">
          <strong>Hello, {this.state.user.username}!</strong>
          <div className="user-actions-dropdown">
            <a onClick={this.signOut}>Sign Out</a>
            <a onClick={this.addSong}>Add Song</a>
          </div>
        </div>
      )
    }else{
      return(
        <div className="nav-user-actions-logged-out">
          <a onClick={this.toggleSignUpModal}>Sign Up</a>
          <a onClick={this.toggleLoginModal}>Sign In</a>
          <LoginForm toggleLoginModal={this.toggleLoginModal} modal={this.state.modal}/>
          <SignupForm toggleSignUpModal={this.toggleSignUpModal} modal={this.state.modal}/>
        </div>
      )
    }
  }
});

module.exports = NavAccount;
