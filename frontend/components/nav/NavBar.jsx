var React = require("react"),
    ReactRouter = require('react-router'),
    hashHistory = ReactRouter.hashHistory,
    NavSearch = require('./NavSearch'),
    NavAccount = require('./NavAccount');


var NavBar = React.createClass({
  toIndex:function(){
    hashHistory.push("/");
  },
  render: function(){
    return(
      <header className="navBar group">
        <NavSearch/>
        <a className="navBar-logo" onClick={this.toIndex}>GURU</a>
        <NavAccount/>
      </header>
    )
  }
});

module.exports = NavBar;
