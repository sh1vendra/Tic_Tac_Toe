export default function Cell({ value, onClick, isWinning, index }) {
  const isEmpty = value === null;

  const valueStyle = value === 'X'
    ? 'text-[#ff00ff] drop-shadow-[0_0_8px_#ff00ff] drop-shadow-[0_0_16px_#ff00ff]'
    : 'text-[#00fff5] drop-shadow-[0_0_8px_#00fff5] drop-shadow-[0_0_16px_#00fff5]';

  return (
    <button
      onClick={onClick}
      disabled={!isEmpty}
      className={[
        'relative flex items-center justify-center',
        'w-full aspect-square',
        'bg-[#16213e] border border-[#00fff5]/30',
        'text-4xl sm:text-5xl font-bold font-arcade',
        'transition-all duration-150',
        isEmpty ? 'hover:bg-[#1a1a2e] hover:border-[#00fff5]/70 cursor-pointer' : 'cursor-default',
        isWinning ? 'animate-win-flash bg-[#1a1a2e]' : '',
      ].filter(Boolean).join(' ')}
    >
      {value && (
        <span
          key={`${index}-${value}`}
          className={`animate-piece-place inline-block ${valueStyle}`}
        >
          {value}
        </span>
      )}
    </button>
  );
}
