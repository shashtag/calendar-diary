import { Dayjs } from "dayjs";
import React, { useCallback } from "react";

const useExtendUpHandler = (
  setCalendar: React.Dispatch<React.SetStateAction<YearType[]>>,
  getYear: (year: number) => Dayjs[][][],
) => {
  return useCallback(() => {
    setCalendar((prev: YearType[]) => [
      { year: prev[0].year - 1, yearCalendar: getYear(prev[0].year - 1) },
      ...prev,
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useExtendUpHandler;
