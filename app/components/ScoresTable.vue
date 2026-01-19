<template>
  <div class="scores-container">
    <div v-if="!scores || scores.length === 0" class="no-scores">
      <p>No scores yet. Play a game to see your results here!</p>
    </div>

    <div v-else class="table-wrapper">
      <div class="scores-table">
        <div class="table-header">
          <div class="table-cell">RANK</div>
          <div class="table-cell">PLAYER</div>
          <div class="table-cell">DIFFICULTY</div>
          <div class="table-cell">TIME</div>
          <div class="table-cell">MOVES</div>
        </div>

        <div v-for="(score, index) in scores" :key="index" class="table-row">
          <div class="table-cell rank">{{ index + 1 }}</div>
          <div class="table-cell player-name">
            {{ score.user.name || "Anonymous" }}
          </div>
          <div class="table-cell">
            <span class="difficulty-badge">{{ score.difficulty }}</span>
          </div>
          <div class="table-cell time">{{ formatTime(score.time) }}</div>
          <div class="table-cell">{{ score.moves }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { Score, User } from "@prisma/client";

type ScoreWithUser = Score & { user: User };

export default defineComponent({
  props: {
    scores: {
      type: Array as PropType<ScoreWithUser[]>,
      default: () => [],
    },
  },

  methods: {
    formatTime(seconds: number): string {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, "0")}`;
    },
  },
});
</script>

<style scoped>
.scores-container {
  width: 100%;
  margin: 0 auto;
}

.table-wrapper {
  width: 100%;
  overflow-x: auto;
  border-radius: 8px;
  border: 1px solid rgba(57, 255, 20, 0.2);
  background: #1a1a1a;
}

.scores-table {
  display: grid;
  min-width: 600px;
  width: 100%;
}

.table-header,
.table-row {
  display: grid;
  grid-template-columns: 0.5fr 1.5fr 1fr 1fr 0.8fr;
  align-items: center;
}

.table-header {
  background: rgba(57, 255, 20, 0.05);
  border-bottom: 2px solid #39ff14;
  padding: 1rem 0;
  font-weight: bold;
  color: #ffffff;
  font-size: 0.85rem;
  letter-spacing: 1px;
}

.table-row {
  border-bottom: 1px solid #333;
  padding: 0.8rem 0;
  transition: background 0.3s ease;
}

.table-row:hover {
  background: rgba(57, 255, 20, 0.03);
}

.table-cell {
  padding: 0 1rem;
  color: #cccccc;
  text-align: center;
}

.rank {
  color: #39ff14;
  font-weight: bold;
}

.player-name {
  color: #ffffff;
}

.difficulty-badge {
  display: inline-block;
  padding: 4px 10px;
  border: 1px solid #39ff14;
  border-radius: 4px;
  color: #39ff14;
  font-size: 0.8rem;
  background: rgba(57, 255, 20, 0.1);
}

.time {
  color: #39ff14;
  font-family: "Courier New", Courier, monospace;
}

.no-scores {
  text-align: center;
  padding: 3rem;
  color: #888;
  border: 1px dashed #444;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .table-header {
    font-size: 0.75rem;
  }

  .table-cell {
    padding: 0 0.5rem;
  }
}
</style>
