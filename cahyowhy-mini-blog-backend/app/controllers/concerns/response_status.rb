module Response_status
  def getsuccess()
    200
  end

  def getfailed()
    400
  end

  def postsuccess()
    201
  end

  def postfailed()
    401
  end

  def updatesuccess()
    202
  end

  def updatefailed()
    402
  end

  def deletesuccess()
    203
  end

  def deletefailed()
    403
  end

  def authsucces()
    204
  end

  def authfailed()
    404
  end

  def followsucces()
    205
  end

  def followfailed()
    405
  end

  def unfollowsucces()
    206
  end

  def unfollowfailed()
    406
  end
end