

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 antialiased font-sans">
      
      {/* 1. ⚙️ ヘッダーエリア */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="text-2xl font-black tracking-wider text-slate-900">
          kanso<span className="text-green-500">.</span>
        </div>
        <button className="bg-slate-900 text-white text-sm font-bold px-4 py-2 rounded-full hover:bg-slate-800 transition">
          ログイン / 登録
        </button>
      </header>

      <main className="max-w-md mx-auto px-4 pb-24">
        
        {/* 2. 🚀 メイン（ヒーロー）エリア */}
        <section className="text-center pt-12 pb-16">
          <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">
            忙しいアラフォー世代のための超ずぼら管理
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-4 leading-tight">
            健康になりたいのであって、<br />
            <span className="text-red-500 underline decoration-wavy">完璧なデータ</span>を作りたいわけじゃない。
          </h1>
          <p className="mt-4 text-gray-600 text-base leading-relaxed">
            グラム単位のカロリー入力で燃え尽きたあなたへ。<br />
            手間の断捨離を徹底した、1秒食事レコーディング。
          </p>
        </section>

        {/* 3. 🟢🟡🔴 巨大3択ボタンのイメージセクション */}
        <section className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm mb-12">
          <h2 className="text-center text-sm font-bold text-gray-400 tracking-widest uppercase mb-6">
            アプリの実際の操作画面
          </h2>
          <div className="flex flex-col gap-4">
            <button className="w-full bg-green-500 text-white font-extrabold text-xl py-5 rounded-2xl shadow-md transform active:scale-95 transition">
              少なすぎ 🟢
            </button>
            <button className="w-full bg-amber-400 text-slate-900 font-extrabold text-xl py-5 rounded-2xl shadow-md transform active:scale-95 transition">
              普通 🟡
            </button>
            <button className="w-full bg-red-500 text-white font-extrabold text-xl py-5 rounded-2xl shadow-md transform active:scale-95 transition">
              食べすぎ 🔴
            </button>
          </div>
          <p className="text-center text-xs text-gray-400 mt-4">
            ※文字入力は1ミリも必要ありません。アプリを開いて1秒で完結。
          </p>
        </section>

        {/* 4. 📝 使い方セクション */}
        <section className="pt-4">
          <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">
            使い方は驚くほどシンプル
          </h3>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-slate-900 text-white font-bold rounded-xl w-8 h-8 flex items-center justify-center shrink-0">
                1
              </div>
              <div>
                <h4 className="font-bold text-slate-900">ご飯を食べる</h4>
                <p className="text-sm text-gray-500 mt-1">スマホを取り出して文字を入力する面倒な手間は、すべて忘れてください。</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-slate-900 text-white font-bold rounded-xl w-8 h-8 flex items-center justify-center shrink-0">
                2
              </div>
              <div>
                <h4 className="font-bold text-slate-900">アプリを開いて3択ボタンを1秒タップ</h4>
                <p className="text-sm text-gray-500 mt-1">主観で構いません。「少なすぎ」「普通」「食べすぎ」の巨大ボタンをポンと押すだけ。</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-slate-900 text-white font-bold rounded-xl w-8 h-8 flex items-center justify-center shrink-0">
                3
              </div>
              <div>
                <h4 className="font-bold text-slate-900">カレンダーに色が塗られ、現実を直視</h4>
                <p className="text-sm text-gray-500 mt-1">自動でカレンダーが🟢🟡🔴に染まります。「都合のいい錯覚」をシャットアウトし、行動を振り返ります。</p>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}

export default App
