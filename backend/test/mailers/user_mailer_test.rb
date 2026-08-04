# frozen_string_literal: true

require 'test_helper'

class UserMailerTest < ActionMailer::TestCase
  test 'password_reset' do
    # 🎯 【ここをお直し！】
    # テスト用のダミーユーザー（User.first または新規作成したダミー）を右手に持たせて、引数のエラーを完封します！
    user = User.first || User.create!(name: 'テスト', email: 'test_mail@example.com', password: 'password')
    mail = UserMailer.password_reset(user)

    # 件名（タイトル）も、Baraさんが設定した本物の文言に書き換えて大合格させます！
    assert_equal '【kanso】パスワード再設定のご案内（有効期限30分）', mail.subject

    assert_equal ['to@example.org'], mail.to
    assert_equal ['from@example.com'], mail.from
    assert_match 'Hi', mail.body.encoded
  end
end
