var React = require("react"),
    ReactRouter = require('react-router'),
    hashHistory = ReactRouter.hashHistory,
    ApiUtil = require('../../util/apiUtil'),
    SearchStore = require('../../stores/search_store');

var NavSearch = React.createClass({
  getInitialState: function(){
    return({
      query: "",
      results: null
    })
  },
  componentDidMount: function(){
    this.searchListener = SearchStore.addListener(this.updateSearchResults);
  },
  componentWillUnmount: function(){
    this.searchListener.remove();
  },
  updateSearch: function(e){
    e.preventDefault();
    var queryString = e.target.value;
    if(queryString !== ""){
      ApiUtil.searchLyrics(queryString);
    }
    this.setState({query: queryString});
  },
  updateSearchResults: function(){
    this.setState( {results: SearchStore.all()} )
  },
  render: function(){
    debugger
    return(
      <div className="nav-search-holder">
        <input placeholder="Search lyrics" className="nav-search" onChange={this.updateSearch}>
        </input>
      </div>
    )
  }
});

module.exports = NavSearch;
