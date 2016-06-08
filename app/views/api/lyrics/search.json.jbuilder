json.array!(@lyrics) do |lyric|
  json.id lyric.id
  json.title lyric.title
  json.artist lyric.artist
  json.album lyric.album
end
