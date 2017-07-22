require 'test_helper'

class ImagepostsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @imagepost = imageposts(:one)
  end

  test "should get index" do
    get imageposts_url, as: :json
    assert_response :success
  end

  test "should create imagepost" do
    assert_difference('Imagepost.count') do
      post imageposts_url, params: { imagepost: { imageurl: @imagepost.imageurl, post_id: @imagepost.post_id, user_id: @imagepost.user_id } }, as: :json
    end

    assert_response 201
  end

  test "should show imagepost" do
    get imagepost_url(@imagepost), as: :json
    assert_response :success
  end

  test "should update imagepost" do
    patch imagepost_url(@imagepost), params: { imagepost: { imageurl: @imagepost.imageurl, post_id: @imagepost.post_id, user_id: @imagepost.user_id } }, as: :json
    assert_response 200
  end

  test "should destroy imagepost" do
    assert_difference('Imagepost.count', -1) do
      delete imagepost_url(@imagepost), as: :json
    end

    assert_response 204
  end
end
