import {GameStateModification} from "model/game/gameState";
import {NEUTRAL_GAME_STATE_MODIFICATION} from "model/game/utils";
import {
    modifyEnergy,
    modifyEnergyLimit,
    modifyRestSpeed
} from "model/game/characteristics/characteristics";

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
    startEffect?: GameStateModification;
    endEffect?: GameStateModification;
    permanentEffect?: GameStateModification | GameStateModification[];
}

export type Conditions = {
    [name in ConditionType]: Condition;
}

export type ConditionsModification = (conditions: Conditions) => Conditions;

export const startCondition: (conditionType: ConditionType) => GameStateModification =
    (conditionType: ConditionType) => {
        const condition = getConditions()[conditionType];

        if (!condition) {
            return NEUTRAL_GAME_STATE_MODIFICATION;
        }

        const addConditionEffect: GameStateModification = ({conditions, ...state}) => ({
            ...state,
            conditions: conditions.add(condition)
        });

        return state => condition.startEffect
            ? condition.startEffect(addConditionEffect(state))
            : state;
    };

const getConditions: () => Partial<Conditions> = () => ({
    walk: {
        permanentEffect: [
            modifyEnergy(value => value - 80),
            modifyEnergyLimit(value => value - 5)
        ]
    },
    rest: {
        permanentEffect: [
            gameState => modifyEnergy(value => value + gameState.characteristics.restSpeed.value)(gameState),
            modifyRestSpeed(speed => speed + 1)
        ]
    },
    wake: {}
});