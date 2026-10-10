import React from 'react';

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,700;12..96,800&display=swap');

.ld {
  --bg: #15133a;
  --bg-deep: #0e0c28;
  --ink: #edebff;
  --muted: #a9a5d6;
  --violet: #8b7bff;
  --pink: #ff8fb1;
  position: relative;
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 2rem 1.25rem;
  overflow: hidden;
  color: var(--ink);
  font-family: 'Bricolage Grotesque', system-ui, -apple-system, 'Segoe UI', sans-serif;
  background:
    radial-gradient(60% 50% at 50% 42%, #2a2670 0%, transparent 70%),
    linear-gradient(180deg, var(--bg) 0%, var(--bg-deep) 100%);
  box-sizing: border-box;
}
.ld *, .ld *::before, .ld *::after { box-sizing: inherit; }

.ld-stars {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    radial-gradient(1.5px 1.5px at 12% 22%, #fff 50%, transparent 51%),
    radial-gradient(1px 1px at 78% 14%, #fff 50%, transparent 51%),
    radial-gradient(1.5px 1.5px at 88% 68%, #fff 50%, transparent 51%),
    radial-gradient(1px 1px at 24% 80%, #fff 50%, transparent 51%),
    radial-gradient(1px 1px at 52% 9%, #fff 50%, transparent 51%),
    radial-gradient(1.5px 1.5px at 94% 38%, #fff 50%, transparent 51%),
    radial-gradient(1px 1px at 6% 56%, #fff 50%, transparent 51%),
    radial-gradient(1px 1px at 64% 88%, #fff 50%, transparent 51%);
  opacity: 0.55;
  animation: ld-twinkle 6s ease-in-out infinite alternate;
}

.ld-wrap {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* Planet with a ring; the moon circles it while the page loads. */
.ld-planet {
  position: relative;
  width: 7.5rem;
  height: 7.5rem;
  animation: ld-float 3.2s ease-in-out infinite;
}
.ld-body {
  position: absolute;
  inset: 8%;
  border-radius: 50%;
  background: radial-gradient(circle at 32% 28%, #c9c0ff 0%, var(--violet) 38%, #4a3fb5 100%);
  box-shadow:
    inset -0.5rem -0.6rem 1rem rgba(10, 8, 40, 0.55),
    0 0 3rem rgba(139, 123, 255, 0.45);
}
.ld-ring {
  position: absolute;
  left: -24%;
  right: -24%;
  top: 50%;
  height: 34%;
  transform: translateY(-50%) rotate(-18deg);
  border-radius: 50%;
  border: 0.28rem solid rgba(255, 143, 177, 0.85);
  border-bottom-color: rgba(255, 143, 177, 0.3);
}
.ld-orbit {
  position: absolute;
  inset: -16%;
  animation: ld-spin 2.4s linear infinite;
}
.ld-moon {
  position: absolute;
  top: 4%;
  left: 50%;
  width: 0.9rem;
  height: 0.9rem;
  margin-left: -0.45rem;
  border-radius: 50%;
  background: var(--pink);
  box-shadow: 0 0 1rem var(--pink);
}

.ld-title {
  margin: 2.75rem 0 0.4rem;
  font-size: clamp(1.4rem, 4vw, 1.9rem);
  font-weight: 700;
  letter-spacing: -0.02em;
}
.ld-dots span {
  display: inline-block;
  animation: ld-bounce 1.2s ease-in-out infinite;
}
.ld-dots span:nth-child(2) { animation-delay: 0.15s; }
.ld-dots span:nth-child(3) { animation-delay: 0.3s; }

.ld-text {
  margin: 0;
  color: var(--muted);
  font-size: 1rem;
  line-height: 1.6;
}

@keyframes ld-spin { to { transform: rotate(360deg); } }
@keyframes ld-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-0.6rem); }
}
@keyframes ld-bounce {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
  30% { transform: translateY(-0.3em); opacity: 1; }
}
@keyframes ld-twinkle { from { opacity: 0.35; } to { opacity: 0.7; } }

@media (prefers-reduced-motion: reduce) {
  .ld-stars, .ld-planet, .ld-dots span { animation: none; }
  .ld-orbit { animation-duration: 12s; }
}
`;

const LoadingPage: React.FC = () => {
    return (
        <main className="ld" role="status" aria-live="polite" aria-busy="true">
            <style>{styles}</style>
            <div className="ld-stars" aria-hidden="true" />

            <div className="ld-wrap">
                <div className="ld-planet" aria-hidden="true">
                    <div className="ld-body" />
                    <div className="ld-ring" />
                    <div className="ld-orbit">
                        <span className="ld-moon" />
                    </div>
                </div>

                <h1 className="ld-title">
                    Loading
                    <span className="ld-dots" aria-hidden="true">
                        <span>.</span>
                        <span>.</span>
                        <span>.</span>
                    </span>
                </h1>
                <p className="ld-text">Getting things ready for you.</p>
            </div>
        </main>
    );
};

export default LoadingPage;