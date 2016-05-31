class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.

  #TODO comment this back in
  # protect_from_forgery with: :exception

  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def login user
    session[:session_token] = user.restore_session_token!
  end

  def logout
    session[:session_token] = nil
    current_user.restore_session_token!
    @current_user = nil
  end

end
