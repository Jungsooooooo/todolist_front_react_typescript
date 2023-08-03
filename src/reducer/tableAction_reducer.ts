import { CallTableInfo } from "../action/ttypes";
import { bringYearAndMonthTable } from "../action/tAction";

type YearAndMonth ={
    year:any
    month:any
}

const initialState={
    year:null,
    month:null
}

type Actiontype = ReturnType<typeof bringYearAndMonthTable>;


export default function callTableReducer(
    state: YearAndMonth = initialState,
    action: Actiontype
){
    console.log({action});
    console.log({state});
    switch(action.type){
        
        case CallTableInfo:
        return {...state, year:action.payload.year,month:action.payload.month};

        default:
            return state;
    }
}

