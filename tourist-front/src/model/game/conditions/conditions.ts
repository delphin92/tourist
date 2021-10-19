import {GameStateModification} from "model/game/gameState";
import {combineModifications, NEUTRAL_GAME_STATE_MODIFICATION} from "model/game/utils";
import { flow, without } from "lodash";
import {GameLogMessage, pushToGameLog} from "model/game/gameLog";
import {allConditions} from "model/game/conditions/allConditions";

export enum ConditionType {
    WALK = 'walk',
    REST = 'rest',
    WAKE = 'wake',
    SLEEP = 'sleep',
    HUNGRY = 'hungry',
    VERY_HUNGRY = 'veryHungry',
    THIRST = 'thirst',
    STRONG_THIRST = 'strongThirst',
    TIRED = 'tired',
    NEAR_FIRE = 'nearFire',
}

export interface Condition {
    startEffect?: () => GameStateModification;
    endEffect?: () => GameStateModification;
    permanentEffect?: () => GameStateModification;
    startMessage?: GameLogMessage;
    endMessage?: GameLogMessage;
}

export type Conditions = {
    [name: string]: Condition;
}

export type ConditionsModification = (conditions: Conditions) => Conditions;

export const startCondition = (conditionType: string): GameStateModification => state => {
    const condition = allConditions[conditionType];

    if (condition && !state.activeConditions.includes(conditionType)) {
        return flow(
            state => ({...state, activeConditions: [...state.activeConditions, conditionType]}),
            condition.startMessage
                ? pushToGameLog(condition.startMessage)
                : NEUTRAL_GAME_STATE_MODIFICATION,
            condition.startEffect
                ? condition.startEffect()
                : NEUTRAL_GAME_STATE_MODIFICATION,

        )(state);
    }

    return state;
};

export const stopCondition = (conditionType: string): GameStateModification => state => {
    const condition = allConditions[conditionType];

    if (condition && state.activeConditions.includes(conditionType)) {
        return flow(
            state => ({...state, activeConditions: without(state.activeConditions, conditionType)}),
            condition.endMessage
                ? pushToGameLog(condition.endMessage)
                : NEUTRAL_GAME_STATE_MODIFICATION,
            condition.endEffect
                ? condition.endEffect()
                : NEUTRAL_GAME_STATE_MODIFICATION,
        )(state);
    }

    return state;
};

export const applyAllConditions: GameStateModification =
    state =>
        combineModifications(
            ...state.activeConditions
                .map(conditionType => allConditions[conditionType])
                .filter((condition): condition is Condition => !!condition)
                .map(condition => condition.permanentEffect)
                .filter((effect): effect is () => GameStateModification => !!effect)
                .map(effect => effect())
        )(state);