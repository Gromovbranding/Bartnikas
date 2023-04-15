export const useDateFormat = () => {
  const makeDateCorrect = (date: string) => {
    if (!date) return "28.02.2023";
    const d = new Date(date);
    const year = d.toLocaleString("default", { year: "numeric" });
    const month = d.toLocaleString("default", { month: "2-digit" });
    const day = d.toLocaleString("default", { day: "2-digit" });

    return `${day}.${month}.${year}`;
  };

  return {
    makeDateCorrect,
  };
};
