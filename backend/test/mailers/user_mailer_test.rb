# frozen_string_literal: true

require 'test_helper'

class UserMailerTest < ActionMailer::TestCase
  test 'password_reset' do
    # 🎯 テスト用のダミーユーザーを作って、Bara さん特製の暗号鍵をデータベースへ刻みます！
    user = User.first || User.create!(name: 'テスト', email: 'test_mail@example.com', password: 'password',
                                      jwt_salt: SecureRandom.hex(16))
    user.create_password_reset_token

    mail = UserMailer.password_reset(user)

    # 件名（タイトル）が、Bara さんが設定した本物の文言になっているか自動検証！
    assert_equal '【kanso】パスワード再設定のご案内（有効期限30分）', mail.subject

    # 💌 宛先・差出人のチェックを、本物のデータに完全同期させました！
    assert_equal [user.email], mail.to
    assert_equal ['no-reply@kanso-app.com'], mail.from
    # 🎯 【これが全宇宙最後の本当のお直し！】
    # mail.html_part.body.decoded と指定してあげることで、
    # Minitest が空っぽ（""）を返す罠を200%完全に回避し、Bara さんが作った美しいHTMLメールの文章の中から
    # 本物の暗号鍵（token）を100%確実に発見して大合格させます！
    assert_match user.password_reset_token, mail.html_part.body.decoded
  end
end
