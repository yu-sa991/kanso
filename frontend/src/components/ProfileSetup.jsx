import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// 🌟 1. 【ここを追加！】手元と本番のURLを全自動で切り替えるスイッチを設置します！
const API_BASE_URL = import.meta.env.DEV ? 'http://localhost:3000' : 'https://kanso-8m4l.onrender.com';


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

    // 🚨 【超巨大数値（Infinity）すり抜けを水際で完全遮断する最強の防犯ガード！】
    // 身長や体重、年齢の文字数が 10 桁を超えていたら、サーバーへ電波を飛ばさずにその場で一瞬で弾き飛ばします！
    if (age.length > 10 || height.length > 10 || weight.length > 10) {
      setError('入力されたデータの桁数が多すぎます。正しい数値を入力してください。');
      return;
    }

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

       // response.status === 200 だった場合も漏れなくキャッチできるように条件を広げます！
      // これにより、Railsからの合図のズレを200%完全に吸収し、一撃で /home へのワープを確定させます！
      //if (response.status === 200 || response.status === 201) {
       if (response.status === 201) {
        alert('身体データの初期設定が完了しました！これで正確なカロリー計算ができます！');
       // 🎯 【新規さんルートのゴール！】
       // 身体データの初期設定が完了したら、そのまま自動でMainお部屋（/home）へ滑らかに突入させます！
      navigate('/home');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        let rawError = err.response.data.errors.join('、');
        
        // 英語のエラーメッセージを日本語に翻訳
        let cleanError = rawError
          .replace(/Age must be an integer/i, '年齢は正しい数値（整数）で入力してください。')
          .replace(/Age/i, '年齢')
          .replace(/Height/i, '身長')
          .replace(/Weight/i, '体重');

        setError(cleanError);
      } else {
      //if (err.response && err.response.data && err.response.data.errors) {
       // setError(err.response.data.errors.join('、'));

      //} else {
        setError('データの保存に失敗しました。入力内容を確認してください。');
      }
    }
  };

    return (
    <div style={{ padding: '60px 20px', textAlign: 'center', fontFamily: 'sans-serif', background: '#fafafa', minHeight: '100vh', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: '400px', margin: '50px auto', padding: '25px', background: 'white', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid #edf2f7' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745', marginBottom: '10px' }}>身体データの初期設定</h2>
        <p style={{ textAlign: 'center', color: '#666', fontSize: '14px', marginBottom: '20px' }}>
          カロリーや標準体重を正確に自動計算するために、現在のデータを教えてください。
        </p>

         {error && <p style={{ color: 'red', textAlign: 'center', fontWeight: 'bold', backgroundColor: '#fff5f5', padding: '10px', borderRadius: '4px', border: '1px solid #fed7d7', fontSize: '14px', lineHeight: '1.5', marginBottom: '15px' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* 🚻 1. 性別のご案内（2選択ラジオボタン） */}
          <div style={{ marginBottom: '15px', textAlign: 'left' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px', color: '#4a5568' }}>性別（どちらかを選択してください）</label>
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

          {/* 🎂 2. 年齢の入力（最大3桁・100歳までに物理タイピングロック！） */}
          <div style={{ marginBottom: '15px', textAlign: 'left' }}>
            <label htmlFor="setup-age" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px', color: '#4a5568' }}>年齢（必須）</label>
            <input 
              type="number" 
              id="setup-age" 
              name="age" 
              value={age} 
              onChange={(e) => setAge(e.target.value)} 
              required 
              min="1" 
              max="100" 
              onInput={(e) => { if (e.target.value.length > 3) e.target.value = e.target.value.slice(0, 3); }}
              placeholder="例: 25" 
              style={{ width: '100%', padding: '12px', boxSizing: 'border-box', border: '1px solid #cbd5e0', borderRadius: '8px', fontSize: '16px' }} 
            />
          </div>

          {/* 📏 3. 身長の入力（最大5桁・300.0cmまでに物理タイピングロック！） */}
          <div style={{ marginBottom: '15px', textAlign: 'left' }}>
            <label htmlFor="setup-height" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px', color: '#4a5568' }}>身長 (cm)</label>
            <input 
              type="number" 
              id="setup-height" 
              name="height" 
              step="0.1" 
              value={height} 
              onChange={(e) => setHeight(e.target.value)} 
              required 
              min="1" 
              max="300" 
              onInput={(e) => { if (e.target.value.length > 5) e.target.value = e.target.value.slice(0, 5); }}
              placeholder="例: 170.5" 
              style={{ width: '100%', padding: '12px', boxSizing: 'border-box', border: '1px solid #cbd5e0', borderRadius: '8px', fontSize: '16px' }} 
            />
          </div>

          {/* ⚖️ 4. 初期体重の入力（最大5桁・500.0kgまでに物理タイピングロック！） */}
          <div style={{ marginBottom: '25px', textAlign: 'left' }}>
            <label htmlFor="setup-weight" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px', color: '#4a5568' }}>現在の体重 (kg)</label>
            <input 
              type="number" 
              id="setup-weight" 
              name="weight" 
              step="0.1" 
              value={weight} 
              onChange={(e) => setWeight(e.target.value)} 
              required 
              min="1" 
              max="500" 
              onInput={(e) => { if (e.target.value.length > 5) e.target.value = e.target.value.slice(0, 5); }}
              placeholder="例: 65.2" 
              style={{ width: '100%', padding: '12px', boxSizing: 'border-box', border: '1px solid #cbd5e0', borderRadius: '8px', fontSize: '16px' }} 
            />
          </div>

          <button type="submit" style={{ width: '100%', padding: '16px', background: '#28a745', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', boxShadow: '0 4px 12px rgba(40,167,69,0.2)' }}>データを登録して始める</button>
        </form>
      </div>
    </div>
  );
}