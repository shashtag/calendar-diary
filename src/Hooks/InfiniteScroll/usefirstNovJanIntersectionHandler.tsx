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
      { year: prev[0].year - 1, calendar: getYear(prev[0].year - 1) },
      ...prev,
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useFirstNovJanIntersectionHandler;
