export type AnalyticsProps = Array<{
  date: Date;
  calories: number;
  fat: number;
  protein: number;
}>;

const processAnalyticsToLineChart = (data: AnalyticsProps) => {
  return {
    labels: data.map((datum) =>
      datum.date.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      })
    ),
    datasets: [{ data: data.map((datum) => datum.calories) }],
  };
};

const processAnalyticsToPercentage = (data: AnalyticsProps) => {
  // slice arrays into old and new values
  const newValues = data.slice(7, 14);
  const oldValues = data.slice(0, 7);

  // temporary data storage
  const calories = [0, 0];
  const fat = [0, 0];
  const protein = [0, 0];

  // calculate respective total
  for (let i = 0; i < 7; i++) {
    calories[0] += newValues[i].calories;
    calories[1] += oldValues[i].calories;
    fat[0] += newValues[i].fat;
    fat[1] += oldValues[i].fat;
    protein[0] += newValues[i].protein;
    protein[1] += oldValues[i].protein;
  }

  // calculate ret
  return {
    calories: {
      value: calories[0] / 7,
      percentage:
        Math.round(((calories[0] - calories[1]) / calories[1] / 7) * 1000) / 10,
    },

    fat: {
      value: fat[0] / 7,
      percentage: Math.round(((fat[0] - fat[1]) / fat[1] / 7) * 1000) / 10,
    },
    protein: {
      value: protein[0] / 7,
      percentage:
        Math.round(((protein[0] - protein[1]) / protein[1] / 7) * 1000) / 10,
    },
  };
};

export { processAnalyticsToLineChart, processAnalyticsToPercentage };
