import { Dayjs } from "dayjs";
import React, { useCallback } from "react";

const useFirstNovJanIntersectionHandler = (
  setCalendar: React.Dispatch<
    React.SetStateAction<
      {
        year: number;
        calendar: Dayjs[][][];
      }[]
    >
  >,
  getYear: (year: number) => Dayjs[][][],
) => {
  return useCallback(() => {
    setCalendar((prev: YearType[]) => [
      ...prev,
      {
        year: prev[prev.length - 1].year + 1,
        calendar: getYear(prev[prev.length - 1].year + 1),
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useFirstNovJanIntersectionHandler;
