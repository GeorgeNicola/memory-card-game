<template>
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
</template>

<script>
export default defineComponent({
  props: {
    card: {
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
