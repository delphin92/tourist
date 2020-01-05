import {GameState} from "model/game/gameState";
import {ConditionType, startCondition} from "model/game/conditions/conditions";
import {Characteristic, CharacteristicType} from "model/game/characteristics/characteristics";
import {flow} from "lodash";

const initCharacteristic: (value: number, max: number, limit?: number) => Characteristic =
    (value: number, max: number, limit?: number) => ({ value, limit, max });

const initialGameState: GameState =
    flow(
        () => ({
            characteristics: {
                [CharacteristicType.ENERGY]: initCharacteristic(5000, 5000, 5000),
                [CharacteristicType.CHEERFULNESS]: initCharacteristic(600, 1000, 1000),
                [CharacteristicType.SATIETY]: initCharacteristic(800, 1000, 1000),
                [CharacteristicType.HYDRATION]: initCharacteristic(2000, 3000),
                [CharacteristicType.MOOD]: initCharacteristic(700, 1000, 1000),
                [CharacteristicType.COMFORT]: initCharacteristic(10, 100),
                [CharacteristicType.REST_SPEED]: initCharacteristic(10, 240)
            },
            activeConditions: [],
            equipment: ['chocolateBar', 'chocolateBar', 'chocolateBar']
        }),
        startCondition(ConditionType.WALK),
        startCondition(ConditionType.WAKE)
    )();

export default initialGameState;