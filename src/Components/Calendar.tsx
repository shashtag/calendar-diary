import React, { useMemo } from "react";
import useGetcalendar from "../Hooks/useGetCalendar";
import months from "../Data/months";
import { Dayjs } from "dayjs";
import useInitialScroll from "../Hooks/useInitialScroll";
import useIntersection from "../Hooks/InfiniteScroll/useIntersection";
import useGetDiary from "../Hooks/useGetDiary";
import useFirstNovJanIntersectionHandler from "../Hooks/InfiniteScroll/usefirstNovJanIntersectionHandler";
import useLastFebDecIntersectionHandler from "../Hooks/InfiniteScroll/uselastFebDecIntersectionHandler";
import Post from "./Post/Post";

const Calendar = () => {
  const { data, isLoading, isError, error, fetchNextPage } = useGetDiary();

  const { calendar, today, setCalendar, getYear } = useGetcalendar();

  const scroll = useInitialScroll();

  const firstNovJanIntersectionHandler = useFirstNovJanIntersectionHandler(
    setCalendar,
    getYear,
  );
  const lastFebDecIntersectionHandler = useLastFebDecIntersectionHandler(
    setCalendar,
    getYear,
  );

  const firstNov = useIntersection(firstNovJanIntersectionHandler);
  const firstJan = useIntersection(firstNovJanIntersectionHandler);
  const lastFeb = useIntersection(lastFebDecIntersectionHandler);
  const lastDec = useIntersection(lastFebDecIntersectionHandler);

  const diaryDataObj = useMemo(() => {
    const diaryData: any = {};
    console.log(data);
    if (data) {
      data.pages.forEach((page) =>
        page.posts.forEach((element: any) => {
          // console.log(element);

          if (diaryData[element.calendardatetime.split("T")[0]] === undefined)
            diaryData[element.calendardatetime.split("T")[0]] = [];
          diaryData[element.calendardatetime.split("T")[0]].push(element);
        }),
      );
    }
    return diaryData;
  }, [data]);

  if (isLoading) return <div className='mt-8 text-2xl'>Loading...</div>;
  if (isError)
    return (
      <div className='mt-8 text-2xl'>Error : {(error as Error).message}</div>
    );
  // console.log(diaryDataObj);
  // console.log(today);
  // usning index as key as I will not be sorting or manipulating the sub arrays
  return (
    <div className='mt-8'>
      <button className='fixed' onClick={() => fetchNextPage()}>
        sssksdks
      </button>
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
                    : l === calendar.length - 1 && i === 11
                    ? lastDec
                    : undefined
                }>
                {months[i]}
              </div>
              <div className='grid grid-cols-7 '>
                {month?.map((week: Dayjs[]) =>
                  week?.map((day: Dayjs) => {
                    let date = day.toISOString().split("T")[0];
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
                            {diaryDataObj[date] ? (
                              <Post posts={diaryDataObj[date]} />
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
};;

export default Calendar;
