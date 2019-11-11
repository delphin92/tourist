import {Characteristics} from "model/game/characteristics/characteristics";
import {Condition} from "model/game/conditions/conditions";
import {combineModifications} from "model/game/utils";

export interface GameState {
    characteristics: Characteristics;
    conditions: Set<Condition>;
}

export type GameStateModification = (gameState: GameState) => GameState;

export const turn: (gameState: GameState) => GameState =
    (gameState: GameState) =>
        combineModifications(
            ...Array.from(gameState.conditions)
                .map(condition => condition.permanentEffect)
                .filter((effect): effect is (GameStateModification | GameStateModification[]) => !!effect)
                .map(effect => effect instanceof Array ? combineModifications(...effect) : effect)
        )(gameState);