import {GameStateModification} from "model/game/gameState";
import {combineModifications, NEUTRAL_GAME_STATE_MODIFICATION, when} from "model/game/utils";
import { flow, without } from "lodash";
import {modifyMood, modifyRestSpeed} from "model/game/characteristics/modifications/other";
import {modifyEnergy, modifyEnergyLimit} from "model/game/characteristics/modifications/energy";
import {modifySatiety} from "model/game/characteristics/modifications/satiety";
import {modifyHydration} from "model/game/characteristics/modifications/hydration";
import {GameLogMessage, pushToGameLog} from "model/game/gameLog";

export enum ConditionType {
    WALK = 'walk',
    REST = 'rest',
    WAKE = 'wake',
    SLEEP = 'sleep',
    HUNGRY = 'hungry',
    VERY_HUNGRY = 'veryHungry',
    THIRST = 'thirst',
    STRONG_THIRST = 'strongThirst',
    TIRED = 'tired'
}

export interface Condition {
    startEffect?: () => GameStateModification;
    endEffect?: () => GameStateModification;
    permanentEffect?: () => GameStateModification;
    startMessage?: GameLogMessage;
    endMessage?: GameLogMessage;
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
                : NEUTRAL_GAME_STATE_MODIFICATION,
            condition.startMessage
                ? pushToGameLog(condition.startMessage)
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
                : NEUTRAL_GAME_STATE_MODIFICATION,
            condition.endMessage
                ? pushToGameLog(condition.endMessage)
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
    wake: {
        permanentEffect: () => flow(
            modifySatiety(satiety => satiety - 3),
            modifyHydration(satiety => satiety - 3)
        )
    },
    sleep: {
        permanentEffect: () => flow(
            modifySatiety(satiety => satiety - 1),
            modifyHydration(satiety => satiety - 1)
        )
    },
    hungry: {
        startMessage: { text: 'Вы проголодались', style: 'bold' },
        endMessage: { text: 'Вы утолили чувство голода', style: 'bold' }
    },
    veryHungry: {
        startMessage: { text: 'Вы чувствуете, что умираете от голода', style: 'bold' },
        endMessage: { text: 'Чувство голода уменьшилось', style: 'bold' }
    },
    thirst: {
        startMessage: { text: 'Вы хотите пить', style: 'bold' },
        endMessage: { text: 'Вы утолили жажду', style: 'bold' }
    },
    strongThirst: {
        startMessage: { text: 'Вас мучает сильная жажда', style: 'bold' },
        endMessage: { text: 'Вы меньше хотите пить', style: 'bold' }
    },
    tired: {
        startEffect: () => modifyMood(mood => mood - 200),
        endEffect: () => modifyMood(mood => mood + 200),

        startMessage: { text: 'Вы чувствуете сильную усталость', style: 'bold' },
        endMessage: { text: 'Вы больше не чувствуете себя сильно уставшим', style: 'bold' }
    }
};