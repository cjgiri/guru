var React = require("react"),
    ReactRouter = require('react-router'),
    hashHistory = ReactRouter.hashHistory,
    ApiUtil = require('../../util/apiUtil'),
    SearchStore = require('../../stores/search_store');

var NavSearch = React.createClass({
  getInitialState: function(){
    return({
      query: "",
      results: [],
      focused: false
    })
  },
  componentDidMount: function(){
    this.searchListener = SearchStore.addListener(this.updateSearchResults);
    window.addEventListener('click', this.checkSearchClick);
  },
  componentWillUnmount: function(){
    this.searchListener.remove();
    window.removeEventListener(this.checkSearchClick);
  },
  checkSearchClick: function(e){
    if (!this.domNode.contains(e.target)){
      document.getElementById('search-bar').value = '';
      this.setState({focused: false, results: []});
    }
  },
  updateSearch: function(e){
    e.preventDefault();
    var queryString = e.target.value;
    if (queryString === ""){
      this.setState({results: []});
    } else{
      ApiUtil.searchLyrics(queryString);
    }
    this.setState({query: queryString});
  },
  updateSearchResults: function(){
    this.setState( {results: SearchStore.all()} )
  },
  styleSearch: function(e){
    debugger
    var newFocusedState = !this.state.focused
    if (!newFocusedState){
      document.getElementById('search-bar').value = '';
      this.setState({focused: false, results: []});
    }
    this.setState({focused: newFocusedState});
  },
  searchRedirect: function(e){
    debugger
    document.getElementById('search-bar').value = '';
    hashHistory.push('/lyrics/'+e.target.dataset.lyricId);
    this.setState({focused: false, results: []});
  },
  getDomNode: function(node){
    this.domNode = node;
  },
  render: function(){
    var divClass = "nav-search-holder";
    var inputClass = "nav-search";
    var placeholder = "Search lyrics"
    if (this.state.focused){
      placeholder = "";
    }
    return(
      <div className={divClass} ref={this.getDomNode}>
        <input id="search-bar" placeholder={placeholder} className={inputClass} onFocus={this.styleSearch} onChange={this.updateSearch}>
        </input>
        <ul className="results-list">
          {this.state.results.map(function(object, index){
            return(<li key={index} data-lyric-id={object.id} onClick={this.searchRedirect}>
              {object.artist} - {object.title}
            </li>)
          }.bind(this))}
      </ul>
      </div>
    )
  }
});

module.exports = NavSearch;
