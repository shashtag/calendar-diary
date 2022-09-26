import { Dayjs } from "dayjs";
import React, { useCallback } from "react";

const useExtendDownHandler = (
  setCalendar: React.Dispatch<React.SetStateAction<YearType[]>>,
  getYear: (year: number) => Dayjs[][][],
) => {
  return useCallback(() => {
    setCalendar((prev: YearType[]) => [
      ...prev,
      {
        year: prev[prev.length - 1].year + 1,
        yearCalendar: getYear(prev[prev.length - 1].year + 1),
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useExtendDownHandler;
