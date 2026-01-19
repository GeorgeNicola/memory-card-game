import type { Score } from "@prisma/client";

export const useHighScores = () => {
  const { $store } = useNuxtApp();

  const bestScores = computed(
    () => $store.getters["highScores/getAllBestScores"],
  );
  const isLoading = computed<boolean>(
    () => $store.getters["highScores/isLoading"],
  );

  const getBestScore = (difficulty: 4 | 6 | 8): Score | null => {
    return $store.getters["highScores/getBestScore"](difficulty);
  };

  const fetchHighScores = async () => {
    await $store.dispatch("highScores/fetchHighScores");
  };

  const refreshHighScores = async () => {
    await $store.dispatch("highScores/refreshHighScores");
  };

  return {
    bestScores: bestScores,
    isLoading: isLoading,

    getBestScore,
    fetchHighScores,
    refreshHighScores,
  };
};
