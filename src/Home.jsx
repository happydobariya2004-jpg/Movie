import { useState, useRef } from "react";
import Navbar from "./Navbar.jsx"

const MOVIES = [
  {
    id: 1,
    title: "Matka King",
    year: "2026",
    icon: "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p32852016_b_v12_aa.jpg",
    progress: 38,
    genre: "Crime",
  },
  {
    id: 2,
    title: "Farzi",
    year: "2023",
    icon: " https://i.pinimg.com/736x/b9/4c/05/b94c05a007be8988685c363be52e0b5a.jpg",
   
    progress: 72,
    genre: "Thriller",
  },
  {
    id: 3,
    title: "Mirzapur",
    year: "2024",
    icon: "https://i.pinimg.com/736x/5a/0d/c7/5a0dc754a76af3000a1497dcdcc17c67.jpg",
    progress: 55,
    genre: "Action",
  },
  {
    id: 4,
    title: "Money Heist",
    year: "2023",
    icon: "https://i.pinimg.com/1200x/d0/ec/7e/d0ec7e37324d893c9038b8ce3cc94b32.jpg",
    progress: 91,
    genre: "Thriller",
  },
  {
    id: 5,
    title: "Sacred Games",
    year: "2022",
    icon: "https://i.pinimg.com/736x/bc/fe/47/bcfe47b4b2fbcb1dd40cef44569d6d81.jpg",
    progress: 20,
    genre: "Crime",
  },
  {
    id: 6,
    title: "Dhurandhar",
    year: "2025",
    icon: "https://i.pinimg.com/736x/63/c2/75/63c275454a505fa8d98429a32a4d174f.jpg",
    progress: 65,
    genre: "Drama",
  },
];

const GENRES = ["Horror Comedy", "Thriller", "Supernatural", "Bollywood", "Family"];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .ott-root {
    background: #080810;
    min-height: 100vh;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    overflow-x: hidden;
  }

 
   /* ── HERO ── */
  .ott-hero {
    position: relative;
    min-height: 100svh;
    display: flex;
    align-items: flex-end;
    padding-bottom: clamp(2rem, 6vh, 5rem);
    overflow: hidden;
  }
  .ott-hero-bg {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 70% 60% at 70% 40%, rgba(80,20,20,0.45) 0%, transparent 70%),
      linear-gradient(to bottom, #0d0208 0%, #1a0510 40%, #0d0208 100%);
  }
  .ott-hero-poster {
    position: absolute;
    top: 0; right: 0;
    width: clamp(45%, 55%, 65%);
    height: 100%;
    object-fit: cover;
    object-position: center top;
    mask-image: linear-gradient(to left, rgba(0,0,0,0.8) 0%, transparent 80%),
                linear-gradient(to top, transparent 0%, black 30%);
    -webkit-mask-image: linear-gradient(to left, rgba(0,0,0,0.8) 0%, transparent 80%),
                        linear-gradient(to top, transparent 0%, black 30%);
    mask-composite: intersect;
    -webkit-mask-composite: destination-in;
  }
  .ott-hero-content {
    position: relative;
    z-index: 2;
    padding: 0 clamp(1rem, 5vw, 5rem);
    max-width: 600px;
    animation: fadeUp 0.7s ease both;
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .ott-badges {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
  }
  .ott-badge {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 1.5px;
    padding: 4px 10px;
    border-radius: 4px;
    border: 1px solid rgba(255,60,60,0.5);
    color: #ff3c3c;
    background: rgba(255,60,60,0.08);
  }
  .ott-badge.new {
    border-color: rgba(255,200,60,0.5);
    color: #ffc83c;
    background: rgba(255,200,60,0.08);
  }
  .ott-hero-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(3rem, 10vw, 7rem);
    line-height: 0.9;
    letter-spacing: 2px;
    color: #fff;
    text-shadow: 0 4px 40px rgba(0,0,0,0.8);
    margin-bottom: 1rem;
  }
  .ott-hero-meta {
    display: flex;
    gap: 1rem;
    align-items: center;
    margin-bottom: 1.5rem;
    font-size: 0.85rem;
    color: rgba(255,255,255,0.55);
    flex-wrap: wrap;
  }
  .ott-hero-meta span { display: flex; align-items: center; gap: 4px; }
  .ott-hero-desc {
    font-size: clamp(0.85rem, 1.5vw, 0.95rem);
    line-height: 1.7;
    color: rgba(255,255,255,0.6);
    margin-bottom: 2rem;
    max-width: 420px;
  }
  .ott-btn-row {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }
  .ott-btn-play {
    display: flex;
    align-items: center;
    gap: 10px;
    background: #ff3c3c;
    color: #fff;
    border: none;
    padding: 14px 28px;
    border-radius: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 1px;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
    box-shadow: 0 4px 24px rgba(255,60,60,0.35);
  }
  .ott-btn-play:hover { background: #ff5c5c; transform: translateY(-1px); }
  .ott-btn-play:active { transform: scale(0.97); }
  .ott-btn-secondary {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(255,255,255,0.1);
    color: #fff;
    border: 1px solid rgba(255,255,255,0.2);
    padding: 14px 24px;
    border-radius: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;
    backdrop-filter: blur(8px);
  }
  .ott-btn-secondary:hover { background: rgba(255,255,255,0.18); }

  /* ── GENRE PILLS ── */
  .ott-genre-section {
    padding: clamp(1.5rem, 3vw, 2rem) clamp(1rem, 5vw, 5rem);
  }
  .ott-genre-row {
    display: flex;
    gap: 0.5rem;
    overflow-x: auto;
    scrollbar-width: none;
    padding-bottom: 4px;
  }
  .ott-genre-row::-webkit-scrollbar { display: none; }
  .ott-genre-pill {
    flex-shrink: 0;
    padding: 8px 18px;
    border-radius: 100px;
    border: 1px solid rgba(255,255,255,0.12);
    background: transparent;
    color: rgba(255,255,255,0.55);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
  }
  .ott-genre-pill:hover { border-color: rgba(255,255,255,0.3); color: #fff; }
  .ott-genre-pill.active {
    background: rgba(255,60,60,0.15);
    border-color: rgba(255,60,60,0.5);
    color: #ff3c3c;
  }

  /* ── SECTION ── */
  .ott-section {
    padding: 0 clamp(1rem, 5vw, 5rem) clamp(2rem, 5vh, 4rem);
  }
  .ott-section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.25rem;
    gap: 1rem;
  }
  .ott-section-title {
    font-family: 'DM Sans', sans-serif;
    font-size: clamp(1rem, 2vw, 1.2rem);
    font-weight: 600;
    color: #fff;
  }
  .ott-section-title span {
    color: rgba(255,255,255,0.35);
    font-weight: 400;
    font-size: 0.85rem;
    margin-left: 8px;
  }
  .ott-scroll-btns { display: flex; gap: 0.5rem; }
  .ott-scroll-btn {
    width: 36px; height: 36px;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.15);
    background: rgba(255,255,255,0.06);
    color: rgba(255,255,255,0.7);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 1rem;
  }
  .ott-scroll-btn:hover { background: rgba(255,255,255,0.15); color: #fff; border-color: rgba(255,255,255,0.3); }
  @media (max-width: 640px) { .ott-scroll-btns { display: none; } }

  /* ── CARDS ── */
  .ott-cards-row {
    display: flex;
    gap: clamp(0.75rem, 1.5vw, 1.25rem);
    overflow-x: auto;
    scrollbar-width: none;
    padding-bottom: 8px;
    cursor: grab;
  }
  .ott-cards-row::-webkit-scrollbar { display: none; }
  .ott-cards-row:active { cursor: grabbing; }

  .ott-card {
    flex-shrink: 0;
    width: clamp(140px, 22vw, 200px);
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.06);
    background: #12121e;
    cursor: pointer;
    transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s;
    position: relative;
  }
  .ott-card:hover {
    transform: translateY(-4px) scale(1.02);
    border-color: rgba(255,60,60,0.3);
    box-shadow: 0 12px 40px rgba(0,0,0,0.5);
  }
  .ott-card.active {
    border-color: rgba(255,60,60,0.6);
    box-shadow: 0 0 0 2px rgba(255,60,60,0.25), 0 12px 40px rgba(0,0,0,0.5);
    transform: scale(1.03);
  }
  .ott-card-rank {
    position: absolute;
    top: 8px; left: 10px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 2.5rem;
    line-height: 1;
    color: rgba(255,255,255,0.15);
    z-index: 2;
    text-shadow: -1px -1px 0 rgba(0,0,0,0.3);
  }
  .ott-card-img-wrap {
    width: 100%;
    aspect-ratio: 2/3;
    overflow: hidden;
    position: relative;
    background: #1a1a2e;
  }
  .ott-card-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s;
  }
  .ott-card:hover .ott-card-img-wrap img { transform: scale(1.05); }
  .ott-card-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(8,8,16,0.9) 0%, transparent 50%);
    opacity: 0;
    transition: opacity 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ott-card:hover .ott-card-overlay { opacity: 1; }
  .ott-play-icon {
    width: 44px; height: 44px;
    border-radius: 50%;
    background: rgba(255,60,60,0.9);
    display: flex; align-items: center; justify-content: center;
    backdrop-filter: blur(4px);
    transform: scale(0.7);
    transition: transform 0.2s;
  }
  .ott-card:hover .ott-play-icon { transform: scale(1); }
  .ott-card-info {
    padding: 10px 12px 12px;
  }
  .ott-card-title {
    font-size: 0.85rem;
    font-weight: 600;
    color: #fff;
    margin-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .ott-card-year {
    font-size: 0.75rem;
    color: rgba(255,255,255,0.4);
    margin-bottom: 8px;
  }
  .ott-progress-bar {
    width: 100%;
    height: 3px;
    background: rgba(255,255,255,0.1);
    border-radius: 2px;
    overflow: hidden;
  }
  .ott-progress-fill {
    height: 100%;
    border-radius: 2px;
    background: linear-gradient(to right, #ff3c3c, #ff8c3c);
    transition: width 0.4s;
  }
  .ott-progress-label {
    font-size: 0.7rem;
    color: rgba(255,255,255,0.3);
    margin-top: 4px;
  }
`;

const PlaySVG = () => (
  <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor">
    <polygon points="0,0 12,7 0,14" />
  </svg>
);

export default function BhoothBangla() {
  const [activeCard, setActiveCard] = useState(1);
  const [activeGenre, setActiveGenre] = useState("Horror Comedy");
  const [inWatchlist, setInWatchlist] = useState(false);
  const scrollRef = useRef();

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 280, behavior: "smooth" });
  };

  return (
    <div className="ott-root">
      <style>{styles}</style>

      {/* NAVBAR */}
      <Navbar/>
    {/* HERO */}
      <section className="ott-hero">
        <div className="ott-hero-bg" />
        <img
          className="ott-hero-poster"
          src="https://i.pinimg.com/736x/c7/46/e4/c746e46c1f3223ee5155f949149eaea2.jpg"
          alt="Bhooth Bangla"
        />
        <div className="ott-hero-content">
          <div className="ott-badges">
            <span className="ott-badge">HORROR</span>
            <span className="ott-badge">COMEDY</span>
            <span className="ott+-badge new">NEW</span>
          </div>

          <h1 className="ott-hero-title">BHOOTH<br/>BANGLA</h1>

          <div className="ott-hero-meta">
            <span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#ffc83c"><polygon points="12,2 15.1,8.3 22,9.3 17,14.1 18.2,21 12,17.8 5.8,21 7,14.1 2,9.3 8.9,8.3"/></svg>
              8.4
            </span>
            <span>2025</span>
            <span>2h 15m</span>
            <span>UA 13+</span>
          </div>

          <p className="ott-hero-desc">
            Ek haunted haveli mein phasa ek group — darr, hasee, aur andheron mein chupi sachai. Horror aur comedy ka ek adbhut sangam jo aapko seat se utha dega.
          </p>

          <div className="ott-btn-row">
            <button className="ott-btn-play">
              <PlaySVG /> PLAY NOW
            </button>
            <button
              className="ott-btn-secondary"
              onClick={() => setInWatchlist(!inWatchlist)}
            >
              {inWatchlist
                ? <>✓ Saved</>
                : <>+ Watchlist</>}
            </button>
          </div>
        </div>
      </section>

      {/* GENRES */}
      <div className="ott-genre-section">
        <div className="ott-genre-row">
          {GENRES.map((g) => (
            <button
              key={g}
              className={`ott-genre-pill${activeGenre === g ? " active" : ""}`}
              onClick={() => setActiveGenre(g)}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* TOP 10 SECTION */}
      <section className="ott-section">
        <div className="ott-section-header">
          <h2 className="ott-section-title">
            Top 10 in India
            <span>{activeGenre}</span>
          </h2>
          <div className="ott-scroll-btns">
            <button className="ott-scroll-btn" onClick={() => scroll(-1)} aria-label="Scroll left">
              ←
            </button>
            <button className="ott-scroll-btn" onClick={() => scroll(1)} aria-label="Scroll right">
              →
            </button>
          </div>
        </div>

        <div className="ott-cards-row" ref={scrollRef}>
          {MOVIES.map((movie, i) => (
            <div
              key={movie.id}
              className={`ott-card${activeCard === movie.id ? " active" : ""}`}
              onClick={() => setActiveCard(movie.id)}
            >
              <span className="ott-card-rank">{i + 1}</span>
              <div className="ott-card-img-wrap">
                <img src={movie.icon} alt={movie.title} loading="lazy" />
                <div className="ott-card-overlay">
                  <div className="ott-play-icon">
                    <PlaySVG />
                  </div>
                </div>
              </div>
              <div className="ott-card-info">
                <div className="ott-card-title">{movie.title}</div>
                <div className="ott-card-year">{movie.year} • {movie.genre}</div>
                <div className="ott-progress-bar">
                  <div className="ott-progress-fill" style={{ width: `${movie.progress}%` }} />
                </div>
                <div className="ott-progress-label">{movie.progress}% watched</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}