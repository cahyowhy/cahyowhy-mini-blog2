class ApplicationMailer < ActionMailer::Base
  default from: 'from@example.com'
  layout 'mailer'
  attr_reader :app_config
  raw_config = File.read("#{Rails.root}/config/application.yml")
  @app_config = YAML.load(raw_config)
end
