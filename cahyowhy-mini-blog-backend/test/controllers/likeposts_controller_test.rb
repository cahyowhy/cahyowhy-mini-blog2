require 'test_helper'

class LikepostsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @likepost = likeposts(:one)
  end

  test "should get index" do
    get likeposts_url, as: :json
    assert_response :success
  end

  test "should create likepost" do
    assert_difference('Likepost.count') do
      post likeposts_url, params: { likepost: { post_id: @likepost.post_id, user_id: @likepost.user_id } }, as: :json
    end

    assert_response 201
  end

  test "should show likepost" do
    get likepost_url(@likepost), as: :json
    assert_response :success
  end

  test "should update likepost" do
    patch likepost_url(@likepost), params: { likepost: { post_id: @likepost.post_id, user_id: @likepost.user_id } }, as: :json
    assert_response 200
  end

  test "should destroy likepost" do
    assert_difference('Likepost.count', -1) do
      delete likepost_url(@likepost), as: :json
    end

    assert_response 204
  end
end
