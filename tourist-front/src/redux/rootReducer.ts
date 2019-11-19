import { combineReducers } from 'redux-starter-kit';
import gameState from "redux/reducers/gameStateSlice";

const rootReducer = combineReducers({
    gameState: gameState.reducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;