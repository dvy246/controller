# 🕹️ PRD Addendum #2: Game Arcade, Rewards & 2-Player Mode

---

## Why This Changes Everything

| Metric | Without Games | With Games |
|---|---|---|
| Avg time on site | 2-4 min (test and leave) | **8-15+ min** (test, play, earn, upgrade) |
| Pages per session | 1.5-2 | **4-8** (tool → game → leaderboard → shop) |
| Return visit rate | Low (come back only when controller breaks) | **High** (daily/weekly to beat scores, earn points) |
| Social shares | Occasional test results | **Frequent** ("I scored 98 on Stick Sniper!") |
| Competitor moat | Tools can be copied | **Games + rewards = 3-6 months to replicate** |

> [!IMPORTANT]
> **No controller testing site has games.** This instantly makes ControllerTesting.com the most engaging platform in the space. Users come for the diagnostic tools, stay for the games, and return for the rewards.

---

## Game Arcade Architecture

**URL**: `/games/`

```
/games/
├── /games/                          # Arcade hub (all games grid)
├── /games/stick-maze                # Precision
├── /games/trigger-racer             # Precision
├── /games/analog-shooter            # Precision
├── /games/dpad-runner               # Precision
├── /games/stick-sniper              # Precision
├── /games/button-blitz              # Reflex
├── /games/quick-draw                # Reflex  
├── /games/rhythm-buttons            # Reflex
├── /games/reaction-chain            # Reflex
├── /games/vibration-memory          # Reflex
├── /games/sumo                      # 2-Player
├── /games/tug-of-war                # 2-Player
├── /games/pong                      # 2-Player
├── /games/button-mash-race          # 2-Player
├── /games/air-hockey                # 2-Player
└── /games/leaderboard               # Global scores
```

---

## 🎮 Single-Player Precision Games (5)

### Game 1: Stick Maze Runner
**URL**: `/games/stick-maze`

**Concept**: Navigate a dot through increasingly complex mazes using ONLY the analog stick. Tests your stick's precision and YOUR control.

**Gameplay**:
```
┌────────────────────────────────────┐
│  STICK MAZE RUNNER  Level 7        │
│  ████████████████████████████░░    │
│                                    │
│  ┌──┐    ┌──────────┐             │
│  │  │    │          │   ┌──┐      │
│  │  └────┘   ████   │   │  │      │
│  │           ████   └───┘  │      │
│  │  ●→                     │      │
│  │  ████████   ┌───────────┘      │
│  │             │        ⭐        │
│  └─────────────┘                  │
│                                    │
│  Time: 00:42  Points: 850         │
│  🏆 Best: 00:38                   │
└────────────────────────────────────┘
```

**Controls**:
- Left stick: Move the dot
- Walls = death (restart level)
- Each level gets harder (narrower paths, moving walls, time pressure)
- 20 levels total

**Scoring**:
- Base points per level completed: 100
- Time bonus: faster = more points (up to 2x multiplier)
- No-wall-touch bonus: +50 per level
- Points earned go to reward balance

**Why it tests your controller**: If your stick has drift, you'll struggle to keep the dot steady in narrow passages. After playing, suggest: "Struggling with precision? [Test your stick drift →](/test/controller/drift)"

---

### Game 2: Trigger Racer
**URL**: `/games/trigger-racer`

**Concept**: Top-down racing game where trigger pressure controls speed. L2 = brake, R2 = accelerate. Analog precision matters.

**Gameplay**:
```
┌────────────────────────────────────┐
│  TRIGGER RACER    Lap 2/3          │
│                                    │
│      ╔═══════════════╗             │
│     ╔╝    🏎️→        ╚╗            │
│    ╔╝                 ╚╗           │
│    ║      ┌─────┐      ║          │
│    ║      │     │      ║          │
│    ╚╗     └─────┘     ╔╝          │
│     ╚╗               ╔╝           │
│      ╚═══════════════╝            │
│                                    │
│  Speed: ████████░░ 78%            │
│  R2: ████████░░  L2: ░░░░░░░░░░  │
│  Time: 01:23.456                  │
└────────────────────────────────────┘
```

**Controls**:
- R2 (analog): Accelerate (pressure = speed, feathering required on curves)
- L2 (analog): Brake
- Left stick: Steer
- 5 tracks of increasing difficulty

**Scoring**: Fastest lap times, earned points per race

**Why it tests your controller**: Tests trigger linearity and stick steering precision. "Your R2 only reached 87%? [Test your triggers →](/test/controller/triggers)"

---

### Game 3: Analog Target Shooter
**URL**: `/games/analog-shooter`

**Concept**: Targets appear on screen. Use the right stick to aim a crosshair and R2 to fire. Accuracy-based scoring.

**Gameplay**:
```
┌────────────────────────────────────┐
│  ANALOG SHOOTER    Wave 5          │
│                                    │
│        🎯         🎯              │
│    🎯                    🎯       │
│                                    │
│              +                     │
│         (crosshair)                │
│                                    │
│    🎯              🎯   🎯       │
│                                    │
│  Hits: 23/30  Accuracy: 77%       │
│  Score: 2,340  Streak: 5x         │
└────────────────────────────────────┘
```

**Controls**:
- Right stick: Aim crosshair
- R2: Shoot (pressure = charge shot for bigger targets)
- L1/R1: Switch weapons (different crosshair sizes)
- Targets get smaller, faster, and more numerous per wave

**Scoring**: Points per hit × accuracy multiplier × streak bonus

---

### Game 4: D-Pad Platformer
**URL**: `/games/dpad-runner`

**Concept**: Retro-style endless runner controlled entirely by D-pad. Jump, duck, switch lanes.

**Controls**:
- D-pad Up: Jump
- D-pad Down: Slide/duck
- D-pad Left/Right: Switch lanes
- Gets progressively faster
- Collect coins for points

**Scoring**: Distance × coins collected

---

### Game 5: Stick Sniper
**URL**: `/games/stick-sniper`

**Concept**: Tiny targets appear at random positions. Move crosshair with stick and press A/Cross to lock on. Measures how fast and precisely you can reach the target.

**Gameplay**:
```
┌────────────────────────────────────┐
│  STICK SNIPER    Round 15          │
│                                    │
│                         ●          │
│                        (target)    │
│                                    │
│         +                          │
│       (you)                        │
│                                    │
│  Avg Time: 342ms  Best: 198ms     │
│  Score: 4,200                     │
│                                    │
│  This also measures your stick's   │
│  response speed & precision!       │
└────────────────────────────────────┘
```

**Controls**: Left stick to aim, A/Cross to confirm
**Scoring**: Faster + more accurate = more points

---

## ⚡ Single-Player Reflex Games (5)

### Game 6: Button Blitz
**URL**: `/games/button-blitz`

**Concept**: Buttons flash on the controller visualization. Press the matching button as fast as possible. Like Simon Says but faster.

**Gameplay**:
```
┌────────────────────────────────────┐
│  BUTTON BLITZ    Speed: INSANE     │
│                                    │
│       [Y]                          │
│    [X]   [B]    ← Press B NOW!    │
│       [A]                          │
│                                    │
│  ████████████████████░░░░  Timer   │
│                                    │
│  Streak: 47  Speed: 180ms avg     │
│  Score: 8,900  Multiplier: 4x     │
│                                    │
│  🏆 #12 on Leaderboard            │
└────────────────────────────────────┘
```

**Controls**: Press the button that lights up. Speed increases over time.
**Scoring**: Streak × speed multiplier
**Why it tests your controller**: Tests every button works and measures response time

---

### Game 7: Quick Draw Duel
**URL**: `/games/quick-draw`

**Concept**: Western showdown. Screen says "WAIT..." then "DRAW!" — press any button as fast as possible. Measures pure reaction time.

**Controls**: Any button to draw
**Scoring**: Fastest draw time. Track personal bests.
**2-Player variant**: Both players wait → both draw → fastest wins

---

### Game 8: Rhythm Buttons
**URL**: `/games/rhythm-buttons`

**Concept**: Guitar Hero / rhythm game. Button prompts scroll down the screen in time with music. Press the matching button when it hits the target zone.

**Gameplay**:
```
┌────────────────────────────────────┐
│  RHYTHM BUTTONS    ♪ Track 3       │
│                                    │
│     [X]                            │
│          [B]                       │
│     [X]       [A]                  │
│                                    │
│  ──────────────────── HIT ZONE ─── │
│     [X]  [Y]  [B]  [A]            │
│                                    │
│  Combo: 23x  Score: 5,600         │
│  Perfect: 18  Good: 4  Miss: 1    │
└────────────────────────────────────┘
```

**Controls**: Face buttons (A/B/X/Y or Cross/Circle/Square/Triangle)
**Scoring**: Perfect/Good/Miss timing × combo multiplier
**Music**: Royalty-free chiptune/electronic tracks (bundled as audio files)

---

### Game 9: Reaction Chain
**URL**: `/games/reaction-chain`

**Concept**: A sequence of random inputs appears: "Left stick UP → Press B → R2 full → D-pad LEFT". Execute the entire chain as fast as possible.

**Controls**: All controller inputs (sticks, buttons, triggers, d-pad)
**Scoring**: Total chain time, accuracy
**Why it tests your controller**: Tests EVERY input type in rapid succession — the ultimate controller workout

---

### Game 10: Vibration Memory
**URL**: `/games/vibration-memory`

**Concept**: The controller plays a sequence of vibration patterns (short/long, left/right motor, strong/weak). Player must reproduce the sequence by pressing buttons.

**Gameplay**:
```
┌────────────────────────────────────┐
│  VIBRATION MEMORY    Level 6       │
│                                    │
│  Listen to the pattern:            │
│  [▶ Play Pattern]                  │
│                                    │
│  Pattern: ● ●● ○ ● ○○ ●          │
│  (● = strong, ○ = weak)           │
│                                    │
│  Now repeat:                       │
│  [L1: Weak Left] [R1: Weak Right] │
│  [L2: Strong Left] [R2: Strong Rt]│
│                                    │
│  Correct: 5/7  Score: 1,200       │
└────────────────────────────────────┘
```

**Controls**: Triggers to replay patterns (L = left motor, R = right motor, pressure = intensity)
**Scoring**: Correct sequences × level multiplier
**Why it's unique**: The ONLY game on the internet that uses controller vibration as a gameplay mechanic

---

## 👥 2-Player Games (5)

> [!TIP]
> All 2-player games require 2 controllers connected simultaneously. They use the **Multi-Controller** detection from the Gamepad API (`navigator.getGamepads()` returns up to 4 controllers).

### Game 11: Stick Sumo
**URL**: `/games/sumo`

**Concept**: Two circles on a platform. Each player controls their circle with the left stick. Push the opponent off the edge to win.

**Gameplay**:
```
┌────────────────────────────────────┐
│  STICK SUMO    Best of 5           │
│                                    │
│  P1: 🔵 2 wins    P2: 🔴 1 win   │
│                                    │
│         ╭───────────────╮          │
│        ╱                 ╲         │
│       │    🔵     🔴     │        │
│       │     ←push→       │        │
│        ╲                 ╱         │
│         ╰───────────────╯          │
│              (ring)                │
│                                    │
│  P1: Left Stick    P2: Left Stick │
│  [A to boost]      [A to boost]  │
└────────────────────────────────────┘
```

**Controls per player**: Left stick = move, A/Cross = dash/boost (limited uses)
**Scoring**: Best of 5 rounds

---

### Game 12: Trigger Tug of War
**URL**: `/games/tug-of-war`

**Concept**: A rope with a marker in the center. P1 pulls with L2+R2, P2 pulls with L2+R2. Whoever exerts more total trigger pressure pulls the rope to their side.

**Gameplay**:
```
┌────────────────────────────────────┐
│  TRIGGER TUG OF WAR                │
│                                    │
│  P1 🔵                     🔴 P2  │
│  ◄════════════╪══════════════►     │
│           (center)                  │
│                                    │
│  P1 Force: ████████░░ 82%         │
│  P2 Force: ██████░░░░ 64%         │
│                                    │
│  P1 L2: 90%  R2: 74%              │
│  P2 L2: 58%  R2: 70%              │
│                                    │
│  Round 2/3  P1 leads 1-0          │
└────────────────────────────────────┘
```

**Controls**: Both triggers = pulling force. Mash buttons for stamina boosts.
**Why it's fun**: Pure controller strength test. Also reveals if one player's triggers can't reach 100%.

---

### Game 13: Pong Classic
**URL**: `/games/pong`

**Concept**: The classic. Left stick controls paddle. 2 players, local multiplayer.

**Gameplay**:
```
┌────────────────────────────────────┐
│  PONG    P1: 7    P2: 5           │
│                                    │
│  █                              █  │
│  █              ●               █  │
│  █            ↗                 █  │
│  █                              █  │
│  █                              █  │
│                                    │
│  First to 11 wins                 │
└────────────────────────────────────┘
```

**Controls**: Left stick (Y-axis) = paddle movement per player
**Extras**: Ball speed increases over rally length. Trigger = spin shot.

---

### Game 14: Button Mash Race
**URL**: `/games/button-mash-race`

**Concept**: Two runners on a track. Mash any button as fast as possible to sprint. First to finish line wins.

**Gameplay**:
```
┌────────────────────────────────────┐
│  BUTTON MASH RACE    100m Dash    │
│                                    │
│  P1 🔵 ══════════▶──────── 🏁    │
│         68%                        │
│  P2 🔴 ════════▶────────── 🏁    │
│         54%                        │
│                                    │
│  P1 CPS: 12.4    P2 CPS: 9.8     │
│                                    │
│  MASH ANY BUTTON!                 │
└────────────────────────────────────┘
```

**Controls**: Any button = sprint. Faster mashing = faster running.
**Extras**: Multiple distances (100m, 200m, marathon). Track personal CPS records.

---

### Game 15: Air Hockey
**URL**: `/games/air-hockey`

**Concept**: Top-down air hockey. Each player controls a paddle with their left stick.

**Controls**: Left stick = paddle movement, constrained to player's half
**Scoring**: First to 7 goals
**Extras**: Power shots with trigger (R2 = charge, release = powerful hit)

---

## 💰 Reward Points System

### How Points Are Earned

| Activity | Points | Limit |
|---|---|---|
| **Complete a diagnostic test** | 50 pts | Once per controller per day |
| **Run Full Diagnostic Wizard** | 200 pts | Once per day |
| **Submit to Community Database** | 100 pts | Once per controller |
| **Win a single-player game level** | 10-50 pts per level | Based on difficulty |
| **Set a new personal best** | 100 pts | Once per game |
| **Win a 2-player game** | 75 pts | Unlimited |
| **Complete an achievement** | 50-500 pts | Once per achievement |
| **Daily visit streak** | 25 pts/day (×streak multiplier) | Capped at 30-day streak (30x = 750 pts/day) |
| **Share a result on social** | 50 pts | Once per day |

### Points Storage
```javascript
// All stored in localStorage — no backend needed
const rewardData = {
  totalPoints: 4250,
  availablePoints: 2100,  // Total - spent
  spentPoints: 2150,
  dailyStreak: 7,
  lastVisit: '2027-01-15',
  achievements: ['first-test', 'drift-detective', 'button-master'],
  unlockedUpgrades: ['neon-trail', 'retro-theme', 'click-sound-1'],
  gameScores: {
    'stick-maze': { best: 12400, level: 14 },
    'button-blitz': { best: 8900, streak: 47 },
    // ...
  }
};
localStorage.setItem('ct-rewards', JSON.stringify(rewardData));
```

---

## 🛒 Reward Shop — Cosmetic Upgrades

**URL**: `/rewards/shop`

> [!NOTE]
> All upgrades are **cosmetic only** — they change how the tools look and feel but never affect test accuracy or results. This keeps the testing tools trustworthy.

### Dashboard Themes (Visual Theme for Tool Pages)

| Theme | Cost | Description |
|---|---|---|
| 🌊 **Ocean Blue** | 500 pts | Cool blue gradient backgrounds, wave animations |
| 🔥 **Lava Red** | 500 pts | Deep red/orange accents, ember particle effects |
| 🌿 **Forest Green** | 500 pts | Nature-inspired greens, leaf particles |
| 💜 **Neon Purple** | 750 pts | Cyberpunk purple/pink neon glow effects |
| 🌈 **RGB Gamer** | 1000 pts | Rotating rainbow accents, RGB-style animations |
| ⬛ **OLED Black** | 750 pts | Pure #000000 blacks with minimal accent |
| 🏆 **Gold Premium** | 2000 pts | Gold accents, luxury feel, metallic sheen |
| 🕹️ **Retro 8-Bit** | 1500 pts | Pixel art aesthetic, chiptune sounds, CRT effect |

### Stick Trail Colors (Analog Stick Visualizer)

| Trail | Cost | Effect |
|---|---|---|
| Default White | Free | Standard trail |
| 🔵 Electric Blue | 200 pts | Blue neon trail with glow |
| 🟢 Matrix Green | 200 pts | Green trail with falling code effect |
| 🔴 Fire Red | 200 pts | Red trail with spark particles |
| 🌈 Rainbow | 500 pts | HSL cycling rainbow trail |
| ⚡ Lightning | 750 pts | Trail that looks like electricity |
| 🌟 Stardust | 1000 pts | Sparkle particle trail |

### Button Press Effects (Button Tester)

| Effect | Cost | Description |
|---|---|---|
| Default Highlight | Free | Simple color change |
| 💥 Explosion | 300 pts | Burst animation on press |
| 🎵 Musical Notes | 300 pts | Each button plays a different note |
| 🔊 Arcade Sounds | 500 pts | Retro arcade sound effects |
| ✨ Sparkle | 300 pts | Glitter burst on press |
| 🌊 Ripple | 500 pts | Ripple wave emanating from pressed button |

### Controller Skins (Visual Overlays for Tool Pages)

| Skin | Cost | Description |
|---|---|---|
| Default Wire | Free | Simple wireframe controller |
| 🎮 Solid Colors | 400 pts | Flat-color filled controller (pick your color) |
| 🌈 Gradient | 600 pts | Gradient-filled controller |
| 💀 Skull & Bones | 800 pts | Edgy gamer aesthetic |
| 🌌 Galaxy | 1000 pts | Space/nebula texture on controller |
| 🔥 Flame Wrap | 1000 pts | Fire pattern skin |
| 🏁 Racing Stripe | 800 pts | Racing-themed controller |
| 🎄 Seasonal | 500 pts | Changes with seasons (snowflake, flowers, etc.) |

### Profile Badges (Shown on Leaderboard & Shared Results)

| Badge | Cost | Requirement |
|---|---|---|
| 🔰 Rookie | Free | Complete first test |
| ⭐ Regular | Auto | 10+ tests completed |
| 💪 Dedicated | Auto | 30-day visit streak |
| 🏆 Champion | Auto | #1 on any game leaderboard |
| 🎯 Sharpshooter | 500 pts | 95%+ accuracy in Analog Shooter |
| ⚡ Speed Demon | 500 pts | Sub-200ms reaction in Quick Draw |
| 🧠 Memory Master | 500 pts | Level 10+ in Vibration Memory |
| 🎮 Controller Expert | 1000 pts | Run Full Diagnostic on 5+ different controllers |
| 👑 Platinum | 2000 pts | Unlock all achievements |

### Animated Backgrounds (Tool Pages)

| Background | Cost | Description |
|---|---|---|
| Default Static | Free | Solid dark/light |
| 🌟 Floating Particles | 500 pts | Subtle floating dots |
| 🌊 Wave Motion | 750 pts | Gentle wave pattern |
| 🔲 Grid Pulse | 500 pts | Pulsing grid lines |
| 🌌 Starfield | 1000 pts | Slow-moving stars |
| 🔥 Ember Float | 750 pts | Floating ember particles |

---

## 🏆 Achievement System (30+ Achievements)

### Testing Achievements

| Achievement | Requirement | Points |
|---|---|---|
| 🔰 **First Steps** | Run your first controller test | 50 |
| 🔍 **Drift Detective** | Detect drift on any controller | 100 |
| ✅ **Clean Bill of Health** | Get 95+ Health Score | 150 |
| 📊 **Data Contributor** | Submit 5 tests to community database | 200 |
| 📈 **Trend Tracker** | Use Drift Timeline for 3+ months | 300 |
| 🎮 **Multi-Tasker** | Test 3+ different controllers | 200 |
| 🔧 **Fix Verified** | Re-test after repair and show improvement | 250 |
| 🛡️ **Warranty Winner** | Use Warranty Assistant | 100 |
| 📄 **Report Card** | Download a PDF test report | 100 |
| 🧪 **Lab Rat** | Try every single testing tool (all 17) | 500 |

### Game Achievements

| Achievement | Requirement | Points |
|---|---|---|
| 🎮 **Arcade Regular** | Play 5 different games | 100 |
| 🏆 **High Scorer** | Set a personal best in any game | 100 |
| 🔥 **On Fire** | 50+ streak in Button Blitz | 200 |
| ⚡ **Lightning Reflexes** | Sub-150ms in Quick Draw | 300 |
| 🎯 **Bullseye** | 100% accuracy in Stick Sniper (10+ rounds) | 300 |
| 🏎️ **Speed Racer** | Complete all 5 Trigger Racer tracks | 200 |
| 🧠 **Memory Champion** | Reach Level 15 in Vibration Memory | 300 |
| 🎵 **Rhythm Master** | Full combo on any Rhythm Buttons track | 300 |
| 🏃 **Marathon Runner** | 1000m+ in D-Pad Platformer | 200 |
| 🏅 **Top 10** | Reach global top 10 in any game | 500 |

### 2-Player Achievements

| Achievement | Requirement | Points |
|---|---|---|
| 👥 **Party Starter** | Play your first 2-player game | 100 |
| 🤝 **Friendly Rival** | Play 10 2-player games | 200 |
| 🥊 **Sumo Champion** | Win 10 Sumo matches | 200 |
| 💪 **Tug Master** | Win Tug of War 3-0 | 200 |
| 🏓 **Pong Pro** | Score 11-0 in Pong | 300 |
| 🏒 **Hat Trick** | Score 3 goals in one Air Hockey match without opponent scoring | 300 |

### Meta Achievements

| Achievement | Requirement | Points |
|---|---|---|
| 📅 **Week Warrior** | 7-day visit streak | 200 |
| 📅 **Monthly Master** | 30-day visit streak | 500 |
| 🌙 **Night Owl** | Use the site after midnight (local time) | 50 |
| 🌅 **Early Bird** | Use the site before 7am (local time) | 50 |
| 🔄 **Theme Switcher** | Toggle dark/light mode 10 times | 50 |
| 🛒 **First Purchase** | Buy your first cosmetic upgrade | 100 |
| 🎨 **Collector** | Unlock 10 cosmetic upgrades | 300 |
| 👑 **Completionist** | Unlock ALL achievements | 1000 |

---

## 🏅 Leaderboard System

**URL**: `/games/leaderboard`

### How It Works
- Scores are submitted anonymously (no account required)
- User chooses a display name (stored in localStorage, editable anytime)
- Scores sent to a lightweight serverless endpoint (Cloudflare Worker + D1 database)
- Separate leaderboard per game
- Filters: All-Time, This Month, This Week, Today

### Leaderboard Page Layout
```
┌─────────────────────────────────────────────────┐
│  🏆 LEADERBOARD                                 │
│                                                  │
│  [Button Blitz ▼]  [All-Time ▼]  [🌍 Global]   │
│                                                  │
│  ┌─────────────────────────────────────────────┐│
│  │ #  Name           Score    Badge    Date    ││
│  │ 1  🥇 xStickGod    12,400  👑      Jan 15  ││
│  │ 2  🥈 DriftKing    11,890  ⭐      Jan 14  ││
│  │ 3  🥉 PadMaster     9,200  ⚡      Jan 13  ││
│  │ 4     ProGamer42    8,900  🎮      Jan 15  ││
│  │ 5     CasualCarl    8,100  🔰      Jan 12  ││
│  │ ...                                         ││
│  │ 47  → YOU ←        4,200  🔰      Jan 15  ││
│  └─────────────────────────────────────────────┘│
│                                                  │
│  Your Best: 4,200  Rank: #47  Top: 12%          │
│  [🔄 Refresh]  [📤 Share Rank]                  │
└─────────────────────────────────────────────────┘
```

### Anti-Cheat Measures
- **Rate limiting**: Max 1 score submission per game per minute
- **Reasonable bounds**: Reject impossibly high scores (CPS > 30, reaction < 50ms)
- **Consistency check**: Score must be achievable given the game's mechanics
- **Fingerprinting**: Browser fingerprint to prevent mass spam (no accounts = need passive protection)

---

## Technical Implementation

### Game Engine (Lightweight, No Libraries)

All games use **vanilla Canvas 2D** — no game engines, no heavy dependencies.

```javascript
// Shared game loop pattern
class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.running = false;
    this.score = 0;
    this.lastFrame = 0;
  }

  start() {
    this.running = true;
    this.loop(0);
  }

  loop(timestamp) {
    if (!this.running) return;
    const delta = timestamp - this.lastFrame;
    this.lastFrame = timestamp;
    
    this.update(delta);
    this.render(this.ctx);
    
    requestAnimationFrame((t) => this.loop(t));
  }

  getGamepadInput() {
    const gamepads = navigator.getGamepads();
    return {
      p1: gamepads[0] || null,
      p2: gamepads[1] || null,
    };
  }

  update(delta) { /* Override per game */ }
  render(ctx) { /* Override per game */ }
}
```

### Theme-Aware Canvas Rendering

Games must respect the dark/light theme:
```javascript
// Read CSS custom properties for canvas rendering
const styles = getComputedStyle(document.documentElement);
const bgColor = styles.getPropertyValue('--color-bg-primary').trim();
const textColor = styles.getPropertyValue('--color-text-primary').trim();
const accentColor = styles.getPropertyValue('--color-brand-primary').trim();
```

### Reward System Integration

```javascript
// After game ends
function onGameComplete(gameName, score) {
  const rewards = JSON.parse(localStorage.getItem('ct-rewards') || '{}');
  
  // Award base points
  const pointsEarned = calculatePoints(gameName, score);
  rewards.totalPoints = (rewards.totalPoints || 0) + pointsEarned;
  rewards.availablePoints = (rewards.availablePoints || 0) + pointsEarned;
  
  // Check for new personal best
  if (!rewards.gameScores) rewards.gameScores = {};
  if (!rewards.gameScores[gameName] || score > rewards.gameScores[gameName].best) {
    rewards.gameScores[gameName] = { best: score };
    rewards.totalPoints += 100; // Personal best bonus
    rewards.availablePoints += 100;
  }
  
  // Check achievements
  checkAchievements(rewards);
  
  localStorage.setItem('ct-rewards', JSON.stringify(rewards));
  
  // Show points earned animation
  showPointsAnimation(pointsEarned);
}
```

---

## SEO Impact of Games

### New Pages Added

| Page | SEO Target Keywords |
|---|---|
| `/games/` | "free controller games online", "gamepad games browser" |
| `/games/stick-maze` | "controller precision test game", "analog stick game" |
| `/games/trigger-racer` | "trigger racing game", "controller racing browser" |
| `/games/pong` | "2 player pong online controller", "pong with gamepad" |
| `/games/button-blitz` | "button speed test game", "controller reaction game" |
| `/games/quick-draw` | "reaction time game controller" |
| `/games/sumo` | "2 player controller game browser" |
| `/games/leaderboard` | "controller game leaderboard" |
| `/rewards/shop` | — (internal engagement, not SEO target) |
| `/rewards/achievements` | — (internal engagement, not SEO target) |

**Total new pages**: 17 (15 games + leaderboard + shop)

### Engagement Metrics Improvement

| Metric | Before Games | After Games | SEO Impact |
|---|---|---|---|
| Avg session duration | 2-4 min | **8-15 min** | Massive positive signal |
| Pages per session | 1.5-2 | **4-8** | Higher crawl priority |
| Bounce rate | 60-70% | **30-40%** | Lower bounce = higher rankings |
| Return visits | Monthly | **Daily/Weekly** | Freshness + loyalty signals |
| Social shares | Rare | **Frequent** (score cards) | Earned backlinks |

---

## Updated Total Page Count

| Section | Pages |
|---|---|
| Testing Tools | 54 |
| Games & Arcade | 17 |
| Controller Profiles | 35+ |
| Repair Guides | 60+ |
| Game Settings | 100+ |
| Comparisons | 80+ |
| Connection Guides | 80+ |
| Buying Guides | 30+ |
| Rewards & Shop | 3 |
| Community Data | 15+ |
| Educational | 25+ |
| **TOTAL** | **830+** |
