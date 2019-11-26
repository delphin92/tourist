import {Characteristics} from "model/game/characteristics/characteristics";
import {applyAllConditions, ConditionType} from "model/game/conditions/conditions";

export interface GameState {
    characteristics: Characteristics;
    activeConditions: ConditionType[];
}

export type GameStateModification = (gameState: GameState) => GameState;

export const nextTurn: (gameState: GameState) => GameState =
    (gameState: GameState) =>
        applyAllConditions(gameState);