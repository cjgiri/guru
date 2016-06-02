var React = require("react"),
    ApiUtil = require("../util/apiUtil"),
    UserStore = require("../stores/user_store");

var ReactRouter = require('react-router'),
    hashHistory = ReactRouter.hashHistory;


var SignupForm = React.createClass({
  getInitialState:function(){
    return({
      username: "",
      email: "",
      password: ""
    });
  },
  componentDidMount: function(){
    UserStore.addListener(this.login_success_check);
  },
  login_success_check:function(){
    // if (UserStore.isUserLoggedIn()) {
    //   hashHistory.push("/");
    // }
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
  render:function(){
    if (this.props.modal === "signup"){
      return(
        <div className="modal-bg" onClick={this.outerClick}>
          <div className="modal-box">
          <h1>SIGN UP</h1>
            <div className="modal-box-detail">
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
