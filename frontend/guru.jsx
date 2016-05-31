//React
var React = require('react'),
    ReactDOM = require('react-dom');
//Router
var ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    hashHistory = ReactRouter.hashHistory;
//Components

var ApiUtil = require('./util/apiUtil');

var App = React.createClass({
  // mixins: [CurrentUserState],
  render: function(){
    return (
      <div>
        <header><h1>guru</h1></header>
        {this.props.children}
      </div>
    );
  }
});

var Router = (
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
  </Router>
);

document.addEventListener('DOMContentLoaded', function(){
  var root = document.getElementById('content');
  ReactDOM.render(Router, root);
});

window.ApiUtil = ApiUtil;
