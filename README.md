# Guru

[Guru live][heroku]

[heroku]: http://guruapp.herokuapp.com

Guru is a full-stack web application inspired by Genius.  It utilizes Ruby on Rails on the backend, a PostgreSQL database, and React.js with a Flux architectural framework on the frontend.  

## Features & Implementation

### Lyric Creation

All lyrics are stored in a `lyrics` table, and managed on the front end in a `lyric_store`. Notably, lyric
 upload does not require the user to upload album art. Instead, the art is fetched on the fly from the
 last.fm api.

### Annotations

Annotations are the cornerstone of Genius, and are also the most interesting feature of Guru.
At the database level, annotations are stored in an `annotations` table, and contain
a `body`, `start_char` and `end_char`, and are related to users via `user_id` and lyrics via
`lyric_id`. Annotations are displayed in <span> tags that are used to delineate: whether or not a lyric is annotated, its absolute start index, and its annotation id.

To create a new annotation, a user must simply highlight the text they would like to annotate. If they are not
logged in, nothing happens. Otherwise, a document.getSelection() finds the indices relative to the current span, and sums it to its absolute start position (stored as HTML data). This brings up an annotation edit form, positioned absolutely next to the selection.  The annotation is saved without a page refresh and immediately appears on the text. To change an annotation, its author can simply select an annotation and click 'edit' or 'delete'.


## Future Improvements

There is always more work to be done! Some of the features I'd like to implement include:

### Highlight persistence

Currently, annotatable text loses highlight when a user enters the annotation textarea. I use a stopgap solution of displaying that text above the form, but that's not ideal.

### Track data and editing

More data is better! I'd like to add track details, tagging, audio upload, and general metadata. Ideally, all of this data could be edited.

### Upvotes and comments

Ideally, everything will be commentable and upvotable, with users having a karma score based on their annotations and comments being voted on.

### Pagination or infinite scroll

Guru has no pagination! The entire database is displayed on the index page. It might also be nice to order them by view count or recency.

### User page

A page that shows all of a user's uploaded tracks and annotations, along with options if that user is logged in.
