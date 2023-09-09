import { CallTableInfo } from "./ttypes";
import { LoginInfo } from "./ttypes";
import { UUID } from "crypto";

interface info {
  year: number;
  month: number;
  date: number;
}

interface loginInfo {
  id: string;
  uid: UUID;
}

export function bringYearAndMonthTable(test: info) {
  return {
    type: CallTableInfo,
    payload: test,
  };
}

export function bringLoginInfo(login: loginInfo) {
  return {
    type: LoginInfo,
    payload: login,
  };
}
