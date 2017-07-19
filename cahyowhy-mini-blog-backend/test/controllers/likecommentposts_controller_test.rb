require 'test_helper'

class LikecommentpostsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @likecommentpost = likecommentposts(:one)
  end

  test "should get index" do
    get likecommentposts_url, as: :json
    assert_response :success
  end

  test "should create likecommentpost" do
    assert_difference('Likecommentpost.count') do
      post likecommentposts_url, params: { likecommentpost: { commentpost_id: @likecommentpost.commentpost_id, post_id: @likecommentpost.post_id, user_id: @likecommentpost.user_id } }, as: :json
    end

    assert_response 201
  end

  test "should show likecommentpost" do
    get likecommentpost_url(@likecommentpost), as: :json
    assert_response :success
  end

  test "should update likecommentpost" do
    patch likecommentpost_url(@likecommentpost), params: { likecommentpost: { commentpost_id: @likecommentpost.commentpost_id, post_id: @likecommentpost.post_id, user_id: @likecommentpost.user_id } }, as: :json
    assert_response 200
  end

  test "should destroy likecommentpost" do
    assert_difference('Likecommentpost.count', -1) do
      delete likecommentpost_url(@likecommentpost), as: :json
    end

    assert_response 204
  end
end
