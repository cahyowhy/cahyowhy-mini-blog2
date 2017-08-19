shared_examples "running index method" do
  it "it return http success" do
    get :index
    request.headers['Content-Type'] = "application/json"
    expect(response).to have_http_status(:success)
  end
end

shared_examples "running show method" do
  it "it return http success" do
    get :show, :id => model.id
    request.headers['Content-Type'] = "application/json"
    expect(response).to have_http_status(:success)
  end
end

shared_examples "running delete method" do |class_model|
  it "it return http success" do
    request.headers['Authorization'] = class_name == "user" ? token_generator(model.id) : token_generator(model.user_id)
    request.headers['Content-Type'] = "application/json"
    expect { delete :destroy, :id => model.id }.to change { class_model.count }.by(-1)
  end
end

shared_examples "running create method on valid param" do |class_model, model_attr|
  it "it return http success" do
    unless class_name=="user"
      request.headers['Authorization'] = token_generator(user.id)
      model[:user_id] = user.id
      model[:status_id] = status.id if class_name == "commentstatus" || class_name == "imagestatus"
      model[:post_id] = post.id if class_name == "commentpost" || class_name == "imagepost"
    end

    request.headers['Content-Type'] = "application/json"
    puts model
    expect { post :create, model_attr => model }.to change { class_model.count }.by(+1)
    expect(response).to have_http_status(:created)
  end
end

shared_examples "running create method on invalid param" do |model_attr|
  it "it return http success" do
    model[:name]=nil
    unless class_name=="user"
      request.headers['Authorization'] = token_generator(user.id)
      # set user id to nil to simulate invalid param unless user
      model[:user_id] = nil
    end
    request.headers['Content-Type'] = "application/json"
    post :create, model_attr => model
    expect(response).to have_http_status(:unprocessable_entity)
  end
end

shared_examples "running update method" do |model_attr|
  it "it return http success" do
    model_update.delete(:password)
    request.headers['Authorization'] = class_name == "user" ? token_generator(model.id) : token_generator(model.user_id)
    request.headers['Content-Type'] = "application/json"

    put :update, :id => model.id, model_attr => model_update
    expect(response).to have_http_status(:success)
  end
end