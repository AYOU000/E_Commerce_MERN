// LightningBackground.tsx
// Drop this component once inside your App.tsx, just below <NavBar />
// It renders fixed SVG bolts + glow spots behind all page content.


const BOLTS = [
  // [x, points string] — scattered across full viewport width
  'M120,0 L98,42 L112,42 L88,90 L130,38 L114,38 L140,0 Z',
  'M340,0 L322,38 L334,38 L312,82 L350,34 L336,34 L358,0 Z',
  'M560,0 L538,44 L552,44 L528,96 L575,40 L558,40 L582,0 Z',
  'M780,0 L761,36 L773,36 L752,78 L790,32 L776,32 L798,0 Z',
  'M1000,0 L980,40 L994,40 L970,88 L1012,36 L996,36 L1020,0 Z',
  'M1200,0 L1182,34 L1194,34 L1174,72 L1210,30 L1196,30 L1218,0 Z',
];

const CRACKLES = [
  'M0,25 L60,22 L90,8 L140,28 L200,5 L260,32 L340,14 L420,36 L500,10 L560,28',
  'M560,28 L630,12 L710,38 L790,16 L870,34 L950,8 L1040,30 L1120,14 L1200,26',
  'M0,65 L80,60 L130,78 L200,52 L280,72 L360,48 L450,70 L540,44 L600,62',
  'M600,62 L680,80 L760,55 L840,75 L920,50 L1010,68 L1100,45 L1200,60',
];

export default function LightningBackground() {
  return (
    <>
      {/* Soft radial glow blobs */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        {/* Top-left glow */}
        <div style={{
          position: 'absolute', width: 520, height: 320,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(255,230,0,0.07) 0%, transparent 70%)',
          filter: 'blur(80px)',
          top: '8%', left: '-80px',
          animation: 'glowPulse 6s ease-in-out infinite',
        }} />
        {/* Bottom-right glow */}
        <div style={{
          position: 'absolute', width: 420, height: 420,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(255,230,0,0.05) 0%, transparent 70%)',
          filter: 'blur(80px)',
          bottom: '10%', right: '-60px',
          animation: 'glowPulse 6s ease-in-out infinite 3s',
        }} />
        {/* Center glow */}
        <div style={{
          position: 'absolute', width: 300, height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(255,230,0,0.04) 0%, transparent 70%)',
          filter: 'blur(60px)',
          top: '45%', left: '48%',
          transform: 'translate(-50%,-50%)',
          animation: 'glowPulse 8s ease-in-out infinite 1.5s',
        }} />
      </div>

      {/* SVG bolts + crackle lines */}
      <svg
        style={{
          position: 'fixed', inset: 0, width: '100%', height: '100%',
          pointerEvents: 'none', zIndex: 0,
          overflow: 'visible',
        }}
        viewBox="0 0 1280 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <style>{`
            @keyframes boltFlicker {
              0%,100% { opacity: 0.12; }
              20%      { opacity: 0.20; }
              50%      { opacity: 0.08; }
              75%      { opacity: 0.18; }
            }
            @keyframes crackleAnim {
              0%,100% { opacity: 0.10; stroke-dashoffset: 0; }
              50%      { opacity: 0.20; stroke-dashoffset: 12; }
            }
            @keyframes sparkBlink {
              0%,100% { opacity: 0.15; r: 1.5px; }
              50%      { opacity: 0.55; r: 2.5px; }
            }
            @keyframes glowPulse {
              0%,100% { opacity: 0.6; }
              50%      { opacity: 1; }
            }
            .bg-bolt { animation: boltFlicker 3s ease-in-out infinite; fill: #FFE600; }
            .bg-bolt:nth-child(2) { animation-delay: 0.8s; }
            .bg-bolt:nth-child(3) { animation-delay: 1.6s; }
            .bg-bolt:nth-child(4) { animation-delay: 0.4s; }
            .bg-bolt:nth-child(5) { animation-delay: 2.1s; }
            .bg-bolt:nth-child(6) { animation-delay: 1.2s; }
            .bg-crackle {
              fill: none; stroke: #FFE600; stroke-width: 0.8;
              stroke-dasharray: 8 4;
              animation: crackleAnim 2.5s ease-in-out infinite;
            }
            .bg-crackle:nth-child(odd)  { animation-delay: 0s; }
            .bg-crackle:nth-child(even) { animation-delay: 1.25s; }
            .bg-spark { fill: #FFE600; animation: sparkBlink 1.8s ease-in-out infinite; }
          `}</style>
        </defs>

        {/* Lightning bolts — scattered vertically across the page */}
        {BOLTS.map((d, i) => (
          <path key={i} className="bg-bolt" d={d} opacity="0.12"
            transform={`translate(0, ${i % 2 === 0 ? 200 : 500})`}
          />
        ))}

        {/* Crackle lines — two rows */}
        {CRACKLES.map((d, i) => (
          <polyline key={i} className="bg-crackle" points={d.replace(/M|L/g, '').trim()} opacity="0.12" />
        ))}

        {/* Repeat crackles lower on page */}
        {CRACKLES.map((d, i) => (
          <polyline
            key={`low-${i}`} className="bg-crackle"
            points={d.replace(/M|L/g, '').trim()}
            opacity="0.08"
            transform="translate(0, 400)"
          />
        ))}

        {/* Spark dots scattered across */}
        {[80,200,360,520,680,840,1000,1160].map((x, i) => (
          <circle
            key={i} className="bg-spark"
            cx={x} cy={i % 2 === 0 ? 180 : 650}
            r="2" opacity="0.2"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
        {[140,300,460,620,780,940,1100].map((x, i) => (
          <circle
            key={`s2-${i}`} className="bg-spark"
            cx={x} cy={i % 2 === 0 ? 420 : 750}
            r="1.5" opacity="0.15"
            style={{ animationDelay: `${i * 0.25 + 0.5}s` }}
          />
        ))}
      </svg>
    </>
  );
}
