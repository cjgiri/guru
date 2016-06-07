# Guru

[Heroku link][heroku]

[heroku]: http://www.guruapp.herokuapp.com

## Minimum Viable Product



Guru is a lyric annotation app inspired by Genius and built on Ruby on Rails and React. When complete, it will at minimum meet the following criteria:

- [ ] New account creation, login, and guest/demo login
- [ ] Smooth, bug-free navigation
- [ ] Adequate seed data to demonstrate the site's features
- [ ] Core lyric upload and annotation functionality to match Genius
- [x] Hosting on Heroku
- [x] Beautiful CSS
- [ ] A production README, replacing this README

## Product Goals and Priorities

Guru will allow users to do the following:

<!-- This is a Markdown checklist. Use it to keep track of your
progress. Put an x between the brackets for a checkmark: [x] -->

- [ ] Create an account (MVP)
- [ ] Log in / Log out, including as a Guest/Demo User (MVP)
- [ ] Create, read, edit, and delete lyrics (MVP)
- [ ] Create, read, edit, and delete annotations using text highlighting for selection (MVP)
- [ ] Allow music upload for playback on lyric show page (hopeful feature, but not MVP)
- [ ] Add upvoteable comments to annotations and lyrics (hopeful feature, but not MVP)

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Cycles][flux-cycles]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: ./docs/views.md
[components]: ./docs/components.md
[flux-cycles]: ./docs/flux-cycles.md
[api-endpoints]: ./docs/api-endpoints.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: Backend setup and User Authentication (0.5 days)

**Objective:** Functioning rails project with Authentication

- [x] create new project
- [x] create `User` model
- [ ] authentication
- [x] user signup/signin pages
- [x] blank landing page after signin

### Phase 2: Lyrics Model, API, and basic APIUtil (1 days)

**Objective:** Lyrics can be created, read, edited and destroyed through
the API.

- [x] create `Lyric` model
- [x] seed the database with a small amount of test data
- [ ] CRUD API for lyrics (`LyricsController`)
- [x] jBuilder views for lyrics
- [x] setup Webpack & Flux scaffold
- [x] setup `APIUtil` to interact with the API
- [x] test out API interaction in the console.

### Phase 3: Flux Architecture and Router (1 days)

**Objective:** Lyrics can be created, read, edited and destroyed with the
user interface.

- [x] setup the flux loop with skeleton files
- [x] setup React Router
- implement each lyric component, building out the flux loop as needed.
  - [x] `LyricsIndex`
  - [x] `LyricIndexItem`
  - [x] `LyricForm`
- [x] save Lyrics to the DB when the form loses focus or is left idle
  after editing.

### Phase 4: Start Styling (0.5 days)

**Objective:** Existing pages (including singup/signin) will look good.

- [ ] create a basic style guide
- [x] position elements on the page
- [x] add basic colors & styles

### Phase 5: Annotations (2.5 days)

**Objective:** Annotations can be made on and viewed by lyric.

- [x] create `Annotation` model
- build out API, Flux loop, and components for:
  - [ ] Annotation CRUD
  - [x] annotations can only be added to lyrics, cannot override existing annotations
  - [x] annotation selection is done directly from in-lyric links
- Use CSS to style new views


### Phase 6: Styling Cleanup and Seeding (1.5 day)

**objective:** Make the site feel more cohesive and awesome.

- [ ] Get feedback on my UI from others
- [ ] Refactor HTML classes & CSS rules
- [ ] Add modals, transitions, and other styling flourishes.

### Bonus Features (TBD)
- [ ] Enable video link embeds to play music with on lyric show
- [ ] Add upvoteable comments to lyrics
- [ ] Add upvoteable comments to annotations
- [ ] Pagination / infinite scroll for Lyrics Index

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
