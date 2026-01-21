<template>
  <div class="best-score-display">
    <div v-if="isLoading" class="loading">Loading best score...</div>
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    <div v-else-if="bestScore" class="best-score">
      🏆 Best Score: {{ formatTime(bestScore.time) }} in
      {{ bestScore.moves }} moves
    </div>
    <div v-else class="no-score">
      No best score yet for {{ difficulty }}x{{ difficulty }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    difficulty: {
      type: Number,
      required: true,
      validator: (value) => [4, 6, 8].includes(value),
    },
  },

  setup() {
    const { bestScores, isLoading, error, fetchHighScores, getBestScore } =
      useHighScores();

    return {
      bestScores,
      isLoading,
      error,
      fetchHighScores,
      getBestScore,
    };
  },

  computed: {
    bestScore() {
      return this.getBestScore(this.difficulty);
    },
  },

  methods: {
    formatTime(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, "0")}`;
    },
  },

  // Fetch high scores when component mounts
  async mounted() {
    await this.fetchHighScores();
  },

  watch: {
    // Refresh when difficulty changes
    difficulty: {
      async handler() {
        // No need to refetch, just reactive to bestScore computed
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
.best-score-display {
  text-align: center;
  margin: 16px 0;
  padding: 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

.loading {
  color: #ffd700;
  font-style: italic;
}

.error {
  color: #ff6b6b;
  font-size: 14px;
}

.best-score {
  color: #4ecdc4;
  font-weight: bold;
  font-size: 16px;
}

.no-score {
  color: #95a5a6;
  font-size: 14px;
  font-style: italic;
}

.best-score-display:hover {
  transform: translateY(-2px);
  transition: transform 0.2s ease;
}
</style>
