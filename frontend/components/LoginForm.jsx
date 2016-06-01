var React = require("react"),
    ApiUtil = require("../util/apiUtil"),
    UserStore = require("../stores/user_store");

var ReactRouter = require('react-router'),
    hashHistory = ReactRouter.hashHistory;


var LoginForm = React.createClass({
  getInitialState:function(){
    return({
      name: "",
      password: ""
    });
  },
  componentDidMount: function(){
    UserStore.addListener(this.login_success_check);
  },
  login_success_check:function(){
    // debugger
    // if (UserStore.isUserLoggedIn()) {
    //   hashHistory.push("/");
    // }
  },
  setPass: function(e){
    this.setState({password: e.target.value})
  },
  setName: function(e){
    this.setState({name: e.target.value})
  },
  loginUser: function(){
    var credentials={password: this.state.password};
    if (this.state.name.indexOf("@") === -1){
      credentials.username = this.state.name;
    } else{
      credentials.email = this.state.name;
    }
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
      return(
        <div className="modal-bg" onClick={this.outerClick}>
          <div className="modal-box">
          <h1>SIGN IN</h1>
            <div className="modal-box-detail">
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
