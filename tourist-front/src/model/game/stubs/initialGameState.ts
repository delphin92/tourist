import {GameState} from "model/game/gameState";
import {Condition} from "model/game/conditions/conditions";
import {Characteristic, CharacteristicType} from "model/game/characteristics/characteristics";

const initCharacteristic: (value: number, max: number, limit?: number) => Characteristic =
    (value: number, max: number, limit?: number) => ({ value, limit, max });

const initialGameState: GameState = {
    characteristics: {
        [CharacteristicType.ENERGY]: initCharacteristic(80, 100, 100),
        [CharacteristicType.CHEERFULNESS]: initCharacteristic(60, 100, 100),
        [CharacteristicType.BELLYFUL]: initCharacteristic(40, 100, 100),
        [CharacteristicType.HYDRATION]: initCharacteristic(50, 100, 100),
        [CharacteristicType.MOOD]: initCharacteristic(70, 100, 100),
        [CharacteristicType.COMFORT]: initCharacteristic(10, 100),
        [CharacteristicType.REST_SPEED]: initCharacteristic(0, 10)
    },
    conditions: new Set<Condition>()
};

export default initialGameState;