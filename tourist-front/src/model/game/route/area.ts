import {GameLogMessage, pushToGameLog} from "model/game/gameLog";
import {startCondition, stopCondition} from "model/game/conditions/conditions";
import {GameState, GameStateModification} from "model/game/gameState";
import { flow } from "lodash";
import {NEUTRAL_GAME_STATE_MODIFICATION} from "model/game/utils";

export interface Area {
    startMessage?: GameLogMessage;
    endMessage?: GameLogMessage;

    condition?: string;
}

export interface Areas {
    [name: string]: Area;
}

export const startArea: (name: string | string[]) => GameStateModification =
    flow(
        name => typeof name === 'string' ? [name] : name,
        names => names.map(name =>
            (state: GameState) => {
                const area = state.gameConfig.areas[name];

                if (!area) {
                    return state;
                }

                return flow(
                    area.startMessage ? pushToGameLog(area.startMessage) : NEUTRAL_GAME_STATE_MODIFICATION,
                    area.condition ? startCondition(area.condition) : NEUTRAL_GAME_STATE_MODIFICATION
                )(state);
            }
        ),
        flow
    );

export const endArea: (name: string | string[]) => GameStateModification =
    flow(
        name => typeof name === 'string' ? [name] : name,
        names => names.map(name =>
            (state: GameState) => {
                const area = state.gameConfig.areas[name];

                if (!area) {
                    return state;
                }

                return flow(
                    area.endMessage ? pushToGameLog(area.endMessage) : NEUTRAL_GAME_STATE_MODIFICATION,
                    area.condition ? stopCondition(area.condition) : NEUTRAL_GAME_STATE_MODIFICATION
                )(state);
            }
        ),
        flow
    );