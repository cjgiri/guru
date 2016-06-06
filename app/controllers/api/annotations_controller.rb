class Api::AnnotationsController < ApplicationController

  def create
    @annotation = current_user.annotations.new(annotation_params)
    if @annotation.save
      @lyric = @annotation.lyric
			render "api/lyrics/show"
		else
			@errors = @annotation.errors.full_messages
			render json: @errors
		end
	end


	private

	def annotation_params
		params.require(:annotation).permit(:body, :lyric_id, :start_char, :end_char)
	end

end
