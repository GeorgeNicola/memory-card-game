export const useScores = () => {
  // Nuxt auto-imports useAuth, so no manual import is needed here
  const { user } = useAuth();

  /**
   * Saves a new score to localStorage.
   */
  const saveScore = (difficulty: string, time: number, moves: number) => {
    // We check import.meta.client to prevent errors during Server Side Rendering
    if (import.meta.client) {
      const scores = JSON.parse(localStorage.getItem("scores") || "[]");

      const newScore = {
        userId: user.value?.id || "guest", // Fallback to guest if no user
        userName: user.value?.name || "Guest",
        difficulty,
        time,
        moves,
        date: new Date().toISOString(),
      };

      scores.push(newScore);
      localStorage.setItem("scores", JSON.stringify(scores));
    }
  };

  /**
   * Retrieves all scores from localStorage.
   */
  const getScores = () => {
    if (import.meta.client) {
      return JSON.parse(localStorage.getItem("scores") || "[]");
    }
    return []; // Return empty array on server
  };

  /**
   * Filters scores by difficulty and/or userId.
   */
  const getFilteredScores = (
    difficulty: string | null = null,
    userId: string | null = null
  ) => {
    const scores = getScores();
    let filtered = [...scores];

    if (difficulty) {
      filtered = filtered.filter((s: any) => s.difficulty === difficulty);
    }

    if (userId) {
      filtered = filtered.filter((s: any) => s.userId === userId);
    }

    return filtered;
  };

  return {
    saveScore,
    getScores,
    getFilteredScores,
  };
};
