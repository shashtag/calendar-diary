import React, { useEffect } from "react";
import useGetcalendar from "../Hooks/useGetCalendar";
import months from "../Data/months";
import { Dayjs } from "dayjs";
import useInitialScroll from "../Hooks/useInitialScroll";
import useIntersection from "../Hooks/InfiniteScroll/useIntersection";
import useGetDiary from "../Hooks/DiaryData/useGetDiary";
import useExtendUpHandler from "../Hooks/InfiniteScroll/useExtendUpHandler";
import useExtendDownHandler from "../Hooks/InfiniteScroll/useExtendDownHandler";
import Post from "./Post/Post";
import useNormalizeDiaryData from "../Hooks/DiaryData/useNormalizeDiaryData";

const Calendar = () => {
  const { data, isLoading, isError, error, fetchNextPage } = useGetDiary();

  const { calendar, today, setCalendar, getYear } = useGetcalendar();

  const scroll = useInitialScroll();

  const extendUpHandler = useExtendUpHandler(setCalendar, getYear);
  const extendDownHandler = useExtendDownHandler(setCalendar, getYear);

  const extendUp = useIntersection(extendUpHandler);
  const extendDown = useIntersection(extendDownHandler);

  const { fetchedTill, diaryData } = useNormalizeDiaryData(data as ApiDataType);

  useEffect(() => {
    let firstDay = calendar[0].yearCalendar[0][0][0];
    if (fetchedTill.diff(firstDay) > 0) fetchNextPage();

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, calendar]);

  if (isLoading) return <div className='mt-8 text-2xl'>Loading...</div>;
  if (isError)
    return (
      <div className='mt-8 text-2xl'>Error : {(error as Error).message}</div>
    );

  // usning index as key as I will not be sorting or manipulating the sub arrays
  return (
    <div className='mt-8'>
      {calendar?.map((year: YearType, l: number) => (
        <React.Fragment key={year.year}>
          <div className='text-center'>{year.year}</div>
          {year?.yearCalendar?.map((month: Dayjs[][], i: number) => (
            <React.Fragment key={months[i]}>
              <div
                className='text-center'
                ref={
                  l === 0 && (i === 0 || i === 5)
                    ? extendUp
                    : l === calendar.length - 1 && (i === 6 || i === 11)
                    ? extendDown
                    : undefined
                }>
                {months[i]}
              </div>
              <div className='grid grid-cols-7 '>
                {month?.map((week: Dayjs[]) =>
                  week?.map((day: Dayjs) => {
                    let date = day.add(1, "day").toISOString().split("T")[0];
                    if (day.month() === i)
                      return (
                        <div
                          ref={
                            day.year() === today.year() &&
                            day.month() === today.month() &&
                            day.date() === today.date()
                              ? scroll
                              : undefined
                          }
                          key={date}
                          className={
                            day.day() === 0
                              ? "text-center bg-slate-300 border"
                              : "text-center border"
                          }>
                          <div>{day.date()}</div>

                          <div style={{ aspectRatio: 3 / 4 }} className='p-2'>
                            {diaryData[date] ? (
                              <Post posts={diaryData[date]} />
                            ) : null}
                          </div>
                        </div>
                      );
                    else return <div key={date}></div>;
                  }),
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
