// 🔐 frontend/src/components/Calendar.jsx (点線の上にあるタイトル文字まで全てをキウイ丸化した最終確定版・全文です！)
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';

const API_BASE_URL = import.meta.env.DEV ? 'http://localhost:3000' : 'https://kanso-8m4l.onrender.com';


export default function Calendar({ onClose }) {
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

  // 🎨 2. 【マス目カスタム職人（renderEventContent）】
  const renderEventContent = (eventInfo) => {
    const { status, weight } = eventInfo.event.extendedProps;

    let bgContainerColor = 'transparent';
    let dotColor = 'transparent';
    let textColor = '#2d3748';
    let labelText = '';
    let statusEmoji = '🐈';

    if (status === 'not_enough') { 
      bgContainerColor = '#e6f4ea'; 
      dotColor = '#28a745'; 
      textColor = '#137333';
      labelText = '少なすぎ'; 
      statusEmoji = '🙀'; 
    }
    if (status === 'normal') { 
      bgContainerColor = '#fff3cd'; 
      dotColor = '#ffc107'; 
      textColor = '#856404';
      labelText = '普通'; 
      statusEmoji = '🐈✨'; 
    }
    if (status === 'overeating') { 
      bgContainerColor = '#fce8e6'; 
      dotColor = '#dc3545'; 
      textColor = '#c5221f';
      labelText = '食べすぎ'; 
      statusEmoji = '🐷🍖'; 
    }

    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        width: '100%', 
        gap: '2px', 
        padding: '4px 0px', 
        borderRadius: '14px', 
        background: bgContainerColor, 
        boxSizing: 'border-box',
        marginTop: '1px', 
        minHeight: '48px',
        boxShadow: status ? '0 4px 10px rgba(0,0,0,0.02)' : 'none',
        border: status ? '1px solid rgba(0,0,0,0.03)' : 'none',
        transition: 'all 0.2s',
        fontFamily: '"Kiwi Maru", serif'
      }}>
        {status && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px', justifyContent: 'center', width: '100%' }}>
            <span style={{ fontSize: '10px', flexShrink: 0 }}>{statusEmoji}</span>
            <span style={{ fontSize: 'clamp(8.5px, 2.2vw, 11px)', fontWeight: 'bold', color: textColor, whiteSpace: 'nowrap' }}>
              {labelText}
            </span>
          </div>
        )}
        
        {weight && (
          <div style={{ 
            fontSize: 'clamp(9px, 2.3vw, 11px)', 
            fontWeight: 'bold', 
            color: '#4a5568', 
            background: 'rgba(255,255,255,0.9)', 
            padding: '2px 0', 
            borderRadius: '8px', 
            width: '92%', 
            textAlign: 'center', 
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
            whiteSpace: 'nowrap',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'baseline',
            gap: '0.5px'
          }}>
            {weight}
            <span style={{ fontSize: '7.5px', color: '#718096', fontWeight: 'normal' }}>kg</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ 
      background: '#f2f9f5', 
      padding: '20px 18px', 
      borderRadius: '32px', 
      border: '2px solid #d1ebd9',
      boxShadow: '0 8px 24px rgba(40,167,69,0.04)',
      fontFamily: '"Kiwi Maru", serif !important',
      maxWidth: '500px',
      margin: '0 auto'
    }}>
      
      {/* 📋 【これがおもてなしの本物タイトル！】
           キウイ丸のぷっくり可愛いフォントで、中央に優しく1つだけ灯ります！ */}
      <h3 style={{ 
        margin: '0 0 18px 0', textAlign: 'center', fontSize: '1.4rem', 
        fontWeight: 'bold', color: '#2b7a63', letterSpacing: '0.5px',
        fontFamily: '"Kiwi Maru", serif'
      }}>
        📋 振り返りカレンダー
      </h3>

      {/* 🎯 【文字まで丸ゴシック化・デザイン要塞バリア！】 */}
      <style>{`
        /* 🚨 【超・重要核心ネジ！】
           一番大元の画面（親玉側）にいた、上の尖った古いタイトルの h3 要素を見つけ出し、
           display: none !important; のステルス魔法で、この世から跡形もなく完全消滅させます！！！
           ただし、今上で新設した自分自身の本物タイトル（.fcのすぐ上のh3）だけは消さないように
           内側のカレンダーのスタイルのみを綺麗にパトロール指定します！ */
        
        /* 親玉モーダル側の h3 タイトルを狙い撃ちで非表示にします */
        div[style*="position: fixed"] > div > h3:first-child {
          display: none !important;
        }
        /* 万が一に備え、隣り合う古いタイトル文字の表示を100%カットします */
        h3:not([style*="color: #2b7a63"]):not([style*="color: rgb(43, 122, 99)"]) {
          display: none !important;
        }

        .fc :not(.fc-icon), .fc-toolbar-title, .fc-button, .fc-col-header-cell-cushion, .fc-daygrid-day-number, h3, button {
          font-family: "Kiwi Maru", serif !important;
        }
        .fc .fc-toolbar-title {
          font-size: 1.2rem !important;
          font-weight: bold !important;
          color: #2b7a63 !important;
          letter-spacing: 0.5px;
        }
        .fc .fc-button {
          background-color: #ffffff !important;
          border: 2px solid #cbd5e1 !important;
          color: #4a5568 !important;
          font-weight: bold !important;
          border-radius: 12px !important;
          padding: 6px 12px !important;
          box-shadow: 0 2px 6px rgba(0,0,0,0.02) !important;
          transition: all 0.2s ease-in-out !important;
          text-transform: none !important;
          font-size: 13px !important;
        }
        .fc .fc-button:hover {
          background-color: #eaf6f2 !important;
          border-color: #2b7a63 !important;
          color: #2b7a63 !important;
        }
        .fc .fc-button-primary:not(:disabled):active,
        .fc .fc-button-primary:not(:disabled).fc-button-active {
          background-color: #2b7a63 !important;
          border-color: #2b7a63 !important;
          color: #ffffff !important;
        }
        .fc .fc-button-group { gap: 4px !important; }
        .fc .fc-button-group > .fc-button { border-radius: 12px !important; }
        .fc .fc-toolbar { margin-bottom: 15px !important; flex-wrap: wrap; gap: 8px; justify-content: space-between; align-items: center; }
        .fc { --fc-border-color: #e2f0ec !important; --fc-page-bg-color: #ffffff !important; }
        .fc-col-header-cell { background: #eaf6f2 !important; border-top-left-radius: 10px; border-top-right-radius: 10px; }
        .fc-col-header-cell-cushion { color: #2b7a63 !important; font-weight: bold !important; padding: 6px 4px !important; }
        .fc-theme-standard { border-radius: 16px !important; overflow: hidden !important; border: 2px solid #e2f0ec !important; }
        .fc-daygrid-day-frame { padding: 2px !important; }
        .fc-daygrid-event-harness { margin: 1px 0 !important; }
        .fc-event { padding: 0 !important; margin: 0 !important; background: transparent !important; border: none !important; }
        .fc-event-main { padding: 0 !important; }
        .fc-daygrid-day-number { font-size: 11px !important; padding: 4px 6px !important; color: #718096 !important; font-weight: bold !important; }
        .fc-day-today { background: #f0f7ff !important; }
      `}</style>

      {/* 📅 カレンダー本体パーツ */}
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

      {/* 💾 キャンセルして戻るボタン */}
      {onClose && (
        <button 
          onClick={onClose} 
          style={{ 
            width: '100%', padding: '14px', fontSize: '14px', marginTop: '18px',
            background: '#ffffff', color: '#718096', 
            border: '2px solid #cbd5e1', borderRadius: '14px', 
            cursor: 'pointer', fontWeight: 'bold', 
            transition: 'all 0.2s ease-in-out',
            fontFamily: '"Kiwi Maru", serif',
            boxShadow: '0 2px 6px rgba(0,0,0,0.01)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#f7fafc';
            e.currentTarget.style.borderColor = '#a0aec0';
            e.currentTarget.style.color = '#4a5568';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#ffffff';
            e.currentTarget.style.borderColor = '#cbd5e1';
            e.currentTarget.style.color = '#718096';
          }}
        >
          キャンセルして戻る
        </button>
      )}

    </div>
  );
}
