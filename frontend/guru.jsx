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
var LoginForm = require('./components/LoginForm'),
    NavBar = require('./components/nav/NavBar');

//debugging
var ApiUtil = require('./util/apiUtil');
var UserStore = require("./stores/user_store");

var App = React.createClass({
  render: function(){
    return (
      <div>
        <NavBar/>
        {this.props.children}
      </div>
    );
  }
});

function _attemptLogin(nextState, replace, asyncDoneCallback) {
  if (UserStore.currentUserHasBeenFetched()) {
    completeFunction();
  } else {
    ApiUtil.fetchCurrentUser(completeFunction);
  }
  function completeFunction() {
    asyncDoneCallback();
  }
}

// function _ensureLoggedIn(nextState, replace, asyncDoneCallback) {
//
//   if (UserStore.currentUserHasBeenFetched()) {
//     redirectIfNotLoggedIn();
//   } else {
//     ApiUtil.fetchCurrentUser(redirectIfNotLoggedIn);
//   }
//
//   function redirectIfNotLoggedIn() {
//     if (!UserStore.isUserLoggedIn()) {
//
//       replace('/login');
//     }
//
//     asyncDoneCallback();
//   }
// }


var Router = (
  <Router history={hashHistory}>
    <Route path="/" component={App} onEnter={_attemptLogin}>
      <Route path="/login" component={LoginForm}></Route>
    </Route>
  </Router>
);

document.addEventListener('DOMContentLoaded', function(){
  var root = document.getElementById('content');
  ReactDOM.render(Router, root);
});

window.ApiUtil = ApiUtil;
window.UserStore = UserStore;
