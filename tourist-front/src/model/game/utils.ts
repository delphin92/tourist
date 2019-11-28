import {GameState, GameStateModification} from "model/game/gameState";

export type ValueModification = (value: number) => number;

export const combineModifications: (...modifications: GameStateModification[]) => GameStateModification =
    (...modifications: GameStateModification[]) =>
        gameState => modifications.reduce((nextState, modification) => modification(nextState), gameState);

export const when = (predicate: (state: GameState) => boolean) => (
    thenModification: GameStateModification,
    elseModification: GameStateModification = NEUTRAL_GAME_STATE_MODIFICATION
): GameStateModification =>
    state => predicate(state)
        ? thenModification(state)
        : elseModification(state);

export const NEUTRAL_GAME_STATE_MODIFICATION: GameStateModification = state => state;