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
    NavBar = require('./components/nav/NavBar'),
    LyricsIndex = require('./components/LyricsIndex'),
    NewLyric = require('./components/NewLyric');

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

var Router = (
  <Router history={hashHistory}>
    <Route path="/" component={App} onEnter={_attemptLogin}>
      <IndexRoute component={LyricsIndex}/>
      <Route path="new" component={NewLyric} onEnter={_attemptLogin}/>
    </Route>
  </Router>
);

document.addEventListener('DOMContentLoaded', function(){
  var root = document.getElementById('content');
  ReactDOM.render(Router, root);
});

window.ApiUtil = ApiUtil;
window.UserStore = UserStore;


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
