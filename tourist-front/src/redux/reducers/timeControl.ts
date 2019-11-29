import {createSlice, PayloadAction} from "redux-starter-kit";
import {TimeControlState, TimeSpeeds} from "model/time/timeControlState";
import {AppThunk} from "redux/store";
import { turn } from "./gameState";
import { turn as clockTurn } from "./gameClock";

const timeControlSlice = createSlice({
    name: 'timeControl',
    initialState: {
        speed: TimeSpeeds.NORMAL,
        paused: true
    } as TimeControlState,
    reducers: {
        stop: state => ({ ...state, paused: true, _timerId: undefined }),
        start: (state, {payload: {speed, timerId}}: PayloadAction<{speed: number, timerId: number}>) => ({
            speed,
            paused: false,
            _timerId: timerId
        })
    }
});

const {start, stop} = timeControlSlice.actions;

export default timeControlSlice.reducer;

export const startTimer = (speed: TimeSpeeds = TimeSpeeds.NORMAL): AppThunk => (dispatch, getState) => {
    const oldTimerId = getState().timeControl._timerId;

    if (oldTimerId) {
        clearInterval(getState().timeControl._timerId);
    }

    const interval = 1000 / speed;

    const timerId = window.setInterval(() => {
        dispatch(turn());
        dispatch(clockTurn());
    }, interval);

    dispatch(start({timerId, speed}));
};

export const stopTimer = (): AppThunk => (dispatch, getState) => {
    clearInterval(getState().timeControl._timerId);
    dispatch(stop());
};