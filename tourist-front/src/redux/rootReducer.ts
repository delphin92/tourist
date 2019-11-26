import { combineReducers } from 'redux-starter-kit';
import gameState from "redux/reducers/gameStateSlice";
import timeControl from "./reducers/timeControl";

const rootReducer = combineReducers({
    gameState: gameState.reducer,
    timeControl
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;