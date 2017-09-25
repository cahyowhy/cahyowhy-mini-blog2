module AuthenticateUserModule
  def authenticateUserModule()
    # mau ngene -> unless @curent_user || !@curent_user.confirmed
    @curent_user = AuthorizeApiRequest.call(request.headers).result
    render json: {message: "not Authorized", status: authfailed}, status: authfailed() unless @curent_user
  end
end