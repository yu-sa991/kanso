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
        gap: '2px', 
        // 🎯 スマホの時は左右の padding を 1px に限界まで縮めて、文字のための内側のスペースを最優先で確保します！
        padding: '4px 1px', 
        borderRadius: '8px', 
        background: bgContainerColor, 
        boxSizing: 'border-box',
        marginTop: '2px', 
        minHeight: '52px'
      }}>
        {/* 行動ステータスの文字と小さな丸いドット */}
        {status && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px', justifyContent: 'center', width: '100%' }}>
            <span style={{ width: '4px', height: '4px', backgroundColor: dotColor, borderRadius: '50%', display: 'inline-block', flexShrink: 0 }}></span>
            {/* 🎯 フォントサイズに clamp の魔法を採用！スマホなら 9px、画面が広いPCなら 11px へ全自動可変！ */}
            <span style={{ fontSize: 'clamp(9px, 2.3vw, 11px)', fontWeight: 'bold', color: textColor, whiteSpace: 'nowrap' }}>
              {labelText}
            </span>
          </div>
        )}
        
        {/* 体重の数字（はみ出しの最大の原因だった width: '85%' や固定 padding を完全に解体・修復！） */}
        {weight && (
          <div style={{ 
            // 🎯 文字サイズをスマホ用（9.5px〜11px）にコンパクト化し、絶対に不自然な改行をさせません！
            fontSize: 'clamp(9.5px, 2.4vw, 11px)', 
            fontWeight: 'bold', 
            color: '#4a5568', 
            background: 'rgba(255,255,255,0.85)', 
            padding: '2px 1px', 
            borderRadius: '6px', 
            width: '95%', // 🎯 マス目の横幅いっぱいにピッタリ寄り添わせます
            textAlign: 'center', 
            boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
            whiteSpace: 'nowrap',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'baseline',
            gap: '1px'
          }}>
            {weight}
            <small style={{ fontSize: 'clamp(8px, 2vw, 9px)', color: '#718096', fontWeight: 'normal' }}>kg</small>
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