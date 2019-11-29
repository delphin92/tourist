import {createSlice} from "redux-starter-kit";
import {GameClock} from "model/game/gameClock";

const gameClock = createSlice({
    name: 'gameClock',
    initialState: {
        day: 1,
        hour: 6,
        minute: 0
    } as GameClock,
    reducers: {
        turn: state => {
            state.minute++;
            if (state.minute === 60) {
                state.minute = 0;
                state.hour++;
                if (state.minute === 24) {
                    state.hour = 0;
                    state.day++;
                }
            }
        }
    }
});

export const {turn} = gameClock.actions;

export default gameClock.reducer;