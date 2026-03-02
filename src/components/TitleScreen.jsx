export default function TitleScreen({ onStart }) {
  return (
    <div className="flex flex-col items-center gap-10 animate-fade-in px-4">
      <div className="text-center">
        <p className="text-[10px] text-[#00fff5]/60 tracking-widest mb-4">ARCADE PRESENTS</p>
        <h1
          className="text-2xl sm:text-3xl leading-relaxed text-[#00fff5] animate-glow-pulse"
        >
          TIC<br/>TAC<br/>TOE
        </h1>
        <div className="mt-4 flex justify-center gap-2">
          {['X', 'O', 'X'].map((v, i) => (
            <span
              key={i}
              className="text-lg"
              style={{
                color: v === 'X' ? '#ff00ff' : '#00fff5',
                textShadow: `0 0 8px ${v === 'X' ? '#ff00ff' : '#00fff5'}`,
              }}
            >
              {v}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <button
          onClick={onStart}
          className="text-sm px-8 py-4 border-2 border-[#00fff5] text-[#00fff5] rounded
                     hover:bg-[#00fff5] hover:text-[#0a0a1a] transition-all duration-150
                     active:scale-95"
          style={{ boxShadow: '0 0 10px #00fff5, 0 0 20px #00fff5' }}
        >
          START
        </button>
      </div>
    </div>
  );
}
