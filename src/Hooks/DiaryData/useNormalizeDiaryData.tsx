import dayjs, { Dayjs } from "dayjs";
import { useMemo } from "react";

const useNormalizeDiaryData = (data: ApiDataType) => {
  return useMemo(() => {
    const diaryData: { [key: string]: DiaryPostType[] } = {};
    let fetchedTill: Dayjs = dayjs();
    if (data) {
      console.log(data);
      data.pages.forEach((page: APIPageType) =>
        page.posts.forEach((element: DiaryPostType) => {
          if (diaryData[element.calendardatetime.split("T")[0]] === undefined)
            diaryData[element.calendardatetime.split("T")[0]] = [];
          diaryData[element.calendardatetime.split("T")[0]].push(element);
        }),
      );

      let [day, month, year] = data?.pages[
        data?.pages?.length - 1
      ]?.continuationtoken?.token
        ?.split("|")[0]
        ?.split(" ")[0]
        ?.split("-");

      fetchedTill = dayjs(`${year}-${month}-${day}`);
    }

    return { diaryData, fetchedTill };
  }, [data]);
};

export default useNormalizeDiaryData;
