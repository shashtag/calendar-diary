import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";

function getMonth(year: number, month: number) {
  const firstDayOfMonth = dayjs(new Date(year, month, 1));
  const firstDayOfTheMonth = firstDayOfMonth.day();
  const monthSize = firstDayOfMonth.daysInMonth();
  let currentMonthCount = 0 - firstDayOfTheMonth;
  const monthMatrix = new Array(firstDayOfTheMonth + monthSize <= 35 ? 5 : 6)
    .fill([])
    .map(() => {
      return new Array(7).fill(null).map(() => {
        currentMonthCount++;
        return dayjs(new Date(year, month, currentMonthCount));
      });
    });

  return monthMatrix;
}

function getYear(year: number) {
  const yearMatrix = new Array(12).fill([]).map((data, i) => {
    return getMonth(year, i);
  });
  return yearMatrix;
}

const today = dayjs();

const useGetCalendar = () => {
  const [calendar, setCalendar] = useState<any>([]);
  const firstMount = useRef(true);

  useEffect(() => {
    if (firstMount.current) {
      firstMount.current = false;

      const cal = [
        { year: today.year() - 1, calendar: getYear(today.year() - 1) },
        { year: today.year(), calendar: getYear(today.year()) },
        { year: today.year() + 1, calendar: getYear(today.year() + 1) },
      ];

      setCalendar(cal);
    }

    return () => {};
  }, []);

  return { calendar, today, setCalendar, getYear };
};

export default useGetCalendar;
