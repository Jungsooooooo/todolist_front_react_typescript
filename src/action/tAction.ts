import { CallTableInfo } from "./ttypes";

interface info {
  year: number;
  month: number;
  date: number;
}

export function bringYearAndMonthTable(test: info) {
  return {
    type: CallTableInfo,
    payload: test,
  };
}
