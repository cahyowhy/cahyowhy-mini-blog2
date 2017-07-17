require 'test_helper'

class PostcommentlikesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @postcommentlike = postcommentlikes(:one)
  end

  test "should get index" do
    get postcommentlikes_url, as: :json
    assert_response :success
  end

  test "should create postcommentlike" do
    assert_difference('Postcommentlike.count') do
      post postcommentlikes_url, params: { postcommentlike: { postcomment_id: @postcommentlike.postcomment_id, user_id: @postcommentlike.user_id } }, as: :json
    end

    assert_response 201
  end

  test "should show postcommentlike" do
    get postcommentlike_url(@postcommentlike), as: :json
    assert_response :success
  end

  test "should update postcommentlike" do
    patch postcommentlike_url(@postcommentlike), params: { postcommentlike: { postcomment_id: @postcommentlike.postcomment_id, user_id: @postcommentlike.user_id } }, as: :json
    assert_response 200
  end

  test "should destroy postcommentlike" do
    assert_difference('Postcommentlike.count', -1) do
      delete postcommentlike_url(@postcommentlike), as: :json
    end

    assert_response 204
  end
end
