export {};
declare global {
  type YearType = { year: number; yearCalendar: Dayjs[][][] };

  type ContinuationTokenType = { sorton: string; token: string };

  type ApiMediaType = {
    aspectratio: string;
    fileid: string;
    mediatype: number;
    mediaurl: string;
  };

  type DiaryPostType = {
    calendardatetime: string;
    createdontimestamp: string;
    id: string;
    media: ApiMediaType[];
    rating: number;
    text: sting;
  };

  type APIPageType = {
    continuationtoken: ContinuationTokenType;
    posts: DiaryPostType[];
  };

  type ApiDataType = {
    pageParams: (undefined | ContinuationTokenType)[];
    pages: APIPAgeType[];
  };
}
