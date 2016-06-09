class Api::LyricController < ApplicationController

  def create
		@lyric = current_user.lyrics.new(lyric_params)
    if params[:lyric][:image_url] != ""
      @lyric.image = open(params[:lyric][:image_url])
    end
		if @lyric.save

			render json: @lyric
		else
			@errors = @lyric.errors.full_messages
			render json: @errors
		end
	end

	def show
    @lyric = Lyric.includes(annotations: :author).find_by_id(params[:id])
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

  def search
    if params[:query].present?
      @lyrics = Lyric.search_by_metadata(params[:query]).limit(10);
      render "api/lyrics/search"
    else
      render json: []
    end
  end

	private

	def lyric_params
		params.require(:lyric).permit(:title, :artist, :album, :lyric_body)
	end

end
