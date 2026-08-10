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

  // 📥 1. 画面が開いた瞬間に、Railsの窓口から1ヶ月分のデータを一括取得します
  useEffect(() => {
    if (!token) return;

    axios.get(`${API_BASE_URL}/api/v1/calendar_data`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      const formattedEvents = res.data.calendar_events.map(item => ({
        title: item.status || '', // 🟢🟡🔴 の判定用に一度ステータスをタイトルへ入れます
        date: item.date,
        extendedProps: {
          status: item.status,
          weight: item.weight // ⚖️ ここに本物のリアルな体重の数字を安全に隠し持たせます！
        }
      }));
      setEvents(formattedEvents);
    })
    .catch(err => console.error('カレンダーデータの取得に失敗しました:', err));
  }, [token]);

  // 🎨 2. 【感動の核心：マス目カスタム職人（renderEventContent）】
  // カレンダーのマス目の中に、色マークと体重の数字を小さく縦に並べて描画する最強の防犯・快適UIロジックです！
  const renderEventContent = (eventInfo) => {
    const { status, weight } = eventInfo.event.extendedProps;

    // 🟢 🟡 🔴 の色マークを割り当てます
    let dotColor = 'transparent';
    let labelText = '';

    if (status === 'light') { dotColor = '#28a745'; labelText = '少なすぎ'; }
    if (status === 'normal') { dotColor = '#ffc107'; labelText = '普通'; }
    if (status === 'heavy') { dotColor = '#dc3545'; labelText = '食べすぎ'; }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: '4px', padding: '2px 0' }}>
        {/* ① 行動ステータスの色ドットマーク */}
        {status && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: `${dotColor}20`, padding: '2px 6px', borderRadius: '4px', width: '90%', justifyContent: 'center' }}>
            <span style={{ width: '6px', height: '6px', backgroundColor: dotColor, borderRadius: '50%', display: 'inline-block' }}></span>
            <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#4a5568' }}>{labelText}</span>
          </div>
        )}
        
        {/* ② 【Baraさんの最高のアイデア！】その日のリアルな体重の数字を小さく併記します */}
        {weight && (
          <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#2d3748', background: '#edf2f7', padding: '2px 6px', borderRadius: '4px', width: '90%', textAlign: 'center' }}>
            {weight} <small style={{ fontSize: '8px', color: '#718096' }}>kg</small>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ maxWidth: '850px', margin: '40px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
      <div style={{ background: '#ffffff', padding: '25px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', border: '1px solid #edf2f7' }}>
        
        <h3 style={{ textAlign: 'center', color: '#28a745', marginBottom: '20px', fontWeight: 'bold', letterSpacing: '1px' }}>
          📅 振り返りカレンダー
        </h3>

        {/* 🧠 FullCalendarの枠組みへ、Baraさん専用のカスタム職人（renderEventContent）をドッキングさせます！ */}
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          locale="ja" 
          events={events}
          eventContent={renderEventContent} // 🎯 【スイッチON！】ここでお祝いカスタムを大作動させます！
          height="auto"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: ''
          }}
        />

      </div>
    </div>
  );
}
