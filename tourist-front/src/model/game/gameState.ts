import {Characteristics} from "model/game/characteristics/characteristics";
import {applyAllConditions} from "model/game/conditions/conditions";
import {GameLog} from "model/game/gameLog";
import {RouteState} from "model/game/route/route";
import {GameConfig} from "model/game/gameConfig";

export interface GameState {
    characteristics: Characteristics;
    activeConditions: string[];
    equipment: string[];    // names
    gameLog: GameLog;
    route: RouteState;
    gameConfig: GameConfig;
}

export type GameStateModification = (gameState: GameState) => GameState;

export const nextTurn: (gameState: GameState) => GameState =
    (gameState: GameState) =>
        applyAllConditions(gameState);