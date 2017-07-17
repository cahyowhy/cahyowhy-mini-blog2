require 'test_helper'

class CommentpostsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @commentpost = commentposts(:one)
  end

  test "should get index" do
    get commentposts_url, as: :json
    assert_response :success
  end

  test "should create commentpost" do
    assert_difference('Commentpost.count') do
      post commentposts_url, params: { commentpost: { comment: @commentpost.comment, post_id: @commentpost.post_id, user_id: @commentpost.user_id } }, as: :json
    end

    assert_response 201
  end

  test "should show commentpost" do
    get commentpost_url(@commentpost), as: :json
    assert_response :success
  end

  test "should update commentpost" do
    patch commentpost_url(@commentpost), params: { commentpost: { comment: @commentpost.comment, post_id: @commentpost.post_id, user_id: @commentpost.user_id } }, as: :json
    assert_response 200
  end

  test "should destroy commentpost" do
    assert_difference('Commentpost.count', -1) do
      delete commentpost_url(@commentpost), as: :json
    end

    assert_response 204
  end
end
