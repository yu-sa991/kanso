import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

// 🌟 1. 【ここを追加！】手元と本番のURLを全自動で切り替えるスイッチを設置します！
const API_BASE_URL = import.meta.env.DEV ? 'http://localhost:3000' : 'https://onrender.com';

export default function RequireAuth({ children }) {
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    //  もし会員証（トークン）を持っていなければ、一瞬でログイン画面へ強制送還します
    if (!token) {
      setLoading(false);
      return;
    }

    const checkProfile = async () => {
      try {
        //  さっき Rails 側に作った「確認窓口（show）」へ、会員証を添えて電波を飛ばします！
        //❌ 修正前： 'http://localhost:3000/api/v1/profile'
        //⭕ 修正後（URLの頭を無敵の自動切り替えスイッチに変更しました！）：
        const response = await axios.get(`${API_BASE_URL}/api/v1/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        //  Rails から届いた返事（登録済みかどうか）をロボットの頭の中に記憶します
        setIsRegistered(response.data.registered);
      } catch (err) {
        setIsRegistered(false);
      } finally {
        setLoading(false); // チェックが終わったので、ロード画面を終了します
      }
    };

    checkProfile();
  }, [token]);

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>読み込み中...</div>;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  //  【重要！】ログインはしているけれど、まだプロフィールが未登録（初回ユーザー）なら、設定画面へ強制誘導！
  if (!isRegistered) {
    return <Navigate to="/profile-setup" replace />;
  }

  //  ログインもプロフィール登録も完璧な人は、そのまま見たい画面（Homeなど）を通します！
  return children;
}
