import {
    CharacteristicAttributeModification,
    CharacteristicType,
    modifyCharacteristicValue
} from "model/game/characteristics/characteristics";

export const modifyRestSpeed: CharacteristicAttributeModification =
    modifyCharacteristicValue(CharacteristicType.REST_SPEED);

export const modifyComfort: CharacteristicAttributeModification =
    modifyCharacteristicValue(CharacteristicType.COMFORT);

export const modifyMood: CharacteristicAttributeModification =
    modifyCharacteristicValue(CharacteristicType.MOOD);