<template>
  <div class="game-page">
    <div class="difficulty-section">
      <button
        v-for="level in difficulties"
        :key="level.size"
        @click="setDifficulty(level.size)"
        :class="['difficulty-btn', { active: gridSize === level.size }]"
      >
        {{ level.size }}x{{ level.size }}
      </button>
    </div>

    <div class="stats-container">
      <div class="stat-item">
        <span class="stat-label">Timer:</span>
        <span class="stat-value">{{ formattedTime }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Moves:</span>
        <span class="stat-value">{{ moves }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Matches:</span>
        <span class="stat-value">{{ matches }} / {{ totalPairs }}</span>
      </div>
    </div>

    <div
      class="game-grid"
      :style="{
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        gridTemplateRows: `repeat(${gridSize}, 1fr)`,
        maxWidth: `${gridSize * 200}px`,
      }"
    >
      <div
        v-for="(card, index) in cards"
        :key="index"
        @click="flipCard(index)"
        class="card-wrapper"
      >
        <div
          :class="[
            'card',
            {
              flipped: card.isFlipped || card.isMatched,
              matched: card.isMatched,
            },
          ]"
        >
          <div class="card-back">?</div>
          <div class="card-front">{{ card.symbol }}</div>
        </div>
      </div>
    </div>

    <div v-if="isGameWon" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h2 class="modal-title">Congratulations!</h2>
        <p class="modal-text">You completed the game!</p>
        <div class="modal-stats">
          <p>
            Time: <strong>{{ formattedTime }}</strong>
          </p>
          <p>
            Moves: <strong>{{ moves }}</strong>
          </p>
          <p>
            Difficulty: <strong>{{ gridSize }}x{{ gridSize }}</strong>
          </p>
        </div>
        <button @click="playAgain" class="modal-btn">Play Again</button>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "default",
  middleware: "auth",
});

useSeoMeta({
  title: "Memory Card Game | Test Your Brain Power",
  ogTitle: "Memory Card Game: The Ultimate Card Matching Game",
  description:
    "Challenge your memory with this addictive card matching game. Improve your focus, train your brain, and climb the global leaderboards!",
  ogDescription:
    "Flip cards, find pairs, and beat the clock! Play Memory Card Game for free in your browser.",
  ogImage: "./memory-card-game-og.png",
  twitterImage: "./memory-card-game-og.png",
  twitterCard: "summary_large_image",
  twitterTitle: "Memory Card Game",
  twitterDescription:
    "Train your brain with the ultimate memory card challenge.",
  author: "Nicoa George-Petrus",
});

const { saveScore } = useScores();

const difficulties = [{ size: 4 }, { size: 6 }, { size: 8 }];

const symbols = [
  "🎮",
  "🎯",
  "🎨",
  "🎭",
  "🎪",
  "🎸",
  "🎺",
  "🎹",
  "🎤",
  "🎧",
  "🎬",
  "🎲",
  "🕹️",
  "👾",
  "🎰",
  "🧱",
  "💣",
  "🚀",
  "💎",
  "🔋",
  "♟️",
  "🧩",
  "🀄",
  "🃏",
  "🎱",
  "🪀",
  "🪁",
  "🧿",
  "🎻",
  "🎷",
  "🪗",
  "📻",
];

const gridSize = ref(4);
const cards = ref([]);
const flippedCards = ref([]);
const moves = ref(0);
const matches = ref(0);
const timer = ref(0);
const timerInterval = ref(null);
const isGameWon = ref(false);

const totalPairs = computed(() => (gridSize.value * gridSize.value) / 2);

const formattedTime = computed(() => {
  const mins = Math.floor(timer.value / 60);
  const secs = timer.value % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
});

function setDifficulty(size) {
  gridSize.value = size;
  resetGame();
}

function initializeGame() {
  const totalCards = gridSize.value * gridSize.value;
  const pairs = totalCards / 2;

  const selectedSymbols = symbols.slice(0, pairs);
  const cardSymbols = [...selectedSymbols, ...selectedSymbols];

  for (let i = cardSymbols.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cardSymbols[i], cardSymbols[j]] = [cardSymbols[j], cardSymbols[i]];
  }

  cards.value = cardSymbols.map((symbol) => ({
    symbol,
    isFlipped: false,
    isMatched: false,
  }));
}

function startTimer() {
  if (!timerInterval.value) {
    timerInterval.value = setInterval(() => {
      timer.value++;
    }, 1000);
  }
}

function stopTimer() {
  if (timerInterval.value) {
    clearInterval(timerInterval.value);
    timerInterval.value = null;
  }
}

function flipCard(index) {
  if (
    flippedCards.value.length >= 2 ||
    cards.value[index].isFlipped ||
    cards.value[index].isMatched
  ) {
    return;
  }

  if (moves.value === 0) {
    startTimer();
  }

  cards.value[index].isFlipped = true;
  flippedCards.value.push(index);

  if (flippedCards.value.length === 2) {
    moves.value++;
    checkMatch();
  }
}

function checkMatch() {
  const [firstIndex, secondIndex] = flippedCards.value;
  const firstCard = cards.value[firstIndex];
  const secondCard = cards.value[secondIndex];

  if (firstCard.symbol === secondCard.symbol) {
    setTimeout(() => {
      cards.value[firstIndex].isMatched = true;
      cards.value[secondIndex].isMatched = true;
      matches.value++;
      flippedCards.value = [];

      if (matches.value === totalPairs.value) {
        stopTimer();
        saveScore(gridSize.value, timer.value, moves.value);
        setTimeout(() => {
          isGameWon.value = true;
        }, 500);
      }
    }, 500);
  } else {
    setTimeout(() => {
      cards.value[firstIndex].isFlipped = false;
      cards.value[secondIndex].isFlipped = false;
      flippedCards.value = [];
    }, 1000);
  }
}

function resetGame() {
  stopTimer();
  cards.value = [];
  flippedCards.value = [];
  moves.value = 0;
  matches.value = 0;
  timer.value = 0;
  isGameWon.value = false;
  initializeGame();
}

function closeModal() {
  isGameWon.value = false;
}

function playAgain() {
  resetGame();
}

onMounted(() => {
  initializeGame();
});

onUnmounted(() => {
  stopTimer();
});
</script>

<style scoped>
.game-page {
  max-width: 900px;
  margin: 0 auto;
}

.difficulty-section {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.difficulty-btn {
  padding: 0.75rem 2rem;
  background: #1a1a1a;
  color: #ffffff;
  border: 2px solid #333333;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.difficulty-btn:hover {
  border-color: #39ff14;
  color: #39ff14;
}

.difficulty-btn.active {
  background: #39ff14;
  color: #0a0a0a;
  border-color: #39ff14;
  box-shadow: 0 0 20px rgba(57, 255, 20, 0.4);
}

.stats-container {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #1a1a1a;
  border-radius: 12px;
  border: 1px solid #333333;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.stat-label {
  color: #888888;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.stat-value {
  color: #39ff14;
  font-size: 1.5rem;
  font-weight: 700;
  text-shadow: 0 0 10px rgba(57, 255, 20, 0.3);
}

.game-grid {
  display: grid;
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
}

.card-wrapper {
  aspect-ratio: 1;
  cursor: pointer;
}

.card {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

.card.flipped {
  transform: rotateY(180deg);
}

.card-back,
.card-front {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  border-radius: 12px;
  backface-visibility: hidden;
  border: 2px solid #333333;
}

.card-back {
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  color: #39ff14;
  font-weight: 700;
  font-size: 4rem;
}

.card-front {
  background: #1a1a1a;
  transform: rotateY(180deg);
}

.card.matched .card-front {
  background: linear-gradient(135deg, #39ff14 0%, #2dd40f 100%);
  border-color: #39ff14;
  box-shadow: 0 0 20px rgba(57, 255, 20, 0.5);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #1a1a1a;
  border: 2px solid #39ff14;
  border-radius: 16px;
  padding: 3rem;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 0 40px rgba(57, 255, 20, 0.3);
}

.modal-title {
  color: #39ff14;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 0 20px rgba(57, 255, 20, 0.5);
}

.modal-text {
  color: #ffffff;
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
}

.modal-stats {
  color: #cccccc;
  margin-bottom: 2rem;
  line-height: 1.8;
}

.modal-stats strong {
  color: #39ff14;
}

.modal-btn {
  padding: 0.75rem 2rem;
  background: #39ff14;
  color: #0a0a0a;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.modal-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 0 30px rgba(57, 255, 20, 0.6);
}

@media (max-width: 768px) {
  .difficulty-section {
    gap: 0.5rem;
  }

  .difficulty-btn {
    padding: 0.6rem 1.5rem;
    font-size: 0.9rem;
  }

  .stats-container {
    gap: 1.5rem;
    padding: 1rem;
  }

  .stat-value {
    font-size: 1.2rem;
  }

  .card-back,
  .card-front {
    font-size: 2rem;
  }

  .card-back {
    font-size: 2.5rem;
  }
}
</style>
