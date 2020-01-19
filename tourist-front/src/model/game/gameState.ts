import {Characteristics} from "model/game/characteristics/characteristics";
import {applyAllConditions, ConditionType} from "model/game/conditions/conditions";
import {GameLog} from "model/game/gameLog";

export interface GameState {
    characteristics: Characteristics;
    activeConditions: ConditionType[];
    equipment: string[];    // names
    gameLog: GameLog;
}

export type GameStateModification = (gameState: GameState) => GameState;

export const nextTurn: (gameState: GameState) => GameState =
    (gameState: GameState) =>
        applyAllConditions(gameState);