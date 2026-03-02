import { signInWithGoogle, signOutUser } from '../firebase/auth';

export default function LoginButton({ user }) {
  if (user) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-[8px] text-white/60 truncate max-w-[72px]">
          {user.displayName?.split(' ')[0].toUpperCase()}
        </span>
        <button
          onClick={signOutUser}
          className="text-[8px] text-[#ff00ff]/50 hover:text-[#ff00ff] transition-colors"
        >
          OUT
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={signInWithGoogle}
      className="text-[8px] px-2 py-1 border border-[#00fff5]/30 text-[#00fff5]/50
                 hover:text-[#00fff5] hover:border-[#00fff5] rounded transition-all"
    >
      LOGIN
    </button>
  );
}
