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

/**
 * Format Date
 * @param {string} formatStr - string format date, .
 * @param {Date | string} date - date
 * @returns {string} Returns formatted String Date
 * @example
 * const date2 = new Date(2020, 7, 9, 9, 9, 9, 99);
 * formatDate("YYYY-DD-MM hh:mm:ss M", date2);
 * @example
 * const date = new Date(2020, 7, 22, 22, 22, 22, 222);
 * formatDate("YYYY-DD-MM hh:mm:ss M", date);
 */
export const formatDate = (formatStr: string, date: Date | string) => {
  const padLeft = (str: string | number, num = 2, fill = "0") =>
    String(str).padStart(num, fill);

  const d = new Date(date);

  const time: {
    [x: string]: string;
  } = {
    YY: padLeft(d.getFullYear()).substr(2, 4),
    YYYY: padLeft(d.getFullYear()),
    MM: padLeft(d.getMonth() + 1),
    DD: padLeft(d.getDate()),
    hh: padLeft(d.getHours()),
    mm: padLeft(d.getMinutes()),
    ss: padLeft(d.getSeconds()),
    M: padLeft(d.getMilliseconds(), 3),
  };

  return formatStr.replace(
    new RegExp(`${Object.keys(time).join("|")}`, "g"),
    (subStr: string) => {
      return time[subStr] || "";
    }
  );
};
