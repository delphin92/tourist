import {GameStateModification} from "model/game/gameState";
import {combineModifications, NEUTRAL_GAME_STATE_MODIFICATION, when} from "model/game/utils";
import { flow, without } from "lodash";
import {modifyMood, modifyRestSpeed} from "model/game/characteristics/modifications/other";
import {modifyEnergy, modifyEnergyLimit} from "model/game/characteristics/modifications/energy";

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

    return when(({activeConditions}) => !activeConditions.includes(conditionType))(
        flow(
            state => ({...state, activeConditions: [...state.activeConditions, conditionType]}),
            condition.startEffect
                ? condition.startEffect()
                : NEUTRAL_GAME_STATE_MODIFICATION
        )
    );
};

export const stopCondition = (conditionType: ConditionType): GameStateModification => {
    const condition = CONDITIONS[conditionType];

    if (!condition) {
        return NEUTRAL_GAME_STATE_MODIFICATION;
    }

    return when(({activeConditions}) => activeConditions.includes(conditionType))(
        flow(
            state => ({...state, activeConditions: without(state.activeConditions, conditionType)}),
            condition.endEffect
                ? condition.endEffect()
                : NEUTRAL_GAME_STATE_MODIFICATION
        )
    );
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
            modifyEnergyLimit(value => value - 5),
            modifyEnergy(value => value - 80)
        )
    },
    rest: {
        permanentEffect: () => flow(
            gameState => modifyEnergy(value => value + gameState.characteristics.restSpeed.value)(gameState),
            modifyRestSpeed(speed => speed + 20)
        )
    },
    wake: {},
    tired: {
        startEffect: () => modifyMood(mood => mood - 200),
        endEffect: () => modifyMood(mood => mood + 200)
    }
};