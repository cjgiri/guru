var React = require("react"),
    ReactRouter = require('react-router'),
    hashHistory = ReactRouter.hashHistory;


var Footer = React.createClass({
  render: function(){
    return(
      <footer className="footer group">
        Site by Chris Giri
      </footer>
    )
  }
});

module.exports = Footer;
