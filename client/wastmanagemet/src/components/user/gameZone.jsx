import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaHome, FaSignInAlt, FaBook, FaQuestionCircle,
  FaGamepad, FaBroadcastTower, FaMapMarkerAlt,
  FaShoppingCart, FaUserCircle, FaArrowLeft,
  FaPlay, FaTrophy, FaRedo, FaStar, FaLeaf,
} from 'react-icons/fa';

// =======================================================
// CSS INJECTION (animations, custom styles)
// =======================================================

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

  :root {
    --green-dark: #1a3d1f;
    --green-mid: #2d6a34;
    --green-accent: #4caf50;
    --green-light: #a8d5ab;
    --amber: #f59e0b;
    --amber-light: #fef3c7;
    --surface: #f0f7f1;
    --card: #ffffff;
    --text-primary: #1a2e1c;
    --text-secondary: #4a6b4d;
    --radius: 16px;
    --radius-sm: 10px;
  }

  .gz-root * { box-sizing: border-box; margin: 0; padding: 0; }
  .gz-root { font-family: 'DM Sans', sans-serif; background: var(--surface); min-height: 100vh; }

  /* HEADER */
  .gz-header { position: sticky; top: 0; z-index: 50; }
  .gz-title-bar {
    background: linear-gradient(135deg, var(--green-dark) 0%, #0f2d35 100%);
    color: white; padding: 14px 20px; text-align: center;
  }
  .gz-title-bar h1 {
    font-family: 'Syne', sans-serif; font-size: 20px; letter-spacing: 2px;
    font-weight: 800; text-transform: uppercase;
  }
  .gz-title-bar p { font-size: 12px; opacity: 0.65; margin-top: 2px; letter-spacing: 1px; }
  .gz-nav { background: var(--green-mid); padding: 0 16px; overflow-x: auto; }
  .gz-nav-inner { display: flex; gap: 2px; align-items: center; height: 46px; min-width: max-content; }
  .gz-nav-link {
    display: flex; align-items: center; gap: 7px; padding: 6px 12px;
    border-radius: 8px; color: rgba(255,255,255,0.85); text-decoration: none;
    font-size: 13px; font-weight: 500; transition: background 0.15s, color 0.15s;
    white-space: nowrap;
  }
  .gz-nav-link:hover { background: rgba(255,255,255,0.15); color: white; }
  .gz-nav-link.active { background: rgba(255,255,255,0.2); color: white; }

  /* MAIN */
  .gz-main { max-width: 960px; margin: 0 auto; padding: 40px 20px; }

  /* GAME ZONE HERO */
  .gz-hero { text-align: center; margin-bottom: 40px; }
  .gz-hero h2 {
    font-family: 'Syne', sans-serif; font-size: 36px; font-weight: 800;
    color: var(--text-primary); letter-spacing: -1px;
  }
  .gz-hero p { color: var(--text-secondary); font-size: 15px; margin-top: 6px; }

  /* GAME GRID */
  .gz-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }

  /* GAME CARD */
  .gz-card {
    background: var(--card); border-radius: var(--radius); overflow: hidden;
    box-shadow: 0 2px 12px rgba(0,0,0,0.08);
    transition: transform 0.2s, box-shadow 0.2s;
    cursor: pointer;
  }
  .gz-card:hover { transform: translateY(-4px); box-shadow: 0 8px 28px rgba(0,0,0,0.14); }
  .gz-card-img { position: relative; height: 180px; overflow: hidden; }
  .gz-card-img img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.4s; }
  .gz-card:hover .gz-card-img img { transform: scale(1.05); }
  .gz-card-badge {
    position: absolute; top: 10px; right: 10px;
    background: var(--amber); color: #7c4a00; font-size: 11px; font-weight: 600;
    padding: 3px 9px; border-radius: 20px; letter-spacing: 0.5px;
  }
  .gz-card-body { padding: 20px; }
  .gz-card-body h3 { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 700; color: var(--text-primary); }
  .gz-card-body p { color: var(--text-secondary); font-size: 13px; margin: 6px 0 16px; line-height: 1.5; }
  .gz-play-btn {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    width: 100%; padding: 12px; border: none; cursor: pointer;
    background: var(--green-mid); color: white;
    font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 600;
    border-radius: var(--radius-sm); transition: background 0.15s, transform 0.1s;
  }
  .gz-play-btn:hover { background: var(--green-dark); }
  .gz-play-btn:active { transform: scale(0.98); }

  /* GAME LOADER WRAPPER */
  .gz-loader {
    background: var(--card); border-radius: var(--radius);
    box-shadow: 0 2px 20px rgba(0,0,0,0.08);
    padding: 32px; max-width: 720px; margin: 0 auto;
  }
  .gz-back-btn {
    display: inline-flex; align-items: center; gap: 7px;
    color: var(--text-secondary); background: none; border: 1px solid #d5e8d6;
    border-radius: 8px; padding: 7px 14px; font-size: 13px; font-weight: 500;
    cursor: pointer; transition: background 0.15s, color 0.15s; margin-bottom: 24px;
  }
  .gz-back-btn:hover { background: var(--surface); color: var(--text-primary); }
  .gz-game-title {
    font-family: 'Syne', sans-serif; font-size: 26px; font-weight: 800;
    color: var(--text-primary); text-align: center; margin-bottom: 28px;
  }

  /* SHARED GAME ELEMENTS */
  .gz-scoreboard {
    display: flex; justify-content: center; gap: 32px; margin-bottom: 24px;
  }
  .gz-stat {
    text-align: center; background: var(--surface); border-radius: var(--radius-sm);
    padding: 10px 20px; min-width: 90px;
  }
  .gz-stat-label { font-size: 11px; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.8px; }
  .gz-stat-value { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800; color: var(--green-mid); line-height: 1.1; }
  .gz-stat-value.danger { color: #dc2626; }
  .gz-stat-value.warn { color: var(--amber); }

  .gz-game-over {
    text-align: center; padding: 20px 0;
    animation: popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .gz-game-over h3 { font-family: 'Syne', sans-serif; font-size: 32px; font-weight: 800; color: var(--text-primary); }
  .gz-game-over .final-score { font-size: 18px; color: var(--text-secondary); margin: 10px 0 24px; }
  .gz-game-over .final-score span { font-weight: 700; color: var(--green-mid); font-size: 22px; }
  .gz-restart-btn {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--green-mid); color: white; border: none; cursor: pointer;
    padding: 12px 28px; border-radius: var(--radius-sm);
    font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 600;
    transition: background 0.15s;
  }
  .gz-restart-btn:hover { background: var(--green-dark); }

  /* GAME 1 - CATCH */
  .gz-catch-area { text-align: center; position: relative; }
  .gz-catch-grid {
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: 12px; max-width: 480px; margin: 0 auto;
  }
  .gz-catch-item {
    aspect-ratio: 1; border-radius: var(--radius-sm); border: 2px solid transparent;
    cursor: pointer; font-size: 32px; display: flex; align-items: center;
    justify-content: center; transition: transform 0.1s;
    background: var(--surface);
    animation: fadeIn 0.3s ease;
  }
  .gz-catch-item:hover { transform: scale(1.08); }
  .gz-catch-item.recyclable { border-color: var(--green-accent); background: #f0fbf1; }
  .gz-catch-item.trash { border-color: #fca5a5; background: #fff5f5; }
  .gz-catch-item.clicked-good { animation: popIn 0.2s ease; background: #dcfce7 !important; }
  .gz-catch-item.clicked-bad { animation: shake 0.3s ease; }
  .gz-feedback-toast {
    position: fixed; top: 80px; left: 50%; transform: translateX(-50%);
    background: var(--green-dark); color: white; padding: 10px 20px;
    border-radius: 30px; font-weight: 600; font-size: 15px;
    animation: toastIn 0.3s ease; z-index: 100;
    pointer-events: none;
  }
  .gz-feedback-toast.bad { background: #dc2626; }

  /* GAME 2 - SORTING */
  .gz-sort-item-display {
    text-align: center; padding: 24px; background: var(--surface);
    border-radius: var(--radius); margin-bottom: 24px;
  }
  .gz-sort-emoji { font-size: 64px; margin-bottom: 10px; line-height: 1; display: block; animation: bounceIn 0.4s ease; }
  .gz-sort-name { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 700; color: var(--text-primary); }
  .gz-sort-hint { font-size: 13px; color: var(--text-secondary); margin-top: 4px; }
  .gz-sort-bins { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
  .gz-sort-bin {
    display: flex; flex-direction: column; align-items: center; gap: 8px;
    padding: 16px 10px; border-radius: var(--radius-sm); border: 2px solid transparent;
    cursor: pointer; transition: transform 0.15s, border-color 0.15s, background 0.15s;
    font-size: 13px; font-weight: 600;
  }
  .gz-sort-bin:hover { transform: translateY(-3px); }
  .gz-sort-bin .bin-icon { font-size: 36px; }
  .gz-sort-bin.wet { background: #eff6ff; border-color: #93c5fd; color: #1e40af; }
  .gz-sort-bin.wet:hover { background: #dbeafe; border-color: #3b82f6; }
  .gz-sort-bin.dry { background: #fefce8; border-color: #fcd34d; color: #92400e; }
  .gz-sort-bin.dry:hover { background: #fef9c3; border-color: #f59e0b; }
  .gz-sort-bin.hazard { background: #fff1f2; border-color: #fda4af; color: #9f1239; }
  .gz-sort-bin.hazard:hover { background: #ffe4e6; border-color: #f43f5e; }
  .gz-progress-bar { height: 6px; background: #e2f0e3; border-radius: 3px; margin-bottom: 20px; overflow: hidden; }
  .gz-progress-fill { height: 100%; background: var(--green-accent); border-radius: 3px; transition: width 0.4s ease; }

  /* GAME 3 - MEMORY */
  .gz-memory-grid {
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: 10px; max-width: 440px; margin: 0 auto;
  }
  .gz-mem-card {
    aspect-ratio: 1; perspective: 600px; cursor: pointer;
  }
  .gz-mem-inner {
    width: 100%; height: 100%; position: relative;
    transform-style: preserve-3d;
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: var(--radius-sm);
  }
  .gz-mem-card.flipped .gz-mem-inner { transform: rotateY(180deg); }
  .gz-mem-card.matched .gz-mem-inner { transform: rotateY(180deg); }
  .gz-mem-front, .gz-mem-back {
    position: absolute; width: 100%; height: 100%;
    backface-visibility: hidden; border-radius: var(--radius-sm);
    display: flex; align-items: center; justify-content: center; font-size: 30px;
  }
  .gz-mem-front {
    background: var(--green-mid);
    color: white; font-size: 22px; font-weight: 700;
  }
  .gz-mem-back {
    background: var(--surface); border: 2px solid var(--green-light);
    transform: rotateY(180deg);
  }
  .gz-mem-card.matched .gz-mem-back { background: #dcfce7; border-color: var(--green-accent); }
  .gz-mem-moves { text-align: center; margin-top: 16px; color: var(--text-secondary); font-size: 14px; }

  /* GAME 4 - QUIZ RUSH */
  .gz-quiz-progress { display: flex; gap: 6px; margin-bottom: 20px; }
  .gz-quiz-dot {
    flex: 1; height: 5px; border-radius: 3px; background: #d5e8d6;
    transition: background 0.3s;
  }
  .gz-quiz-dot.done { background: var(--green-accent); }
  .gz-quiz-dot.current { background: var(--amber); }
  .gz-quiz-q { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 700; color: var(--text-primary); margin-bottom: 20px; line-height: 1.35; }
  .gz-quiz-opts { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .gz-quiz-opt {
    padding: 14px; border: 2px solid #d5e8d6; border-radius: var(--radius-sm);
    background: white; cursor: pointer; font-size: 14px; font-weight: 500;
    color: var(--text-primary); transition: border-color 0.15s, background 0.15s, transform 0.1s;
    text-align: left;
  }
  .gz-quiz-opt:hover:not(:disabled) { border-color: var(--green-accent); background: #f0fbf1; transform: translateY(-2px); }
  .gz-quiz-opt.correct { background: #dcfce7; border-color: var(--green-accent); color: #14532d; }
  .gz-quiz-opt.wrong { background: #fee2e2; border-color: #ef4444; color: #7f1d1d; }
  .gz-quiz-opt:disabled { cursor: not-allowed; }
  .gz-quiz-feedback { margin-top: 14px; padding: 10px 14px; border-radius: var(--radius-sm); font-size: 14px; font-weight: 500; }
  .gz-quiz-feedback.correct { background: #dcfce7; color: #14532d; }
  .gz-quiz-feedback.wrong { background: #fee2e2; color: #7f1d1d; }
  .gz-quiz-next {
    margin-top: 14px; padding: 11px 24px; background: var(--green-mid); color: white;
    border: none; border-radius: var(--radius-sm); cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600;
    transition: background 0.15s;
  }
  .gz-quiz-next:hover { background: var(--green-dark); }

  /* ANIMATIONS */
  @keyframes fadeIn { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
  @keyframes popIn { 0% { transform: scale(0.8); opacity: 0; } 60% { transform: scale(1.1); } 100% { transform: scale(1); opacity: 1; } }
  @keyframes shake { 0%,100% { transform: translateX(0); } 25% { transform: translateX(-6px); } 75% { transform: translateX(6px); } }
  @keyframes bounceIn { 0% { transform: scale(0.5); opacity: 0; } 70% { transform: scale(1.15); } 100% { transform: scale(1); opacity: 1; } }
  @keyframes toastIn { from { opacity: 0; transform: translateX(-50%) translateY(-10px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }

  /* SCROLLBAR */
  .gz-nav::-webkit-scrollbar { height: 3px; }
  .gz-nav::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.3); border-radius: 2px; }
`;

// =======================================================
// HEADER
// =======================================================

const Header = () => {
  const location = useLocation();
  const NavItem = ({ to, icon, label }) => (
    <Link
      to={to}
      className={`gz-nav-link${location.pathname === to ? ' active' : ''}`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );

  return (
    <header className="gz-header">
      <div className="gz-title-bar">
        <h1>Smart Waste Management Portal</h1>
        <p>Eco Tycoon · Ultimate Trash Collector</p>
      </div>
      <nav className="gz-nav">
        <div className="gz-nav-inner">
          <NavItem to="/" icon={<FaHome size={13} />} label="Home" />
          <NavItem to="/login" icon={<FaSignInAlt size={13} />} label="Login" />
          <NavItem to="/learn" icon={<FaBook size={13} />} label="Learn" />
          <NavItem to="/quiz" icon={<FaQuestionCircle size={13} />} label="Quiz" />
          <NavItem to="/game-zone" icon={<FaGamepad size={13} />} label="Game Zone" />
          <NavItem to="/live-tracking" icon={<FaBroadcastTower size={13} />} label="Live Tracking" />
          <NavItem to="/geo-tagging" icon={<FaMapMarkerAlt size={13} />} label="Geo-Tagging" />
          <NavItem to="/purchase" icon={<FaShoppingCart size={13} />} label="Purchase" />
          <NavItem to="/profile" icon={<FaUserCircle size={13} />} label="Profile" />
        </div>
      </nav>
    </header>
  );
};

// =======================================================
// GAMES METADATA
// =======================================================

const GAMES = [
  {
    id: 1,
    title: 'Catch the Recyclables',
    badge: '⚡ Fast',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1200&auto=format&fit=crop',
    description: 'Tap recyclable items before they vanish — but avoid trash or lose points!',
  },
  {
    id: 2,
    title: 'Waste Sorting Challenge',
    badge: '🎯 Strategy',
    image: 'https://images.unsplash.com/photo-1528323273322-d81458248d40?q=80&w=1200&auto=format&fit=crop',
    description: 'Sort items into Wet, Dry, or Hazardous bins. Speed and accuracy both count.',
  },
  {
    id: 3,
    title: 'Memory Match',
    badge: '🧠 Memory',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',
    description: 'Flip cards and find matching eco-symbol pairs in as few moves as possible.',
  },
  {
    id: 4,
    title: 'Quick Quiz Rush',
    badge: '📚 Knowledge',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop',
    description: 'Race through waste-management questions with instant feedback on every answer.',
  },
];

// =======================================================
// MAIN PAGE
// =======================================================

export default function GameZonePage() {
  const [selectedGame, setSelectedGame] = useState(null);

  return (
    <div className="gz-root">
      <style>{STYLES}</style>
      <Header />
      <main className="gz-main">
        {!selectedGame ? (
          <>
            <div className="gz-hero">
              <h2><FaGamepad style={{ color: 'var(--green-mid)', verticalAlign: -3, marginRight: 10 }} />Game Zone</h2>
              <p>Play, learn, and earn eco points — every game teaches sustainability.</p>
            </div>
            <div className="gz-grid">
              {GAMES.map(game => (
                <GameCard key={game.id} game={game} onPlay={() => setSelectedGame(game)} />
              ))}
            </div>
          </>
        ) : (
          <GameLoader game={selectedGame} onBack={() => setSelectedGame(null)} />
        )}
      </main>
    </div>
  );
}

// =======================================================
// GAME CARD
// =======================================================

const GameCard = ({ game, onPlay }) => (
  <div className="gz-card">
    <div className="gz-card-img">
      <img src={game.image} alt={game.title} loading="lazy" />
      <span className="gz-card-badge">{game.badge}</span>
    </div>
    <div className="gz-card-body">
      <h3>{game.title}</h3>
      <p>{game.description}</p>
      <button className="gz-play-btn" onClick={onPlay}>
        <FaPlay size={12} /> Play Game
      </button>
    </div>
  </div>
);

// =======================================================
// GAME LOADER
// =======================================================

const GameLoader = ({ game, onBack }) => (
  <div className="gz-loader">
    <button className="gz-back-btn" onClick={onBack}>
      <FaArrowLeft size={12} /> Back to Games
    </button>
    <h2 className="gz-game-title">{game.title}</h2>
    {game.id === 1 && <CatchGame />}
    {game.id === 2 && <SortingGame />}
    {game.id === 3 && <MemoryGame />}
    {game.id === 4 && <QuizRush />}
  </div>
);

// =======================================================
// SHARED: GAME OVER SCREEN
// =======================================================

const GameOver = ({ score, maxScore, message, onRestart }) => (
  <div className="gz-game-over">
    <div style={{ fontSize: 56, marginBottom: 10 }}>
      {score >= maxScore * 0.8 ? '🏆' : score >= maxScore * 0.5 ? '🌱' : '♻️'}
    </div>
    <h3>{score >= maxScore * 0.8 ? 'Eco Champion!' : score >= maxScore * 0.5 ? 'Nice Work!' : 'Keep Trying!'}</h3>
    <p className="final-score">{message} Score: <span>{score}</span>{maxScore ? ` / ${maxScore}` : ''}</p>
    <button className="gz-restart-btn" onClick={onRestart}>
      <FaRedo size={13} /> Play Again
    </button>
  </div>
);

// =======================================================
// GAME 1 — CATCH THE RECYCLABLES (proper grid, avoid trash)
// =======================================================

const RECYCLABLES = ['♻️', '📦', '🥤', '📰', '🍾', '🥛'];
const TRASH_ITEMS = ['🗑️', '🚬', '💊', '🔋', '🦴', '🧴'];
const TOTAL_TIME = 25;

function generateItems() {
  const items = [];
  for (let i = 0; i < 12; i++) {
    const isRecyclable = Math.random() > 0.45;
    items.push({
      id: Math.random(),
      emoji: isRecyclable
        ? RECYCLABLES[Math.floor(Math.random() * RECYCLABLES.length)]
        : TRASH_ITEMS[Math.floor(Math.random() * TRASH_ITEMS.length)],
      type: isRecyclable ? 'recyclable' : 'trash',
      clicked: false,
    });
  }
  return items;
}

const CatchGame = () => {
  const [items, setItems] = useState(generateItems);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(TOTAL_TIME);
  const [toast, setToast] = useState(null);
  const toastTimeout = useRef(null);

  useEffect(() => {
    if (time <= 0) return;
    const t = setInterval(() => setTime(p => p - 1), 1000);
    return () => clearInterval(t);
  }, [time]);

  // Refresh grid every 6s during gameplay
  useEffect(() => {
    if (time <= 0) return;
    const t = setInterval(() => setItems(generateItems()), 6000);
    return () => clearInterval(t);
  }, [time]);

  const showToast = (msg, bad = false) => {
    setToast({ msg, bad });
    clearTimeout(toastTimeout.current);
    toastTimeout.current = setTimeout(() => setToast(null), 900);
  };

  const handleClick = (idx) => {
    const item = items[idx];
    if (item.clicked || time <= 0) return;
    const updated = items.map((it, i) => i === idx ? { ...it, clicked: true } : it);
    setItems(updated);
    if (item.type === 'recyclable') {
      setScore(s => s + 10);
      showToast('+10 ♻️');
    } else {
      setScore(s => Math.max(0, s - 5));
      showToast('-5 ❌', true);
    }
  };

  const restart = () => {
    setItems(generateItems());
    setScore(0);
    setTime(TOTAL_TIME);
    setToast(null);
  };

  const timeColor = time <= 5 ? 'danger' : time <= 10 ? 'warn' : '';

  if (time === 0) return <GameOver score={score} maxScore={120} message="Final" onRestart={restart} />;

  return (
    <div className="gz-catch-area">
      {toast && <div className={`gz-feedback-toast${toast.bad ? ' bad' : ''}`}>{toast.msg}</div>}
      <div className="gz-scoreboard">
        <div className="gz-stat">
          <div className="gz-stat-label">Score</div>
          <div className="gz-stat-value">{score}</div>
        </div>
        <div className="gz-stat">
          <div className="gz-stat-label">Time</div>
          <div className={`gz-stat-value ${timeColor}`}>{time}s</div>
        </div>
      </div>
      <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>
        Tap ♻️ recyclables <strong>(+10)</strong> · Avoid 🗑️ trash <strong>(-5)</strong>
      </p>
      <div className="gz-catch-grid">
        {items.map((item, idx) => (
          <button
            key={item.id + idx}
            className={`gz-catch-item${item.type === 'recyclable' ? ' recyclable' : ' trash'}${item.clicked ? (item.type === 'recyclable' ? ' clicked-good' : ' clicked-bad') : ''}`}
            onClick={() => handleClick(idx)}
            style={{ opacity: item.clicked ? 0.35 : 1, border: 'none', cursor: item.clicked ? 'default' : 'pointer' }}
          >
            {item.emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

// =======================================================
// GAME 2 — WASTE SORTING (3 bins, scoring, progress)
// =======================================================

const SORT_ITEMS = [
  { emoji: '🍌', name: 'Banana Peel', correct: 'wet', hint: 'Food scraps = wet' },
  { emoji: '📰', name: 'Old Newspaper', correct: 'dry', hint: 'Paper = dry waste' },
  { emoji: '🍕', name: 'Leftover Food', correct: 'wet', hint: 'Food = wet' },
  { emoji: '🥤', name: 'Plastic Bottle', correct: 'dry', hint: 'Plastic = dry' },
  { emoji: '🔋', name: 'Dead Battery', correct: 'hazard', hint: 'Batteries = hazardous!' },
  { emoji: '📦', name: 'Cardboard Box', correct: 'dry', hint: 'Cardboard = dry' },
  { emoji: '💊', name: 'Old Medicines', correct: 'hazard', hint: 'Medicines = hazardous' },
  { emoji: '🍎', name: 'Apple Core', correct: 'wet', hint: 'Fruit scraps = wet' },
  { emoji: '🖥️', name: 'Old Monitor', correct: 'hazard', hint: 'E-waste = hazardous' },
  { emoji: '🥛', name: 'Milk Carton', correct: 'dry', hint: 'Carton = dry' },
];

const SortingGame = () => {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null); // { correct, hint }
  const [done, setDone] = useState(false);

  const current = SORT_ITEMS[index];

  const handleChoice = (choice) => {
    if (feedback) return;
    const correct = choice === current.correct;
    if (correct) setScore(s => s + 1);
    setFeedback({ correct, hint: current.hint });
  };

  const next = () => {
    setFeedback(null);
    if (index < SORT_ITEMS.length - 1) setIndex(i => i + 1);
    else setDone(true);
  };

  const restart = () => { setIndex(0); setScore(0); setFeedback(null); setDone(false); };

  if (done) return <GameOver score={score} maxScore={SORT_ITEMS.length} message="Final" onRestart={restart} />;

  const progress = ((index) / SORT_ITEMS.length) * 100;

  return (
    <div>
      <div className="gz-scoreboard">
        <div className="gz-stat">
          <div className="gz-stat-label">Score</div>
          <div className="gz-stat-value">{score}</div>
        </div>
        <div className="gz-stat">
          <div className="gz-stat-label">Item</div>
          <div className="gz-stat-value">{index + 1}/{SORT_ITEMS.length}</div>
        </div>
      </div>
      <div className="gz-progress-bar">
        <div className="gz-progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="gz-sort-item-display">
        <span className="gz-sort-emoji">{current.emoji}</span>
        <div className="gz-sort-name">{current.name}</div>
        <div className="gz-sort-hint">Which bin does this go in?</div>
      </div>
      <div className="gz-sort-bins">
        {[
          { key: 'wet', icon: '💧', label: 'Wet Waste' },
          { key: 'dry', icon: '📦', label: 'Dry Waste' },
          { key: 'hazard', icon: '⚠️', label: 'Hazardous' },
        ].map(bin => (
          <button
            key={bin.key}
            className={`gz-sort-bin ${bin.key}`}
            onClick={() => handleChoice(bin.key)}
            disabled={!!feedback}
            style={feedback && bin.key === current.correct ? { borderWidth: 3, fontWeight: 700 } : {}}
          >
            <span className="bin-icon">{bin.icon}</span>
            {bin.label}
          </button>
        ))}
      </div>
      {feedback && (
        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <div className={`gz-quiz-feedback ${feedback.correct ? 'correct' : 'wrong'}`}>
            {feedback.correct ? '✅ Correct! ' : `❌ Wrong! `}{feedback.hint}
          </div>
          <button className="gz-quiz-next" onClick={next}>
            {index < SORT_ITEMS.length - 1 ? 'Next Item →' : 'See Results'}
          </button>
        </div>
      )}
    </div>
  );
};

// =======================================================
// GAME 3 — MEMORY MATCH (4×4 grid, match pairs, move counter)
// =======================================================

const MEM_SYMBOLS = ['♻️', '🌱', '💧', '🌍', '🌿', '☀️', '🍃', '🏭'];

function buildDeck() {
  return [...MEM_SYMBOLS, ...MEM_SYMBOLS]
    .map((emoji, i) => ({ id: i, emoji, matched: false }))
    .sort(() => Math.random() - 0.5);
}

const MemoryGame = () => {
  const [cards, setCards] = useState(buildDeck);
  const [flipped, setFlipped] = useState([]); // indices
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);

  const matchedCount = cards.filter(c => c.matched).length;
  const done = matchedCount === cards.length;

  const handleFlip = (idx) => {
    if (locked || flipped.includes(idx) || cards[idx].matched) return;
    const next = [...flipped, idx];
    setFlipped(next);

    if (next.length === 2) {
      setMoves(m => m + 1);
      setLocked(true);
      const [a, b] = next;
      if (cards[a].emoji === cards[b].emoji) {
        setTimeout(() => {
          setCards(prev => prev.map((c, i) => i === a || i === b ? { ...c, matched: true } : c));
          setFlipped([]);
          setLocked(false);
        }, 500);
      } else {
        setTimeout(() => { setFlipped([]); setLocked(false); }, 1000);
      }
    }
  };

  const restart = () => { setCards(buildDeck()); setFlipped([]); setMoves(0); setLocked(false); };

  if (done) return <GameOver score={moves} maxScore={null} message={`Completed in ${moves} moves! Your`} onRestart={restart} />;

  return (
    <div>
      <div className="gz-scoreboard">
        <div className="gz-stat">
          <div className="gz-stat-label">Moves</div>
          <div className="gz-stat-value">{moves}</div>
        </div>
        <div className="gz-stat">
          <div className="gz-stat-label">Matched</div>
          <div className="gz-stat-value">{matchedCount / 2}/{MEM_SYMBOLS.length}</div>
        </div>
      </div>
      <div className="gz-memory-grid">
        {cards.map((card, idx) => {
          const isFlipped = flipped.includes(idx) || card.matched;
          return (
            <div
              key={idx}
              className={`gz-mem-card${isFlipped ? ' flipped' : ''}${card.matched ? ' matched' : ''}`}
              onClick={() => handleFlip(idx)}
            >
              <div className="gz-mem-inner">
                <div className="gz-mem-front">?</div>
                <div className="gz-mem-back">{card.emoji}</div>
              </div>
            </div>
          );
        })}
      </div>
      <p className="gz-mem-moves">Flip pairs to find matches · Fewer moves = better score</p>
    </div>
  );
};

// =======================================================
// GAME 4 — QUIZ RUSH (expanded, with explanations)
// =======================================================

const QUESTIONS = [
  { q: 'Which of these can be composted at home?', opts: ['Plastic wrap', 'Glass bottle', 'Banana peel', 'Aluminium can'], answer: 'Banana peel', explain: 'Fruit and vegetable scraps are perfect for composting.' },
  { q: 'Which colour bin is typically used for dry/recyclable waste in India?', opts: ['Blue', 'Green', 'Red', 'Black'], answer: 'Blue', explain: 'Blue bins are designated for dry recyclable waste.' },
  { q: 'E-waste stands for…', opts: ['Easy Waste', 'Electronic Waste', 'Energy Waste', 'Ecological Waste'], answer: 'Electronic Waste', explain: 'E-waste = discarded electronic devices like phones and computers.' },
  { q: 'Which item is considered hazardous waste?', opts: ['Apple core', 'Old newspaper', 'Dead battery', 'Cardboard box'], answer: 'Dead battery', explain: 'Batteries contain toxic chemicals and need special disposal.' },
  { q: 'What is the correct order of the 3Rs?', opts: ['Recycle, Reuse, Reduce', 'Reduce, Reuse, Recycle', 'Reuse, Reduce, Recycle', 'Reduce, Recycle, Reuse'], answer: 'Reduce, Reuse, Recycle', explain: 'Reduce first (less waste), Reuse second, Recycle last.' },
  { q: 'Which gas do landfills mainly produce?', opts: ['Oxygen', 'Nitrogen', 'Methane', 'Carbon dioxide'], answer: 'Methane', explain: 'Landfills decompose waste anaerobically, releasing methane — a potent greenhouse gas.' },
  { q: 'What percentage of Indian cities have door-to-door waste collection (approx.)?', opts: ['20%', '50%', '75%', '90%'], answer: '75%', explain: 'Around 75% of urban areas now have door-to-door waste collection under Swachh Bharat.' },
  { q: 'Which material takes the longest to decompose in a landfill?', opts: ['Newspaper', 'Glass bottle', 'Cotton shirt', 'Banana peel'], answer: 'Glass bottle', explain: 'Glass can take up to 1 million years to decompose naturally.' },
];

const QuizRush = () => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [done, setDone] = useState(false);

  const q = QUESTIONS[current];
  const answered = selected !== null;

  const handleAnswer = (opt) => {
    if (answered) return;
    setSelected(opt);
    if (opt === q.answer) setScore(s => s + 1);
  };

  const next = () => {
    setSelected(null);
    if (current < QUESTIONS.length - 1) setCurrent(c => c + 1);
    else setDone(true);
  };

  const restart = () => { setCurrent(0); setScore(0); setSelected(null); setDone(false); };

  if (done) return <GameOver score={score} maxScore={QUESTIONS.length} message="Final" onRestart={restart} />;

  return (
    <div>
      <div className="gz-quiz-progress">
        {QUESTIONS.map((_, i) => (
          <div key={i} className={`gz-quiz-dot${i < current ? ' done' : i === current ? ' current' : ''}`} />
        ))}
      </div>
      <div className="gz-scoreboard" style={{ marginBottom: 20 }}>
        <div className="gz-stat">
          <div className="gz-stat-label">Score</div>
          <div className="gz-stat-value">{score}</div>
        </div>
        <div className="gz-stat">
          <div className="gz-stat-label">Question</div>
          <div className="gz-stat-value">{current + 1}/{QUESTIONS.length}</div>
        </div>
      </div>
      <p className="gz-quiz-q">{q.q}</p>
      <div className="gz-quiz-opts">
        {q.opts.map(opt => (
          <button
            key={opt}
            className={`gz-quiz-opt${answered && opt === q.answer ? ' correct' : answered && opt === selected && opt !== q.answer ? ' wrong' : ''}`}
            onClick={() => handleAnswer(opt)}
            disabled={answered}
          >
            {opt}
          </button>
        ))}
      </div>
      {answered && (
        <>
          <div className={`gz-quiz-feedback ${selected === q.answer ? 'correct' : 'wrong'}`}>
            {selected === q.answer ? '✅ Correct! ' : `❌ The answer was "${q.answer}". `}
            {q.explain}
          </div>
          <button className="gz-quiz-next" onClick={next}>
            {current < QUESTIONS.length - 1 ? 'Next Question →' : 'See Final Score'}
          </button>
        </>
      )}
    </div>
  );
};
