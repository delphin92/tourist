import {createSlice, PayloadAction} from "redux-starter-kit";
import {nextTurn, GameState} from "model/game/gameState";
import initialGameState from "model/game/stubs/initialGameState";
import {ActionData, getActionEffect} from "model/game/actions/actions";
import {getEquipmentUseEffect} from "model/game/equip/equip";

const gameState = createSlice({
    name: 'gameState',
    initialState: initialGameState as GameState,
    reducers: {
        init: (state, {payload: newGameState}) => newGameState,
        turn: state => nextTurn(state),
        doAction: (state, {payload: action}: PayloadAction<ActionData>) =>
            getActionEffect(action)(state),
        useEquipment: (state, {payload: equipmentName}: PayloadAction<string>) =>
            getEquipmentUseEffect(equipmentName)(state)
    }
});

export const {init, turn, doAction, useEquipment} = gameState.actions;

export default gameState.reducer;