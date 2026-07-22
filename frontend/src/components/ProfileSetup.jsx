import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// 🌟 1. 【ここを追加！】手元と本番のURLを全自動で切り替えるスイッチを設置します！
const API_BASE_URL = import.meta.env.DEV ? 'http://localhost:3000' : 'https://onrender.com';

export default function ProfileSetup() {
  //  各入力項目を管理する箱（ステート）を用意します
  const [gender, setGender] = useState('male'); // 初期値は男性
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    //  ブラウザの引き出し（localStorage）から、ログイン時にしまったデジタル会員証（トークン）を取り出す
    const token = localStorage.getItem('token');

    try {
      //  さっき Rails 側に作ったばかりの、小文字のプロフィール保存窓口（api/v1/profile）へ電波を飛ばします
      // ❌ 修正前： 'http://localhost:3000/api/v1/profile'
      // ⭕ 修正後（URLの頭を無敵の自動切り替えスイッチに変更しました！）：
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/profile`,
        {
          profile: { gender, age: parseInt(age), height: parseFloat(height), weight: parseFloat(weight) }
        },
        {
          // 会員証（トークン）を暗号の電波に添えて、Rails の門番にログイン中であることを証明します
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.status === 201) {
        alert('身体データの初期設定が完了しました！これで正確なカロリー計算ができます！');
        navigate('/'); // 登録が終わったら、お祝いのトップ画面へ自動ジャンプ！
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setError(err.response.data.errors.join('、'));
      } else {
        setError('データの保存に失敗しました。入力内容を確認してください。');
      }
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '25px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>身体データの初期設定</h2>
      <p style={{ textAlign: 'center', color: '#666', fontSize: '14px', marginBottom: '20px' }}>
        カロリーや標準体重を正確に自動計算するために、現在のデータを教えてください。
      </p>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* 🚻 1. 性別のご案内（2選択ラジオボタン） */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>性別（どちらかを選択してください）</label>
          <div style={{ display: 'flex', gap: '20px' }}>
            <label style={{ fontSize: '16px', cursor: 'pointer' }}>
              <input type="radio" value="male" checked={gender === 'male'} onChange={(e) => setGender(e.target.value)} style={{ marginRight: '5px' }} />
              男性
            </label>
            <label style={{ fontSize: '16px', cursor: 'pointer' }}>
              <input type="radio" value="female" checked={gender === 'female'} onChange={(e) => setGender(e.target.value)} style={{ marginRight: '5px' }} />
              女性
            </label>
          </div>
        </div>

        {/* 🎂 2. 年齢の入力（htmlFor, id, name を安全に追加！） */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="setup-age" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>年齢（必須）</label>
          <input type="number" id="setup-age" name="age" value={age} onChange={(e) => setAge(e.target.value)} required min="1" placeholder="例: 25" style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #999', borderRadius: '4px', fontSize: '16px' }} />
        </div>

        {/* 📏 3. 身長の入力（htmlFor, id, name を安全に追加！） */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="setup-height" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>身長 (cm)</label>
          <input type="number" id="setup-height" name="height" step="0.1" value={height} onChange={(e) => setHeight(e.target.value)} required min="1" placeholder="例: 170.5" style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #999', borderRadius: '4px', fontSize: '16px' }} />
        </div>

        {/* ⚖️ 4. 初期体重の入力（htmlFor, id, name を安全に追加！） */}
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="setup-weight" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>現在の体重 (kg)</label>
          <input type="number" id="setup-weight" name="weight" step="0.1" value={weight} onChange={(e) => setWeight(e.target.value)} required min="1" placeholder="例: 65.2" style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #999', borderRadius: '4px', fontSize: '16px' }} />
        </div>

        <button type="submit" style={{ width: '100%', padding: '12px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>データを登録して始める</button>
      </form>
    </div>
  );
}
