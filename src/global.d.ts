export {};
declare global {
  type YearType = { year: number; calendar: Dayjs[][][] };
  type ContinuationTokenType = { sorton: string; token: string };
}
