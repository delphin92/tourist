import {createSlice, PayloadAction} from "redux-starter-kit";
import {TimeControlState, TimeSpeeds} from "../../model/time/timeControlState";

export default createSlice({
    name: 'timeControl',
    initialState: {
        speed: TimeSpeeds.NORMAL
    } as TimeControlState,
    reducers: {
        setSpeed: (state, {payload: speed}: PayloadAction<TimeSpeeds>) => ({
            speed,
            paused: false
        }),
        pause: state => ({ ...state, paused: true }),
        start: state => ({ ...state, paused: false })
    }
});