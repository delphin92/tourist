import {createSlice} from "redux-starter-kit";
import {turn, GameState} from "model/game/gameState";
import initialGameState from "model/game/stubs/initialGameState";

export default createSlice({
    name: 'gameState',
    initialState: initialGameState as GameState,
    reducers: {
        init: (state, {payload: newGameState}) => newGameState,
        turn: state => turn(state)
    }
});