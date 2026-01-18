<template>
  <div class="scoreboard-page">
    <h1 class="page-title">Scoreboard</h1>

    <div class="filters">
      <div class="filter-group">
        <label class="filter-label">Difficulty:</label>
        <select v-model="selectedDifficultyFilter" class="filter-select">
          <option :value="null">All</option>
          <option value="4">4x4</option>
          <option value="6">6x6</option>
          <option value="8">8x8</option>
        </select>
      </div>

      <div class="filter-group">
        <label class="filter-label">Sort by:</label>
        <select v-model="sortBy" class="filter-select">
          <option value="time-asc">Shortest Time</option>
          <option value="time-desc">Longest Time</option>
          <option value="moves-asc">Fewest Moves</option>
          <option value="moves-desc">Most Moves</option>
        </select>
      </div>
    </div>

    <ScoresTable :scores="scores" />
  </div>
</template>

<script>
export default defineComponent({
  setup() {
    definePageMeta({
      layout: "default",
      middleware: "auth",
    });

    useSeoMeta({
      title: "Memory Card Game | Test Your Brain Power",
      ogTitle: "Memory Card Game: The Ultimate Card Matching Game",
      description:
        "Challenge your memory with this addictive card matching game.",
      ogDescription: "Flip cards, find pairs, and beat the clock!",
      ogImage: "./memory-card-game-og.png",
      twitterImage: "./memory-card-game-og.png",
      twitterCard: "summary_large_image",
      twitterTitle: "Memory Card Game",
      twitterDescription:
        "Train your brain with the ultimate memory card challenge.",
      author: "Nicola George-Petrus",
    });

    const { getScores } = useScores();

    return {
      getScores: getScores,
    };
  },

  data() {
    return {
      scores: [],
      selectedDifficultyFilter: null,
      sortBy: "time-asc",
      sortByOptions: {
        "time-asc": { time: "asc" },
        "time-desc": { time: "desc" },
        "moves-asc": { moves: "asc" },
        "moves-desc": { moves: "desc" },
      },
    };
  },

  watch: {
    selectedDifficultyFilter() {
      this.updateScores();
    },
    sortBy() {
      this.updateScores();
    },
  },

  methods: {
    async updateScores() {
      try {
        this.scores = await this.getScores({
          difficulty: this.selectedDifficultyFilter || undefined,
          orderBy: this.sortByOptions[this.sortBy] || undefined,
        });
      } catch (error) {
        console.error("Failed to update scores:", error);
      }
    },
  },

  created() {
    this.updateScores();
  },
});
</script>
