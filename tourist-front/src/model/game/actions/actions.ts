import {ConditionType, startCondition, stopCondition} from "../conditions/conditions";
import {GameStateModification} from "../gameState";
import {flow, mapValues, flatten} from "lodash";
import {NEUTRAL_GAME_STATE_MODIFICATION} from "model/game/utils";

interface Action {
    name: string;
    label: string;
    effect: GameStateModification;
}

type ActionPart = Omit<Action, 'name'>;
export type ActionData = Omit<Action, 'effect'>;

const createActions = (actions: Record<string, ActionPart>): Record<string, Action> =>
    mapValues(actions, (actionPart, name) => ({
        ...actionPart,
        name
    }));

const actions = createActions({
    stopWalk: {
        label: 'Остановиться',
        effect: flow(startCondition(ConditionType.REST), stopCondition(ConditionType.WALK))
    },
    startWalk: {
        label: 'Пойти',
        effect: flow(startCondition(ConditionType.WALK), stopCondition(ConditionType.REST))
    }
});

export type ConditionsToActionsMap = {
    [condition in ConditionType]?: (keyof typeof actions)[];
}

const conditionsActionsMap: ConditionsToActionsMap = {
    [ConditionType.WALK]: ['stopWalk'],
    [ConditionType.REST]: ['startWalk']
};

export const getAvailableActions = (activeConditions: ConditionType[]): ActionData[] =>
    flatten(
        activeConditions.map(condition =>
            (conditionsActionsMap[condition] || []).map(
                flow(
                    actionName => actions[actionName],
                    ({name, label}) => ({name, label})
                )
            )

        )
    );

export const getActionEffect = (action: ActionData): GameStateModification =>
    actions[action.name].effect || NEUTRAL_GAME_STATE_MODIFICATION;