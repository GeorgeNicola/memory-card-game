<script setup>
definePageMeta({
  layout: "default",
  middleware: "auth",
});

const { getScores } = useScores();
const { user } = useAuth();
const scores = ref([]);

const selectedDifficultyFilter = ref(null);
const sortBy = ref("time-asc");

const sortByOptions = {
  "time-asc": { time: IOrderByDirection.ASC },
  "time-desc": { time: IOrderByDirection.DESC },
  "moves-asc": { moves: IOrderByDirection.ASC },
  "moves-desc": { moves: IOrderByDirection.DESC },
};

console.log("User ID in Scoreboard.vue:", user.value.id);

const updateScores = async () => {
  scores.value = await getScores({
    difficulty: selectedDifficultyFilter.value || undefined,
    orderBy: sortByOptions[sortBy.value] || undefined,
    userId: user.value.id,
  });
};

watch(selectedDifficultyFilter, () => {
  updateScores();
});

watch(sortBy, () => {
  updateScores();
});

onMounted(() => {
  updateScores();
});
</script>
<template>
  <div class="user-scoreboard">
    <h2 class="section-title">My Scores</h2>

    <div class="filters">
      <div class="filter-group">
        <label class="filter-label">Difficulty:</label>
        <select v-model="selectedDifficultyFilter" class="filter-select">
          <option :value="null">All</option>
          <option value="3">3x3</option>
          <option value="4">4x4</option>
          <option value="5">5x5</option>
        </select>
      </div>

      <div class="filter-group">
        <label class="filter-label">Sort by:</label>
        <select id="sort-by-select" v-model="sortBy" class="filter-select">
          <option value="time-asc">Shortest Time</option>
          <option value="time-desc">Longest Time</option>
          <option value="moves-asc">Fewest Moves</option>
          <option value="moves-desc">Most Moves</option>
          <option value="date-desc">Most Recent</option>
        </select>
      </div>
    </div>

    <ScoresTable :scores="scores" />
  </div>
</template>

<style scoped>
.user-scoreboard {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: #39ff14;
  margin-bottom: 2rem;
  text-shadow: 0 0 20px rgba(57, 255, 20, 0.4);
}

.filters {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.filter-label {
  color: #cccccc;
  font-weight: 600;
}

.filter-select {
  padding: 0.5rem 1rem;
  background: #1a1a1a;
  color: #ffffff;
  border: 2px solid #333333;
  border-radius: 8px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-select:hover {
  border-color: #39ff14;
}

.filter-select:focus {
  outline: none;
  border-color: #39ff14;
  box-shadow: 0 0 10px rgba(57, 255, 20, 0.3);
}

.scores-container {
  background: #1a1a1a;
  border: 1px solid #333333;
  border-radius: 12px;
  overflow: hidden;
}

.no-scores {
  padding: 3rem;
  text-align: center;
  color: #888888;
  font-size: 1.1rem;
}

.scores-table {
  width: 100%;
}

.table-header,
.table-row {
  display: grid;
  grid-template-columns: 80px 120px 100px 100px 1fr;
  padding: 1rem;
  gap: 1rem;
  align-items: center;
}

.table-header {
  background: #111111;
  border-bottom: 2px solid #39ff14;
  font-weight: 700;
  color: #39ff14;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 1px;
}

.table-row {
  border-bottom: 1px solid #2a2a2a;
  transition: all 0.3s ease;
}

.table-row:hover {
  background: #222222;
}

.table-row:last-child {
  border-bottom: none;
}

.table-cell {
  color: #ffffff;
}

.rank {
  font-weight: 700;
  color: #39ff14;
  font-size: 1.2rem;
}

.difficulty-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: rgba(57, 255, 20, 0.2);
  color: #39ff14;
  border: 1px solid #39ff14;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
}

.time {
  color: #39ff14;
  font-weight: 600;
  font-family: monospace;
}

.date {
  color: #888888;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 1.5rem;
  }

  .filters {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }

  .filter-group {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-select {
    width: 100%;
  }

  .table-header,
  .table-row {
    grid-template-columns: 50px 80px 80px 70px 1fr;
    padding: 0.75rem;
    gap: 0.5rem;
    font-size: 0.85rem;
  }
}
</style>
