<template>
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
</template>

<script>
export default defineComponent({
  name: "PlayAgainModal",
  props: {
    formattedTime: {
      type: String,
      required: true,
    },
    moves: {
      type: Number,
      required: true,
    },
    gridSize: {
      type: Number,
      required: true,
    },
  },
  emits: ["handlePlayAgain"],
  methods: {
    playAgain() {
      this.$emit("handlePlayAgain");
    },
  },
});
</script>
