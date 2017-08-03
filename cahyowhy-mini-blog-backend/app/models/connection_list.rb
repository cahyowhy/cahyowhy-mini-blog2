class ConnectionList
  attr_accessor :users
  @users=[]

  def self.all
    @users
  end

  def self.add(param)
    is_user_online = @users.any? { |item| item[:id] == param[:id] }
    @users << param unless is_user_online
  end

  def self.remove(param)
    users=[]
    @users.each do |item|
      users<<item unless item[:id]==param[:id]
    end
    @users=users
  end
end