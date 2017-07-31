class CommentstatusSerializer < BaseSerializer
  attributes :id, :comment, :created_at
  has_one :user
  has_one :status

  def status
    {id: object.status.id}
  end
end