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
      <PlayAgainModal
        :formattedTime="formattedTime"
        :moves="moves"
        :gridSize="gridSize"
        @handlePlayAgain="resetGame"
      />
    </div>
  </div>
</template>

<script>
import PlayAgainModal from "~/components/PlayAgainModal.vue";

export default {
  components: {
    PlayAgainModal,
  },
  setup() {
    const { saveScore } = useScores();
    return { saveScoreAction: saveScore };
  },

  data() {
    return {
      difficulties: [{ size: 4 }, { size: 6 }, { size: 8 }],
      symbols: [
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
      ],
      gridSize: 4,
      cards: [],
      flippedCards: [],
      moves: 0,
      matches: 0,
      timer: 0,
      timerInterval: null,
      isGameWon: false,
    };
  },

  computed: {
    totalPairs() {
      return (this.gridSize * this.gridSize) / 2;
    },
    formattedTime() {
      const mins = Math.floor(this.timer / 60);
      const secs = this.timer % 60;
      return `${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    },
  },

  methods: {
    setDifficulty(size) {
      this.gridSize = size;
      this.resetGame();
    },

    initializeGame() {
      const totalCards = this.gridSize * this.gridSize;
      const pairs = totalCards / 2;

      const selectedSymbols = this.symbols.slice(0, pairs);
      const cardSymbols = [...selectedSymbols, ...selectedSymbols];

      for (let i = cardSymbols.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cardSymbols[i], cardSymbols[j]] = [cardSymbols[j], cardSymbols[i]];
      }

      this.cards = cardSymbols.map((symbol) => ({
        symbol,
        isFlipped: false,
        isMatched: false,
      }));
    },

    startTimer() {
      if (!this.timerInterval) {
        this.timerInterval = setInterval(() => {
          this.timer++;
        }, 1000);
      }
    },

    stopTimer() {
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
      }
    },

    flipCard(index) {
      if (
        this.flippedCards.length >= 2 ||
        this.cards[index].isFlipped ||
        this.cards[index].isMatched
      ) {
        return;
      }

      if (this.moves === 0 && this.timer === 0) {
        this.startTimer();
      }

      this.cards[index].isFlipped = true;
      this.flippedCards.push(index);

      if (this.flippedCards.length === 2) {
        this.moves++;
        this.checkMatch();
      }
    },

    checkMatch() {
      const [firstIndex, secondIndex] = this.flippedCards;
      const firstCard = this.cards[firstIndex];
      const secondCard = this.cards[secondIndex];

      if (firstCard.symbol === secondCard.symbol) {
        setTimeout(() => {
          this.cards[firstIndex].isMatched = true;
          this.cards[secondIndex].isMatched = true;
          this.matches++;
          this.flippedCards = [];

          if (this.matches === this.totalPairs) {
            this.handleWin();
          }
        }, 500);
      } else {
        setTimeout(() => {
          this.cards[firstIndex].isFlipped = false;
          this.cards[secondIndex].isFlipped = false;
          this.flippedCards = [];
        }, 1000);
      }
    },

    async handleWin() {
      this.stopTimer();
      await this.saveScoreAction(this.gridSize, this.timer, this.moves);
      setTimeout(() => {
        this.isGameWon = true;
      }, 500);
    },

    resetGame() {
      this.stopTimer();
      this.cards = [];
      this.flippedCards = [];
      this.moves = 0;
      this.matches = 0;
      this.timer = 0;
      this.isGameWon = false;
      this.initializeGame();
    },

    closeModal() {
      this.isGameWon = false;
    },
  },

  mounted() {
    this.initializeGame();
  },

  beforeUnmount() {
    this.stopTimer();
  },
};
</script>
