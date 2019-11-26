import { combineReducers } from 'redux-starter-kit';
import gameState from "redux/reducers/gameState";
import timeControl from "redux/reducers/timeControl";

const rootReducer = combineReducers({
    gameState,
    timeControl
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;