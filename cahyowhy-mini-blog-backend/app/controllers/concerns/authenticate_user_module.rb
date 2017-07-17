module AuthenticateUserModule
	def authenticateUserModule()
		@curent_user = AuthorizeApiRequest.call(request.headers).result
		render json: {message:"not Authorized",status: 401}, status: 401 unless @curent_user
	end 
end