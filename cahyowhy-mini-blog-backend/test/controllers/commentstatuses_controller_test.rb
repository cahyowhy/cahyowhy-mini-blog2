require 'test_helper'

class CommentstatusesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @commentstatus = commentstatuses(:one)
  end

  test "should get index" do
    get commentstatuses_url, as: :json
    assert_response :success
  end

  test "should create commentstatus" do
    assert_difference('Commentstatus.count') do
      post commentstatuses_url, params: { commentstatus: { comment: @commentstatus.comment, post_id: @commentstatus.post_id, user_id: @commentstatus.user_id } }, as: :json
    end

    assert_response 201
  end

  test "should show commentstatus" do
    get commentstatus_url(@commentstatus), as: :json
    assert_response :success
  end

  test "should update commentstatus" do
    patch commentstatus_url(@commentstatus), params: { commentstatus: { comment: @commentstatus.comment, post_id: @commentstatus.post_id, user_id: @commentstatus.user_id } }, as: :json
    assert_response 200
  end

  test "should destroy commentstatus" do
    assert_difference('Commentstatus.count', -1) do
      delete commentstatus_url(@commentstatus), as: :json
    end

    assert_response 204
  end
end
