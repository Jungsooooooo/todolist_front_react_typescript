import { CallTableInfo } from "./ttypes"

interface info {
    year:any;
    month:any;
}

export function bringYearAndMonthTable(test:info){
    return {
        type:CallTableInfo,
        payload:test     
    }
}