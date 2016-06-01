var React = require("react"),
    ReactRouter = require('react-router'),
    hashHistory = ReactRouter.hashHistory;

var NavSearch = React.createClass({
  render: function(){
    return(
      <div className="nav-search-holder">
        <input placeholder="Search lyrics" className="nav-search">
        </input>
      </div>
    )
  }
});

module.exports = NavSearch;
