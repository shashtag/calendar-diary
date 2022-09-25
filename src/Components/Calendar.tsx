import React, { useCallback, useEffect, useRef, useState } from "react";
import useGetcalendar from "../Hooks/useGetCalendar";
import months from "../Data/months";
import dayjs, { Dayjs } from "dayjs";
import { useQuery } from "react-query";
import axios from "axios";

const today = dayjs();

const Calendar = () => {
  const { calendar, setCalendar } = useGetcalendar();

  const scroll = useCallback((node: any) => {
    if (node !== null) {
      console.log(node);
      window.scrollTo({
        top: node.offsetTop - (window.innerHeight - node.style.height) / 2,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <div className='mt-8'>
      {calendar.map((year: any) => (
        <React.Fragment key={year.year}>
          <div className='text-center'>{year.year}</div>
          {year.calendar.map((month: any, i: any) => (
            <React.Fragment key={months[i]}>
              <div className='text-center'>{months[i]}</div>
              <div className='grid grid-cols-7 '>
                {month.map((week: any) =>
                  week.map((day: Dayjs, j: any) => (
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
                      }
                      style={{ aspectRatio: 3 / 4 }}>
                      {day.date()}
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
