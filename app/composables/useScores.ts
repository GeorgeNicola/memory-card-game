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

  const getScores = async ({
    difficulty,
    orderBy,
    userId,
  }: {
    difficulty?: number;
    orderBy?: IOrderBy;
    userId?: string;
  }) => {
    const scores = await useFetch("/api/scores", {
      method: "GET",
      query: {
        difficulty: difficulty,
        orderBy: orderBy,
        userId: userId,
      },
    });
    return scores.data.value;
  };

  return {
    saveScore,
    getScores,
  };
};
