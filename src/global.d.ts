export {};
declare global {
  type YearType = { year: number; calendar: Dayjs[][][] };
  type ContinuationTokenType = null | { sorton: string; token: string };
}
