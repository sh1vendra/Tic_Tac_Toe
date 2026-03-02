# Arcade Tic-Tac-Toe

A commercial-grade Tic-Tac-Toe game with a retro neon arcade aesthetic, built with React and deployed on Firebase Hosting.

🎮 **Live Demo → [arcade-ttt.web.app](https://arcade-ttt.web.app)**

---

## Features

### Gameplay
- Player vs CPU — single player experience
- **3 difficulty levels:**
  - **Easy** — CPU makes random moves
  - **Medium** — CPU alternates between smart and random moves
  - **Hard** — CPU uses the Minimax algorithm and is completely unbeatable

### Visuals & UI
- Retro neon arcade theme inspired by 80s arcade cabinets
- Press Start 2P pixel font
- Fully responsive — works on mobile, tablet, and desktop
- Neon-colored X and O pieces with glow effects
- Custom color palette: neon cyan, magenta, green, and yellow

### Animations
- Board entrance animation on game start
- Piece placement animation on every move
- Animated SVG win line drawn across the winning combination
- Screen shake effect on loss
- Neon particle burst on win
- Bounce-in game over modal

### Audio
- Retro 8-bit sound effects generated entirely via the Web Audio API
- Distinct sounds for: piece placement, win, loss, and draw
- No audio files required — all sounds are procedurally generated

### Score Tracking
- Win / Draw / Lose counters
- Scores persist across browser sessions via localStorage
- One-click score reset

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 19 |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS v4 |
| Algorithm | Minimax (Hard AI) |
| Audio | Web Audio API |
| Graphics | HTML5 Canvas API |
| Font | Press Start 2P (Google Fonts) |
| Hosting | Firebase Hosting |
| Version Control | Git & GitHub |

---

## Project Structure

```
src/
├── components/
│   ├── TitleScreen.jsx       # Main menu
│   ├── DifficultySelect.jsx  # Difficulty picker
│   ├── GameBoard.jsx         # Core game board
│   ├── Cell.jsx              # Individual grid cell
│   ├── WinLine.jsx           # SVG animated win line
│   ├── ScoreBoard.jsx        # Score display
│   ├── GameOverModal.jsx     # Win/lose/draw overlay
│   └── ParticleEffect.jsx    # Canvas particle burst
├── game/
│   ├── constants.js          # Game constants and win combinations
│   ├── engine.js             # Win detection, draw detection
│   └── ai.js                 # CPU AI with Minimax algorithm
├── hooks/
│   ├── useGameState.js       # Core game state management
│   ├── useScore.js           # localStorage score tracking
│   └── useSound.js           # Web Audio API sound effects
└── utils/
    └── particles.js          # Particle system logic
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/sh1vendra/test1.git
cd test1

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

### Deploy to Firebase

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login and deploy
firebase login
npm run deploy
```

---

## How It Works

### AI — Minimax Algorithm

The Hard difficulty uses the **Minimax algorithm**, a decision-making algorithm used in game theory. It recursively evaluates all possible future game states and always picks the optimal move, making it impossible to beat.

```
Score = +10 for CPU win, -10 for player win, 0 for draw
```

The algorithm explores every possible board state and selects the move that maximizes the CPU's score while minimizing the player's score.

### Sound — Web Audio API

All sound effects are generated programmatically using the browser's built-in Web Audio API — no audio files are needed. Each sound uses oscillators with different frequencies and waveforms to create distinct retro 8-bit tones.

### Particles — HTML5 Canvas

The win particle burst uses a custom canvas-based particle system. On a player win, 80 neon-colored square particles are emitted from the board center with randomized velocities and fade out over ~2 seconds using `requestAnimationFrame`.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run deploy` | Build and deploy to Firebase Hosting |

---

## License

MIT
