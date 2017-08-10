shared_examples "running index method" do
  it "it return http success" do
    get :index
    expect(response).to have_http_status(:success)
  end
end

shared_examples "running show method" do
  it "it return http success" do
    get :show, :id => model.id
    expect(response).to have_http_status(:success)
  end
end

shared_examples "running delete method" do |class_model|
  it "it return http success" do
    request.headers['Authorization'] = token_generator(model.id)
    request.headers['Content-Type'] = "application/json"
    expect { delete :destroy, :id => model.id }.to change { class_model.count }.by(-1)
  end
end

shared_examples "running create method on valid param" do |class_model, model_attr|
  it "it return http success" do
    expect { post :create, model_attr => model }.to change { class_model.count }.by(+1)
    expect(response).to have_http_status(:created)
  end
end

shared_examples "running create method on invalid param" do |model_attr|
  it "it return http success" do
    model[:name]=nil
    post :create, model_attr => model
    expect(response).to have_http_status(:unprocessable_entity)
  end
end

shared_examples "running update method" do |model_attr|
  it "it return http success" do
    model_update.delete(:password)
    request.headers['Authorization'] = token_generator(model.id)
    request.headers['Content-Type'] = "application/json"

    put :update, :id => model.id, model_attr => model_update
    expect(response).to have_http_status(:success)
  end
end