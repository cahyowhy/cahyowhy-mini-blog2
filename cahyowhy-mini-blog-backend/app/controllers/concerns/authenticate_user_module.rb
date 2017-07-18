module AuthenticateUserModule
  def authenticateUserModule()
    @curent_user = AuthorizeApiRequest.call(request.headers).result
    render json: {message: "not Authorized", status: authfailed()}, status: authfailed() unless @curent_user
  end
end