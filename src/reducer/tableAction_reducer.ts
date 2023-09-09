import { CallTableInfo } from "../action/ttypes";
import { LoginInfo } from "../action/ttypes";
import { bringYearAndMonthTable } from "../action/tAction";

import { UUID } from "crypto";

type YearAndMonth = {
  year: number;
  month: number;
  date: number;
};

const initialState = {
  year: 0,
  month: 0,
  date: 1,
};

interface loginInfo {
  id: string;
  uid: UUID;
}

type Actiontype = ReturnType<typeof bringYearAndMonthTable>;

export default function callTableReducer(
  stateYearAndMonth: YearAndMonth = initialState,
  stateLogin: loginInfo,
  action: any
) {
  switch (action.type) {
    case CallTableInfo:
      return {
        ...stateYearAndMonth,
        year: action.payload.year,
        month: action.payload.month,
        date: action.payload.date,
      };
    case LoginInfo:
      return {
        id: action.payload.id,
        uid: action.payload.uid,
      };
    default:
      return stateYearAndMonth;
  }
}
