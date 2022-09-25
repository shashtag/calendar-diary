import React, { useCallback, useEffect, useRef, useState } from "react";
import useGetcalendar from "../Hooks/useGetCalendar";
import months from "../Data/months";
import { Dayjs } from "dayjs";
import useScroll from "../Hooks/useScroll";
import useIntersection from "../Hooks/useIntersection";

const Calendar = () => {
  const { calendar, today, setCalendar, getYear } = useGetcalendar();
  const scroll = useScroll();

  const firstNovJanIntersectionHandler = useCallback(() => {
    setCalendar((prev: YearType[]) => [
      { year: prev[0].year - 1, calendar: getYear(prev[0].year - 1) },
      ...prev,
    ]);
  }, []);

  const lastFebDecIntersectionHandler = useCallback(() => {
    setCalendar((prev: YearType[]) => [
      ...prev,
      {
        year: prev[prev.length - 1].year + 1,
        calendar: getYear(prev[prev.length - 1].year + 1),
      },
    ]);
  }, []);

  const firstNov = useIntersection(firstNovJanIntersectionHandler);
  const firstJan = useIntersection(firstNovJanIntersectionHandler);
  const lastFeb = useIntersection(lastFebDecIntersectionHandler);
  const lastDec = useIntersection(lastFebDecIntersectionHandler);

  return (
    <div className='mt-8'>
      {calendar?.map((year: YearType, l: number) => (
        <React.Fragment key={year.year}>
          <div className='text-center'>{year.year}</div>
          {year?.calendar?.map((month: Dayjs[][], i: number) => (
            <React.Fragment key={months[i]}>
              <div
                className='text-center'
                ref={
                  l === 0 && i === 10
                    ? firstNov
                    : l === calendar.length - 1 && i === 1
                    ? lastFeb
                    : l === 0 && i === 0
                    ? firstJan
                    : l === calendar.length - 1 && i === 1
                    ? lastDec
                    : undefined
                }>
                {months[i]}
              </div>
              <div className='grid grid-cols-7 '>
                {month?.map((week: Dayjs[]) =>
                  week?.map((day: Dayjs, j: number) => (
                    <div
                      ref={
                        year.year === today.year() &&
                        day.month() === today.month() &&
                        day.date() === today.date() &&
                        i === day.month()
                          ? scroll
                          : undefined
                      }
                      key={j}
                      className={
                        day.day() === 0
                          ? "text-center bg-slate-300 "
                          : "text-center"
                      }>
                      <div>{day.date()}</div>
                      <div style={{ aspectRatio: 3 / 4 }}>img</div>
                    </div>
                  )),
                )}
              </div>
            </React.Fragment>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Calendar;
