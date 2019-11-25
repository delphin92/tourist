import { combineReducers } from 'redux-starter-kit';
import gameState from "redux/reducers/gameStateSlice";
import timeControlSlice from "./reducers/timeControlSlice";

const rootReducer = combineReducers({
    gameState: gameState.reducer,
    timeControl: timeControlSlice.reducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;