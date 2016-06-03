json.array!(@lyrics) do |lyric|
  json.id lyric.id
  json.title lyric.title
  json.artist lyric.artist
  json.album lyric.album
  json.lyricBody lyric.lyric_body
  json.image_url asset_path(lyric.image.url)
end
