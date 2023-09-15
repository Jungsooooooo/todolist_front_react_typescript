import { LoginInfo } from "../action/ttypes";
import { bringLoginInfo } from "../action/tAction";

type loginInfo = {
  uid: string;
};

const initialStateoflogin = {
  uid: "hi",
};

type LoginActionType = ReturnType<typeof bringLoginInfo>;

function loginSet(
  logininfor: loginInfo = initialStateoflogin,
  action: LoginActionType
) {
  switch (action.type) {
    case LoginInfo:
      return {
        ...logininfor,
        uid: action.payload.uid,
      };
    default:
      return logininfor;
  }
}

export default loginSet;
