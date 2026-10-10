"use client"
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,700;12..96,800&display=swap');

.nf {
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
    radial-gradient(60% 50% at 50% 38%, #2a2670 0%, transparent 70%),
    linear-gradient(180deg, var(--bg) 0%, var(--bg-deep) 100%);
  box-sizing: border-box;
}
.nf *, .nf *::before, .nf *::after { box-sizing: inherit; }

.nf-stars {
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
  animation: nf-twinkle 6s ease-in-out infinite alternate;
}

.nf-wrap {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 34rem;
}

.nf-code {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(0.25rem, 2vw, 1rem);
  font-size: clamp(6rem, 24vw, 13rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.04em;
  margin: 0;
  user-select: none;
}
.nf-digit {
  background: linear-gradient(180deg, #ffffff 0%, #b7aeff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* The zero is a planet with a ring and one small moon that has wandered off. */
.nf-planet {
  position: relative;
  width: 0.78em;
  height: 0.78em;
  flex: none;
  transition: transform 0.2s ease-out;
}
.nf-planet-body {
  position: absolute;
  inset: 8%;
  border-radius: 50%;
  background:
    radial-gradient(circle at 32% 28%, #c9c0ff 0%, var(--violet) 38%, #4a3fb5 100%);
  box-shadow: inset -0.06em -0.08em 0.14em rgba(10, 8, 40, 0.55), 0 0 0.5em rgba(139, 123, 255, 0.45);
}
.nf-planet-ring {
  position: absolute;
  left: -22%;
  right: -22%;
  top: 50%;
  height: 34%;
  transform: translateY(-50%) rotate(-18deg);
  border-radius: 50%;
  border: 0.035em solid rgba(255, 143, 177, 0.85);
  border-bottom-color: rgba(255, 143, 177, 0.3);
}
.nf-orbit {
  position: absolute;
  inset: -14%;
  animation: nf-spin 14s linear infinite;
}
.nf-moon {
  position: absolute;
  top: 6%;
  left: 50%;
  width: 0.14em;
  height: 0.14em;
  margin-left: -0.07em;
  border-radius: 50%;
  background: var(--pink);
  box-shadow: 0 0 0.25em var(--pink);
}

.nf-title {
  font-size: clamp(1.5rem, 4.5vw, 2.1rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 1.5rem 0 0.6rem;
}
.nf-text {
  color: var(--muted);
  font-size: 1.05rem;
  line-height: 1.6;
  margin: 0 auto 2rem;
  max-width: 28rem;
}

.nf-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
}
.nf-btn {
  font: inherit;
  font-weight: 700;
  font-size: 1rem;
  padding: 0.85rem 1.5rem;
  border-radius: 999px;
  border: 1.5px solid transparent;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.15s ease, background 0.15s ease, border-color 0.15s ease;
}
.nf-btn:active { transform: scale(0.97); }
.nf-btn:focus-visible { outline: 3px solid var(--pink); outline-offset: 3px; }
.nf-btn-primary {
  background: var(--ink);
  color: #1b1747;
}
.nf-btn-primary:hover { background: #ffffff; }
.nf-btn-ghost {
  background: transparent;
  color: var(--ink);
  border-color: rgba(237, 235, 255, 0.35);
}
.nf-btn-ghost:hover { border-color: var(--ink); background: rgba(237, 235, 255, 0.08); }

@keyframes nf-spin { to { transform: rotate(360deg); } }
@keyframes nf-twinkle { from { opacity: 0.35; } to { opacity: 0.7; } }

@media (prefers-reduced-motion: reduce) {
  .nf-orbit, .nf-stars { animation: none; }
  .nf-planet { transition: none; }
}
`;

const NotFound: React.FC = () => {
    const planetRef = useRef<HTMLDivElement>(null);

    // Gentle parallax: the planet leans slightly toward the cursor.
    useEffect(() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce) return;

        const onMove = (e: MouseEvent) => {
            const el = planetRef.current;
            if (!el) return;
            const x = (e.clientX / window.innerWidth - 0.5) * 18;
            const y = (e.clientY / window.innerHeight - 0.5) * 18;
            el.style.transform = `translate(${x}px, ${y}px)`;
        };

        window.addEventListener('mousemove', onMove);
        return () => window.removeEventListener('mousemove', onMove);
    }, []);

    return (
        <main className="nf">
            <style>{styles}</style>
            <div className="nf-stars" aria-hidden="true" />

            <div className="nf-wrap">
                <h1 className="nf-code" aria-label="Error 404">
                    <span className="nf-digit" aria-hidden="true">4</span>
                    <div className="nf-planet" ref={planetRef} aria-hidden="true">
                        <div className="nf-planet-body" />
                        <div className="nf-planet-ring" />
                        <div className="nf-orbit">
                            <span className="nf-moon" />
                        </div>
                    </div>
                    <span className="nf-digit" aria-hidden="true">4</span>
                </h1>

                <h2 className="nf-title">This page drifted out of orbit</h2>
                <p className="nf-text">
                    The link may be broken, or the page may have moved. Head back home or
                    return to where you were.
                </p>

                <div className="nf-actions">
                    <Link href="/" className="nf-btn nf-btn-primary">Go to homepage</Link>
                    <button
                        type="button"
                        className="nf-btn nf-btn-ghost"
                        onClick={() => window.history.back()}
                    >
                        Go back
                    </button>
                </div>
            </div>
        </main>
    );
};

export default NotFound;