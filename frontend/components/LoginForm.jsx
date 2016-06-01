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
    debugger
    if (UserStore.isUserLoggedIn()) {
      hashHistory.push("/");
    }
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
  render:function(){
    return(
      <form onSubmit={this.loginUser}>
        <label>
        Username or Email
          <input type="text" value={this.state.name} onChange={this.setName}>
          </input>
        </label>
        <label>
        Password
          <input type="password" value={this.state.password} onChange={this.setPass}>
          </input>
        </label>
        <input type="submit"></input>
      </form>
    )
  }
});
module.exports = LoginForm;
