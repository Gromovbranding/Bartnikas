export const useDateFormat = () => {
  const makeDateCorrect = (date: string | Date | undefined) => {
    if (!date) return "";
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
