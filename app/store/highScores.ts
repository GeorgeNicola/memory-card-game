import type { Score } from "@prisma/client";

export interface HighScoresState {
  bestScores: {
    4: Score | null;
    6: Score | null;
    8: Score | null;
  };
  isLoading: boolean;
}

export const state = (): HighScoresState => ({
  bestScores: {
    4: null,
    6: null,
    8: null,
  },
  isLoading: false,
});

export const getters = {
  getBestScore: (state: HighScoresState) => (difficulty: 4 | 6 | 8) => {
    return state.bestScores[difficulty];
  },
  getAllBestScores: (state: HighScoresState) => state.bestScores,
  isLoading: (state: HighScoresState) => state.isLoading,
};

export const mutations = {
  SET_LOADING(state: HighScoresState, loading: boolean) {
    state.isLoading = loading;
  },
  SET_BEST_SCORE(
    state: HighScoresState,
    { difficulty, score }: { difficulty: 4 | 6 | 8; score: Score },
  ) {
    state.bestScores[difficulty] = score;
  },
  SET_ALL_BEST_SCORES(
    state: HighScoresState,
    scores: { 4: Score | null; 6: Score | null; 8: Score | null },
  ) {
    state.bestScores = scores;
  },
};

export const actions = {
  async fetchHighScores({ commit }: any) {
    commit("SET_LOADING", true);

    try {
      const response = await $fetch("/api/scores");
      const allScores: Score[] = response;

      const bestScores = {
        4: null as Score | null,
        6: null as Score | null,
        8: null as Score | null,
      };

      allScores.forEach((score) => {
        const difficulty = score.difficulty as 4 | 6 | 8;

        if ([4, 6, 8].includes(difficulty)) {
          const currentBest = bestScores[difficulty];

          if (
            !currentBest ||
            score.time < currentBest.time ||
            (score.time === currentBest.time && score.moves < currentBest.moves)
          ) {
            bestScores[difficulty] = score;
          }
        }
      });

      commit("SET_ALL_BEST_SCORES", bestScores);
    } catch (error: any) {
      console.error("Failed to fetch high scores:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async refreshHighScores({ dispatch }: any) {
    await dispatch("fetchHighScores");
  },
};
