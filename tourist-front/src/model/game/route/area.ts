import {GameLogMessage, pushToGameLog} from "model/game/gameLog";
import {Condition, startCondition, stopCondition} from "model/game/conditions/conditions";
import {GameState, GameStateModification} from "model/game/gameState";
import { flow } from "lodash";
import {NEUTRAL_GAME_STATE_MODIFICATION} from "model/game/utils";
import {commonAreas} from "model/game/stubs/routes/commonAreas";
import {getRoute} from "model/game/route/route";

export interface Area {
    name: string;
    startMessage?: GameLogMessage;
    endMessage?: GameLogMessage;

    condition?: string | AreaCondition;
}

export interface Areas {
    [name: string]: Area;
}

export interface AreaCondition extends Condition {
    name: string;
}

export const makeAreaConditionName = (condition: AreaCondition, area: string): string =>
    area + '_' + condition.name;

const getConditionName = (condition: string | AreaCondition, area: string): string =>
    typeof condition === 'string'
        ? condition
        : makeAreaConditionName(condition, area);

const getArea = (routeName: string, areaName: string): Area => {
    const routeAreas = getRoute(routeName).areas;

    return routeAreas && routeAreas[areaName] || commonAreas[areaName];
};

export const startArea: (routeName: string, areaName: string | string[]) => GameStateModification =
    (routeName, areaName) =>
        flow(
            () => typeof areaName === 'string' ? [areaName] : areaName,
            names => names.map(name =>
                (state: GameState) => {
                    const area = getArea(routeName, name);

                    if (!area) {
                        return state;
                    }

                    return flow(
                        area.startMessage ? pushToGameLog(area.startMessage) : NEUTRAL_GAME_STATE_MODIFICATION,
                        area.condition ? startCondition(getConditionName(area.condition, area.name)) : NEUTRAL_GAME_STATE_MODIFICATION
                    )(state);
                }
            ),
            flow
        )();

export const endArea: (routeName: string, name: string | string[]) => GameStateModification =
    (routeName, areaName) =>
        flow(
            () => typeof areaName === 'string' ? [areaName] : areaName,
            names => names.map(name =>
                (state: GameState) => {
                    const area = getArea(routeName, name);

                    if (!area) {
                        return state;
                    }

                    return flow(
                        area.endMessage ? pushToGameLog(area.endMessage) : NEUTRAL_GAME_STATE_MODIFICATION,
                        area.condition ? stopCondition(getConditionName(area.condition, area.name)) : NEUTRAL_GAME_STATE_MODIFICATION
                    )(state);
                }
            ),
            flow
        )();