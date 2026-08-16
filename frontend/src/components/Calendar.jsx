// 🔐 frontend/src/components/Calendar.jsx
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';

// 🌟 手元（Docker）と本番（Render）のURLを全自動で切り替える、Baraさん無敵のスイッチです！
const API_BASE_URL = import.meta.env.DEV ? 'http://localhost:3000' : 'https://kanso-8m4l.onrender.com';

export default function Calendar() {
  const [events, setEvents] = useState([]);
  const token = localStorage.getItem('token');

  // 📥 1. 画面が開いた瞬間に、Railsの窓口からデータを一括取得します
  useEffect(() => {
    if (!token) return;

    axios.get(`${API_BASE_URL}/api/v1/calendar_data`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      const formattedEvents = res.data.calendar_events.map(item => ({
        title: item.status || '', 
        date: item.date,
        // 🎨 【ここが進化！】FullCalendar標準の「青い背景」や「青い枠線」を完全に無効化して透明にします！
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        extendedProps: {
          status: item.status,
          weight: item.weight 
        }
      }));
      setEvents(formattedEvents);
    })
    .catch(err => console.error('カレンダーデータの取得に失敗しました:', err));
  }, [token]);

  // 🎨 2. 【感動の核心：マス目カスタム職人（renderEventContent）】
  // マス目全体をふんわり🟢🟡🔴の色で染め上げる、最高にかわいいレイアウトロジックです！
  const renderEventContent = (eventInfo) => {
    const { status, weight } = eventInfo.event.extendedProps;

    let bgContainerColor = 'transparent';
    let dotColor = 'transparent';
    let textColor = '#2d3748';
    let labelText = '';

    // 🟢 🟡 🔴 に合わせて、マス目全体をふんわり包む「優しいパステル背景色」を設定します
    if (status === 'not_enough') { 
      bgContainerColor = '#e6f4ea'; // ふんわり優しいグリーン
      dotColor = '#28a745'; 
      textColor = '#137333';
      labelText = '少なすぎ'; 
    }
    if (status === 'normal') { 
      bgContainerColor = '#fef7e0'; // ふんわり優しいイエロー
      dotColor = '#ffc107'; 
      textColor = '#b06000';
      labelText = '普通'; 
    }
    if (status === 'overeating') { 
      bgContainerColor = '#fce8e6'; // ふんわり優しいパステルレッド（食べすぎが最高に引き立ちます！）
      dotColor = '#dc3545'; 
      textColor = '#c5221f';
      labelText = '食べすぎ'; 
    }

    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        width: '100%', 
        gap: '4px', 
        padding: '6px 4px', 
        borderRadius: '12px', // マス目の中身をぷっくり丸いかわいい角丸にします
        background: bgContainerColor, // 🎯 マス目を全面的にカラーで染め上げます！
        boxSizing: 'border-box',
        marginTop: '2px', // 日付の数字の邪魔をせず、綺麗に下に収めるマジックマージンです
        minHeight: '60px'
      }}>
        {/* 行動ステータスの文字と小さな丸いドット */}
        {status && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center' }}>
            <span style={{ width: '6px', height: '6px', backgroundColor: dotColor, borderRadius: '50%', display: 'inline-block' }}></span>
            <span style={{ fontSize: '11px', fontWeight: 'bold', color: textColor }}>{labelText}</span>
          </div>
        )}
        
        {/* 体重の数字（kansoのメイン画面に合わせた、より馴染む洗練されたデザインに変更しました！） */}
        {weight && (
          <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#4a5568', background: 'rgba(255,255,255,0.7)', padding: '2px 8px', borderRadius: '20px', width: '85%', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            {weight} <small style={{ fontSize: '9px', color: '#718096' }}>kg</small>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ 
      // 🎨 カレンダーのバックの背景色を、kansoの優しくてかわいい「超淡いミルキーグリーン（#f9fdfa）」へ完全刷新します！
      background: '#f9fdfa', 
      padding: '15px', 
      borderRadius: '24px', 
      border: '1px solid #e6f4ea' 
    }}>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        locale="ja" 
        events={events}
        eventContent={renderEventContent} 
        height="auto"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: ''
        }}
      />
    </div>
  );
}