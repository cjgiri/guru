var React = require("react"),
    ReactRouter = require('react-router'),
    hashHistory = ReactRouter.hashHistory,
    NavSearch = require('./NavSearch'),
    NavAccount = require('./NavAccount');


var NavBar = React.createClass({
  render: function(){
    return(
      <header className="navBar group">
        <NavSearch/>
        <a href="/" className="navBar-logo">GURU</a>
        <NavAccount/>
      </header>
    )
  }
});

module.exports = NavBar;
