import { CallTableInfo } from "../action/ttypes";
import { bringYearAndMonthTable } from "../action/tAction";

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

type Actiontype = ReturnType<typeof bringYearAndMonthTable>;

export default function callTableReducer(state: YearAndMonth = initialState, action: Actiontype) {
  switch (action.type) {
    case CallTableInfo:
      return { ...state, year: action.payload.year, month: action.payload.month, date: action.payload.date };

    default:
      return state;
  }
}
