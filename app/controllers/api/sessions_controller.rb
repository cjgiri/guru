class Api::SessionsController < ApplicationController

  def create
    # TODO call find by email or username based on context
    @user = User.find_by_credentials(params[:user][:username], params[:user][:email], params[:user][:password])

    if @user
			login(@user)
			render "api/users/show"
		else
			@errors = ['invalid credentials']
			render json: [@errors]
		end
  end

  def twitter_create
    @user = User.find_or_create_by_auth_hash(auth_hash)
    if @user
			login(@user)
			redirect_to root_url
		else
			@errors = ['invalid credentials']
			render json: [@errors]
		end
  end

  def destroy
		@user = current_user
		if @user
			logout
			render "api/users/show"
		else
			@errors = ['no one logged in']
			render json: @errors
		end
	end

	def show
		if current_user
			@user = current_user
			render "api/users/show"
		else
			@errors = {}
			render json: @errors
		end
	end

  private

   def auth_hash
     request.env['omniauth.auth']
   end

end
