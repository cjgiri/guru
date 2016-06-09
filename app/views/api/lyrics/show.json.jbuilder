json.id @lyric.id
json.title @lyric.title
json.artist @lyric.artist
json.album @lyric.album
json.lyricBody @lyric.lyric_body
json.image_url asset_path(@lyric.image.url)
json.annotations @lyric.annotations do |annot|
  json.id annot.id
  json.author annot.author.username
  json.lyricId annot.lyric_id
  json.authorId annot.author_id
  json.start_char annot.start_char
  json.end_char annot.end_char
  json.body annot.body
end
