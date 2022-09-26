import { useInfiniteQuery } from "react-query";
import axios from "axios";

const fetchDiary = ({ pageParam = null }) =>
  axios({
    method: "post",
    url: "https://api.quinn.care/graph",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      requestobjects: [
        {
          posts: {
            operationtype: "read",
            id: {
              return: true,
            },
            media: {
              return: true,
            },
            rating: {
              return: true,
            },
            text: {
              return: true,
            },
            calendardatetime: {
              return: true,
              sort: "descending",
            },
            maxitemcount: "20",
            continuationtoken: pageParam,
          },
        },
      ],
    },
  }).then((data) => data.data.responseobjects[0]);

const useGetDiary = () => {
  return useInfiniteQuery("get-diary", fetchDiary, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.continuationtoken) return { ...lastPage.continuationtoken };
      else return undefined;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    cacheTime: 6 * 60 * 60 * 1000,
  });
};

export default useGetDiary;
