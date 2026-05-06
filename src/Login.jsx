import { useState, useEffect, useRef } from "react";

const glitchKeyframes = `
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Bebas+Neue&display=swap');

@keyframes scanline {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
}
@keyframes flicker {
  0%, 95%, 100% { opacity: 1; }
  96% { opacity: 0.4; }
  97% { opacity: 1; }
  98% { opacity: 0.3; }
}
@keyframes glitch1 {
  0%, 90%, 100% { clip-path: inset(0 0 100% 0); transform: translateX(0); }
  92% { clip-path: inset(20% 0 60% 0); transform: translateX(-4px); }
  94% { clip-path: inset(50% 0 30% 0); transform: translateX(4px); }
  96% { clip-path: inset(70% 0 10% 0); transform: translateX(-2px); }
}
@keyframes glitch2 {
  0%, 90%, 100% { clip-path: inset(0 0 100% 0); transform: translateX(0); }
  91% { clip-path: inset(10% 0 80% 0); transform: translateX(4px); }
  93% { clip-path: inset(40% 0 40% 0); transform: translateX(-4px); }
  95% { clip-path: inset(80% 0 5% 0); transform: translateX(2px); }
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes borderPulse {
  0%, 100% { border-color: rgba(255,140,0,0.4); }
  50% { border-color: rgba(255,140,0,0.9); }
}
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-6px); }
  40% { transform: translateX(6px); }
  60% { transform: translateX(-4px); }
  80% { transform: translateX(4px); }
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes barFill {
  from { width: 0%; }
  to { width: 100%; }
}
`;

export default function CODLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,140,0,${p.alpha})`;
        ctx.fill();
      });
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const handleLogin = () => {
    if (!username || !password) {
      setError("ENTER CREDENTIALS TO PROCEED");
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    setError("");
    setLoading(true);
    setLoadProgress(0);
    const interval = setInterval(() => {
      setLoadProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setLoading(false);
          setLoadProgress(0);
          return 100;
        }
        return p + Math.random() * 18;
      });
    }, 120);
  };

  const styles = {
    root: {
      minHeight: "600px",
      background: "#050505",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Rajdhani', sans-serif",
      position: "relative",
      overflow: "hidden",
      borderRadius: "12px",
      animation: mounted ? "flicker 8s infinite" : "none",
    },
    canvas: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
    },
    bgLines: {
      position: "absolute",
      inset: 0,
      backgroundImage: `
        repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,140,0,0.04) 40px),
        repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,140,0,0.04) 40px)
      `,
      pointerEvents: "none",
    },
    scanline: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "3px",
      background: "rgba(255,140,0,0.06)",
      animation: "scanline 6s linear infinite",
      pointerEvents: "none",
      zIndex: 5,
    },
    vignette: {
      position: "absolute",
      inset: 0,
      background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.85) 100%)",
      pointerEvents: "none",
    },
    card: {
      width: "400px",
      position: "relative",
      zIndex: 10,
      animation: "fadeUp 0.6s ease both",
    },
    topBar: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginBottom: "24px",
    },
    topBarLine: {
      flex: 1,
      height: "1px",
      background: "linear-gradient(90deg, transparent, rgba(255,140,0,0.6))",
    },
    topBarLineRight: {
      flex: 1,
      height: "1px",
      background: "linear-gradient(90deg, rgba(255,140,0,0.6), transparent)",
    },
    crosshair: {
      width: "20px",
      height: "20px",
      position: "relative",
      flexShrink: 0,
    },
    logoArea: {
      textAlign: "center",
      marginBottom: "8px",
      position: "relative",
    },
    logoMain: {
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: "52px",
      letterSpacing: "8px",
      color: "#fff",
      lineHeight: 1,
      position: "relative",
      display: "inline-block",
    },
    logoSub: {
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: "13px",
      letterSpacing: "6px",
      color: "rgba(255,140,0,0.8)",
      marginTop: "2px",
    },
    divider: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      margin: "20px 0",
    },
    divLine: {
      flex: 1,
      height: "0.5px",
      background: "rgba(255,140,0,0.2)",
    },
    divDiamond: {
      width: "6px",
      height: "6px",
      background: "#ff8c00",
      transform: "rotate(45deg)",
      flexShrink: 0,
    },
    label: {
      fontSize: "11px",
      letterSpacing: "3px",
      color: "rgba(255,140,0,0.7)",
      textTransform: "uppercase",
      fontWeight: 600,
      marginBottom: "6px",
      display: "block",
    },
    inputWrap: {
      position: "relative",
      marginBottom: "16px",
    },
    inputIcon: {
      position: "absolute",
      left: "14px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "rgba(255,140,0,0.5)",
      fontSize: "18px",
      pointerEvents: "none",
    },
    input: {
      width: "100%",
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,140,0,0.25)",
      borderRadius: "0",
      padding: "12px 14px 12px 42px",
      fontSize: "15px",
      color: "#fff",
      fontFamily: "'Rajdhani', sans-serif",
      letterSpacing: "1px",
      outline: "none",
      boxSizing: "border-box",
      clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
      transition: "border-color 0.2s, background 0.2s",
    },
    eyeBtn: {
      position: "absolute",
      right: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "none",
      border: "none",
      color: "rgba(255,140,0,0.5)",
      cursor: "pointer",
      fontSize: "18px",
      padding: 0,
    },
    errorBox: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      background: "rgba(255,30,30,0.1)",
      border: "1px solid rgba(255,30,30,0.4)",
      padding: "8px 12px",
      marginBottom: "16px",
      fontSize: "12px",
      letterSpacing: "1.5px",
      color: "#ff4444",
      textTransform: "uppercase",
    },
    btnLogin: {
      width: "100%",
      background: "transparent",
      border: "1px solid #ff8c00",
      padding: "14px",
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: "18px",
      letterSpacing: "6px",
      color: "#ff8c00",
      cursor: "pointer",
      position: "relative",
      overflow: "hidden",
      clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
      transition: "background 0.2s, color 0.2s",
      marginTop: "8px",
    },
    loadingOverlay: {
      position: "absolute",
      inset: 0,
      background: "rgba(255,140,0,0.12)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "12px",
    },
    progressBar: {
      width: "80%",
      height: "3px",
      background: "rgba(255,140,0,0.2)",
      borderRadius: "0",
      overflow: "hidden",
    },
    progressFill: {
      height: "100%",
      background: "#ff8c00",
      transition: "width 0.1s",
    },
    loadingText: {
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: "14px",
      letterSpacing: "4px",
      color: "#ff8c00",
    },
    bottomRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "20px",
    },
    guestBtn: {
      background: "none",
      border: "none",
      color: "rgba(255,255,255,0.3)",
      fontSize: "11px",
      letterSpacing: "2px",
      textTransform: "uppercase",
      cursor: "pointer",
      fontFamily: "'Rajdhani', sans-serif",
      padding: 0,
    },
    createBtn: {
      background: "none",
      border: "none",
      color: "rgba(255,140,0,0.6)",
      fontSize: "11px",
      letterSpacing: "2px",
      textTransform: "uppercase",
      cursor: "pointer",
      fontFamily: "'Rajdhani', sans-serif",
      padding: 0,
      fontWeight: 700,
    },
    cornerTL: {
      position: "absolute",
      top: "-2px", left: "-2px",
      width: "16px", height: "16px",
      borderTop: "2px solid #ff8c00",
      borderLeft: "2px solid #ff8c00",
    },
    cornerBR: {
      position: "absolute",
      bottom: "-2px", right: "-2px",
      width: "16px", height: "16px",
      borderBottom: "2px solid #ff8c00",
      borderRight: "2px solid #ff8c00",
    },
    statusRow: {
      display: "flex",
      gap: "16px",
      marginTop: "24px",
      justifyContent: "center",
    },
    statusItem: {
      display: "flex",
      alignItems: "center",
      gap: "5px",
      fontSize: "10px",
      letterSpacing: "1.5px",
      color: "rgba(255,255,255,0.25)",
      textTransform: "uppercase",
    },
    statusDot: {
      width: "5px",
      height: "5px",
      borderRadius: "50%",
      background: "#00ff88",
      flexShrink: 0,
    },
  };

  return (
    <>
      <style>{glitchKeyframes}</style>
      <div style={styles.root}>
        <canvas ref={canvasRef} style={styles.canvas} />
        <div style={styles.bgLines} />
        <div style={styles.scanline} />
        <div style={styles.vignette} />

        <div style={styles.card}>
          {/* corner accents */}
          <div style={styles.cornerTL} />
          <div style={styles.cornerBR} />

          {/* top bar */}
          <div style={styles.topBar}>
            <div style={styles.topBarLine} />
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <circle cx="10" cy="10" r="1.5" fill="#ff8c00" />
              <line x1="10" y1="0" x2="10" y2="7" stroke="#ff8c00" strokeWidth="1" />
              <line x1="10" y1="13" x2="10" y2="20" stroke="#ff8c00" strokeWidth="1" />
              <line x1="0" y1="10" x2="7" y2="10" stroke="#ff8c00" strokeWidth="1" />
              <line x1="13" y1="10" x2="20" y2="10" stroke="#ff8c00" strokeWidth="1" />
            </svg>
            <div style={styles.topBarLineRight} />
          </div>

          {/* logo */}
          <div style={styles.logoArea}>
            <div style={styles.logoMain}>WARZONE</div>
            <div style={styles.logoSub}>OPERATOR ACCESS</div>
          </div>

          <div style={styles.divider}>
            <div style={styles.divLine} />
            <div style={styles.divDiamond} />
            <div style={styles.divLine} />
          </div>

          {/* username */}
          <label style={styles.label}>Operator ID</label>
          <div style={{ ...styles.inputWrap, animation: shake ? "shake 0.4s ease" : "none" }}>
            <i className="ti ti-user" style={styles.inputIcon} aria-hidden="true" />
            <input
              type="text"
              placeholder="Enter callsign..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(255,140,0,0.7)";
                e.target.style.background = "rgba(255,140,0,0.05)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255,140,0,0.25)";
                e.target.style.background = "rgba(255,255,255,0.03)";
              }}
            />
          </div>

          {/* password */}
          <label style={styles.label}>Access Code</label>
          <div style={{ ...styles.inputWrap, animation: shake ? "shake 0.4s ease" : "none" }}>
            <i className="ti ti-lock" style={styles.inputIcon} aria-hidden="true" />
            <input
              type={showPass ? "text" : "password"}
              placeholder="••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ ...styles.input, paddingRight: "42px" }}
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(255,140,0,0.7)";
                e.target.style.background = "rgba(255,140,0,0.05)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255,140,0,0.25)";
                e.target.style.background = "rgba(255,255,255,0.03)";
              }}
            />
            <button style={styles.eyeBtn} onClick={() => setShowPass(!showPass)} aria-label="Toggle password">
              <i className={`ti ${showPass ? "ti-eye-off" : "ti-eye"}`} aria-hidden="true" />
            </button>
          </div>

          {/* error */}
          {error && (
            <div style={styles.errorBox}>
              <i className="ti ti-alert-triangle" style={{ fontSize: "16px" }} aria-hidden="true" />
              {error}
            </div>
          )}

          {/* login button */}
          <div style={{ position: "relative" }}>
            <button
              style={styles.btnLogin}
              onClick={handleLogin}
              disabled={loading}
              onMouseEnter={(e) => {
                e.target.style.background = "#ff8c00";
                e.target.style.color = "#000";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = "#ff8c00";
              }}
            >
              {loading ? "AUTHENTICATING..." : "DEPLOY"}
            </button>
            {loading && (
              <div style={styles.loadingOverlay}>
                <div style={styles.progressBar}>
                  <div style={{ ...styles.progressFill, width: `${Math.min(loadProgress, 100)}%` }} />
                </div>
                <div style={styles.loadingText}>{Math.min(Math.round(loadProgress), 100)}%</div>
              </div>
            )}
          </div>

          {/* bottom row */}
          <div style={styles.bottomRow}>
            <button style={styles.guestBtn}>Guest Mode</button>
            <button style={styles.createBtn}>Create Account ▸</button>
          </div>

          {/* status */}
          <div style={styles.statusRow}>
            <div style={styles.statusItem}>
              <div style={styles.statusDot} />
              Servers Online
            </div>
            <div style={styles.statusItem}>
              <div style={{ ...styles.statusDot, background: "#ff8c00" }} />
              Season 4 Active
            </div>
          </div>
        </div>
      </div>
    </>
  );
}