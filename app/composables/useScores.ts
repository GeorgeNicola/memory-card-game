export const useScores = () => {
  const { user } = useAuth();

  const saveScore = async (difficulty: string, time: number, moves: number) => {
    await $fetch("/api/score/add", {
      method: "POST",
      body: {
        userId: user.value?.userId,
        time: time,
        difficulty: difficulty,
        moves: moves,
      },
    });
  };

  const getScores = async () => {
    const scores = await $fetch("/api/scores", {
      method: "GET",
    });
    console.log(scores);
    return scores;
  };

  return {
    saveScore,
    getScores,
  };
};
