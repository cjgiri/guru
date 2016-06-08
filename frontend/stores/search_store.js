var Dispatcher=require('../dispatcher/dispatcher'),
    Store = require('flux/utils').Store,
    AppConstants = require('../constants/app_constants');

var _results = {};

var SearchStore = new Store(Dispatcher);

SearchStore.setResults = function(results){
  _results = {};
  results.forEach(function(result){
    _results[result.id] = result;
  })
};

SearchStore.all = function(){
  var results = [];
  for (var id in _results){
    results.push(_results[id]);
  }
  return results;
};

SearchStore.__onDispatch = function(payload){
  switch (payload.actionType) {
    case AppConstants.RESULTSRECIEVED:
      SearchStore.setResults(payload.results);
      SearchStore.__emitChange();
      break;
  }
}

module.exports = SearchStore;
