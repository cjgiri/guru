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

  def destroy
    @annotation = Annotation.find(params[:id])

    if @annotation
      @lyric = @annotation.lyric
      @annotation.destroy!
      render "api/lyrics/show"
    else
      @errors = ['annotation not found']
      render json: @errors
    end
  end

  def update
    @annotation = Annotation.find(params[:id])
    if @annotation

      @annotation.update(body: params[:body])
      @lyric = @annotation.lyric
      render "api/lyrics/show"
    else
      @errors = ['annotation not found']
      render json: @errors
    end
  end

	private

	def annotation_params
		params.require(:annotation).permit(:body, :lyric_id, :start_char, :end_char)
	end

end
