require 'test_helper'

class PostcommentsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @postcomment = postcomments(:one)
  end

  test "should get index" do
    get postcomments_url, as: :json
    assert_response :success
  end

  test "should create postcomment" do
    assert_difference('Postcomment.count') do
      post postcomments_url, params: { postcomment: { comment: @postcomment.comment, user_id: @postcomment.user_id } }, as: :json
    end

    assert_response 201
  end

  test "should show postcomment" do
    get postcomment_url(@postcomment), as: :json
    assert_response :success
  end

  test "should update postcomment" do
    patch postcomment_url(@postcomment), params: { postcomment: { comment: @postcomment.comment, user_id: @postcomment.user_id } }, as: :json
    assert_response 200
  end

  test "should destroy postcomment" do
    assert_difference('Postcomment.count', -1) do
      delete postcomment_url(@postcomment), as: :json
    end

    assert_response 204
  end
end
