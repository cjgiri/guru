class Api::LyricController < ApplicationController

  def create
		@lyric = current_user.lyrics.new(lyric_params)
		if @lyric.save
			render json: @lyric
		else
			@errors = @lyric.errors.full_messages
			render json: @errors
		end
	end

	def show
		@lyric = Lyric.find_by_id(params[:id])
		if @lyric
			render "api/lyrics/show"
		else
			render json: nil, status: 404
		end
	end

	def index
		@lyrics = Lyric.all
		if @lyrics
			render "api/lyrics/index"
		else
			render json: nil, status: 404
		end
	end

	private

	def lyric_params
		params.require(:lyric).permit(:title, :artist, :album, :lyric_body)
	end

end
