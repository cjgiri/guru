class Api::AnnotationController < ApplicationController

  def create
    @annotation = current_user.annotations.new(annotation_params)
	end


	private

	def annotation_params
		params.require(:annotation).permit(:body, :lyric_id, :start_char, :end_char)
	end

end
