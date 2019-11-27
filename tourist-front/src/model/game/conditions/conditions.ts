import {GameStateModification} from "model/game/gameState";
import {combineModifications, NEUTRAL_GAME_STATE_MODIFICATION} from "model/game/utils";
import {
    modifyEnergy,
    modifyEnergyLimit,
    modifyRestSpeed
} from "model/game/characteristics/characteristics";
import { flow, pull } from "lodash";

export enum ConditionType {
    WALK = 'walk',
    REST = 'rest',
    WAKE = 'wake',
    SLEEP = 'sleep',
    HUNGRY = 'hungry',
    VERY_HUNGRY = 'veryHungry',
    TIRED = 'tired'
}

export interface Condition {
    startEffect?: () => GameStateModification;
    endEffect?: () => GameStateModification;
    permanentEffect?: () => GameStateModification;
}

export type Conditions = {
    [name in ConditionType]: Condition;
}

export type ConditionsModification = (conditions: Conditions) => Conditions;

export const startCondition = (conditionType: ConditionType): GameStateModification => {
    const condition = CONDITIONS[conditionType];

    if (!condition) {
        return NEUTRAL_GAME_STATE_MODIFICATION;
    }

    const addConditionEffect: GameStateModification = ({activeConditions, ...state}) => ({
        ...state,
        activeConditions: [...activeConditions, conditionType]
    });

    return condition.startEffect
        ? flow(addConditionEffect, condition.startEffect())
        : addConditionEffect;
};

export const stopCondition = (conditionType: ConditionType): GameStateModification => {
    const condition = CONDITIONS[conditionType];

    if (!condition) {
        return NEUTRAL_GAME_STATE_MODIFICATION;
    }

    const removeConditionEffect: GameStateModification = ({activeConditions, ...state}) => ({
        ...state,
        activeConditions: pull(activeConditions, conditionType)
    });

    return condition.endEffect
        ? flow(removeConditionEffect, condition.endEffect())
        : removeConditionEffect;
};

export const applyAllConditions: GameStateModification =
    state =>
        combineModifications(
            ...state.activeConditions
                .map(conditionType => CONDITIONS[conditionType])
                .filter((condition): condition is Condition => !!condition)
                .map(condition => condition.permanentEffect)
                .filter((effect): effect is () => GameStateModification => !!effect)
                .map(effect => effect())
        )(state);

const CONDITIONS: Partial<Conditions> = {
    walk: {
        permanentEffect: () => flow(
            modifyEnergy(value => value - 80),
            modifyEnergyLimit(value => value - 5)
        )
    },
    rest: {
        permanentEffect: () => flow(
            gameState => modifyEnergy(value => value + gameState.characteristics.restSpeed.value)(gameState),
            modifyRestSpeed(speed => speed + 1)
        )
    },
    wake: {}
};