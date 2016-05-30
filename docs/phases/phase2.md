# Phase 2: Flux Architecture and Lyric CRUD / style (1.5 days)

## Rails
### Models

### Controllers

### Views

## Flux
### Views (React Components)
* LyricsIndex
  - LyricsIndexItem
* LyricForm

### Stores
* Lyric

### Actions
* ApiActions.receiveAllLyrics -> triggered by ApiUtil
* ApiActions.receiveSingleLyric
* ApiActions.deleteLyric
* LyricActions.fetchAllLyrics -> triggers ApiUtil
* LyricActions.fetchSingleLyric
* LyricActions.createLyric
* LyricActions.editLyric
* LyricActions.destroyLyric

### ApiUtil
* ApiUtil.fetchAllLyrics
* ApiUtil.fetchSingleLyric
* ApiUtil.createLyric
* ApiUtil.editLyric
* ApiUtil.destroyLyric

## Gems/Libraries
* Flux Dispatcher (npm)
