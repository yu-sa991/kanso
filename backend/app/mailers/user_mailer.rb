# frozen_string_literal: true

# 📁 backend/app/mailers/user_mailer.rb
class UserMailer < ApplicationMailer
  # 📧 送信元（差出人）のアドレスを設定します
  default from: 'no-reply@kanso-app.com'

  def password_reset(user)
    @user = user
    # 🎯 対象のユーザーのメールアドレスへ向けて、ストイックなタイトルでお手紙を発送します！
    mail to: @user.email, subject: '【kanso】パスワード再設定のご案内（有効期限30分）'
  end
end
