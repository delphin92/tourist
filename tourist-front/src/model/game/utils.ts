import {GameState, GameStateModification} from "model/game/gameState";
import {ConditionType, startCondition, stopCondition} from "model/game/conditions/conditions";

export type ValueModification = (value: number) => number;
export type GameStatePredicate = (state: GameState) => boolean;

export const combineModifications: (...modifications: GameStateModification[]) => GameStateModification =
    (...modifications: GameStateModification[]) =>
        gameState => modifications.reduce((nextState, modification) => modification(nextState), gameState);

export const when = (predicate: GameStatePredicate) => (
    thenModification: GameStateModification,
    elseModification: GameStateModification = NEUTRAL_GAME_STATE_MODIFICATION
): GameStateModification =>
    state => predicate(state)
        ? thenModification(state)
        : elseModification(state);

export const checkCondition = (condition: ConditionType, predicate: GameStatePredicate): GameStateModification =>
    state => predicate(state)
        ? startCondition(condition)(state)
        : stopCondition(condition)(state);

export const NEUTRAL_GAME_STATE_MODIFICATION: GameStateModification = state => state;