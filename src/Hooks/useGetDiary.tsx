import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

const fetchDiaryData = (continuationtoken: ContinuationTokenType) =>
  axios.post("https://api.quinn.care/graph", {
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
          typeofday: {
            return: true,
          },
          calendardatetime: {
            return: true,
            sort: "descending",
          },
          maxitemcount: "20",
          continuationtoken,
        },
      },
    ],
  });

type Props = {
  continuationtoken: ContinuationTokenType;
};

const useGetDiary = ({ continuationtoken }: Props) => {
  return useQuery(
    "get-diary",
    () => {
      fetchDiaryData(continuationtoken);
    },
    {},
  );
};

export default useGetDiary;
