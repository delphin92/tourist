import {createSlice} from "redux-starter-kit";
import {nextTurn, GameState} from "model/game/gameState";
import initialGameState from "model/game/stubs/initialGameState";

const gameState = createSlice({
    name: 'gameState',
    initialState: initialGameState as GameState,
    reducers: {
        init: (state, {payload: newGameState}) => newGameState,
        turn: state => nextTurn(state)
    }
});

export const {init, turn} = gameState.actions;

export default gameState.reducer;