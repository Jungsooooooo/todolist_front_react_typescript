import { CallTableInfo } from "../action/ttypes";
import { LoginInfo } from "../action/ttypes";
import { bringYearAndMonthTable } from "../action/tAction";
import { bringLoginInfo } from "../action/tAction";

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
type LoginActionType = ReturnType<typeof bringLoginInfo>;

function callTableReducer(
  stateYearAndMonth: YearAndMonth = initialState,
  action: Actiontype
) {
  switch (action.type) {
    case CallTableInfo:
      return {
        ...stateYearAndMonth,
        year: action.payload.year,
        month: action.payload.month,
        date: action.payload.date,
      };
    default:
      return stateYearAndMonth;
  }

  function loginSet(logininfor: loginInfo, action: LoginActionType) {
    switch (action.type) {
      case LoginInfo:
        return {
          ...logininfor,
          id: action.payload.id,
          uid: action.payload.uid,
        };
    }
  }
}

export default callTableReducer;
