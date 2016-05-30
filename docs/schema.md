# Schema Information

## annotations
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
body        | text      | not null
author_id   | integer   | not null, foreign key (references users), indexed
start_char  | integer   | not null
end_char    | integer   | not null
lyric_id    | integer   | not null, foreign key (references lyrics), indexed
archived    | boolean   | not null, default: false

## lyrics
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (references users), indexed
title       | string    | not null
artist      | string    | not null
album       | string    |
content     | text      | not null

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
