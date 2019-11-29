import { combineReducers } from 'redux-starter-kit';
import gameState from "redux/reducers/gameState";
import timeControl from "redux/reducers/timeControl";
import gameClock from "redux/reducers/gameClock";

const rootReducer = combineReducers({
    gameState,
    timeControl,
    gameClock
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;