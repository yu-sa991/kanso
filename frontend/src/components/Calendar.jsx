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
        padding: '3px 0px', 
        borderRadius: '6px', 
        background: bgContainerColor, 
        boxSizing: 'border-box',
        marginTop: '1px', 
        minHeight: '48px'
      }}>
           {/* 行動ステータスの文字と小さな丸いドット */}
        {status && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px', justifyContent: 'center', width: '100%' }}>
            <span style={{ width: '4px', height: '4px', backgroundColor: dotColor, borderRadius: '50%', display: 'inline-block', flexShrink: 0 }}></span>
            {/* 🎯 実機用に最小サイズを「8.5px」まで引き下げ、絶対に改行させません！ */}
            <span style={{ fontSize: 'clamp(8.5px, 2.2vw, 11px)', fontWeight: 'bold', color: textColor, whiteSpace: 'nowrap' }}>
              {labelText}
            </span>
          </div>
        )}

        {/* 体重の数字（実機はみ出しの真犯人を100%完全修復！） */}
        {weight && (
          <div style={{ 
            // 🎯 実機の極小幅に完全フィットするよう、フォントと内側余白をミリ単位で最適化！
            fontSize: 'clamp(9px, 2.3vw, 11px)', 
            fontWeight: 'bold', 
            color: '#4a5568', 
            background: 'rgba(255,255,255,0.85)', 
            padding: '2px 0', 
            borderRadius: '4px', 
            width: '98%', 
            textAlign: 'center', 
            boxShadow: '0 1px 2px rgba(0,0,0,0.01)',
            whiteSpace: 'nowrap',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'baseline',
            gap: '0.5px'
          }}>
            {weight}
            {/* 🎯 kg の文字サイズを 7.5px にコンパクト化して数字の隣に綺麗に寄り添わせます */}
            <span style={{ fontSize: '7.5px', color: '#718096', fontWeight: 'normal' }}>kg</span>
          </div>
        )}
      </div>
    );
  };




  
  return (
    <div style={{ 
      background: '#f9fdfa', 
      padding: '10px', // スマホ用に周囲の余白を少しだけ引き締めます
      borderRadius: '24px', 
      border: '1px solid #e6f4ea' 
    }}>
      
      {/* 🎯 【これぞ実機はみ出し完全完封の最終決戦バリア！】
           FullCalendarが自動生成するイベント外枠の「余計なパディングやマージン」を
           !important 命令で力づくで完全に削ぎ落とし、セルの幅を100%文字のために開放します！ */}
      <style>{`
        .fc-daygrid-day-frame {
          padding: 1px !important;
        }
        .fc-daygrid-event-harness {
          margin: 1px 0 !important;
        }
        .fc-event {
          padding: 0 !important;
          margin: 0 !important;
          background: transparent !important;
          border: none !important;
        }
        .fc-event-main {
          padding: 0 !important;
        }
        /* スマホの日付の数字も少しだけコンパクトにして美しく収めます */
        .fc-col-header-cell-cushion, .fc-daygrid-day-number {
          font-size: 11px !important;
          padding: 2px 4px !important;
        }
      `}</style>

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