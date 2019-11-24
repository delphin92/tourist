import {Characteristics} from "model/game/characteristics/characteristics";
import {Condition, Conditions} from "model/game/conditions/conditions";
import {combineModifications} from "model/game/utils";
import { values } from "lodash";

export interface GameState {
    characteristics: Characteristics;
    conditions: Partial<Conditions>;
}

export type GameStateModification = (gameState: GameState) => GameState;

export const turn: (gameState: GameState) => GameState =
    (gameState: GameState) =>
        combineModifications(
            ...values<Condition>(gameState.conditions)
                .map(condition => condition.permanentEffect)
                .filter((effect): effect is (GameStateModification | GameStateModification[]) => !!effect)
                .map(effect => effect instanceof Array ? combineModifications(...effect) : effect)
        )(gameState);