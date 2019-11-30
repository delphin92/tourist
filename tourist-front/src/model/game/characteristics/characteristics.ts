import {ValueModification} from "model/game/utils";
import {GameState, GameStateModification} from "model/game/gameState";
import { flow, clamp } from "lodash";

export interface Characteristic {
    value: number;
    limit?: number;
    max: number
}

export enum CharacteristicType {
    ENERGY = 'energy',
    CHEERFULNESS = 'cheerfulness',
    SATIETY= 'satiety',
    HYDRATION = 'hydration',
    MOOD = 'mood',
    COMFORT = 'comfort',
    REST_SPEED = 'restSpeed',
}

export type Characteristics = {
    [name in CharacteristicType]: Characteristic
}

export type CharacteristicsModification = (characteristics: Characteristics) => Partial<Characteristics>;
export type CharacteristicAttributeModification = (modification: ValueModification) => GameStateModification;

export const modifyCharacteristics: (modification: CharacteristicsModification) => GameStateModification =
    (modification: CharacteristicsModification) => (gameState: GameState) => ({
        ...gameState,
        characteristics: {...gameState.characteristics, ...modification(gameState.characteristics)}
    });

export const modifyCharacteristicValue: (characteristicName: CharacteristicType) => CharacteristicAttributeModification =
    (characteristicName: CharacteristicType) => (modification: ValueModification) =>
        modifyCharacteristics(characteristics =>
            flow(
                () => characteristics[characteristicName],
                characteristic => ({
                    [characteristicName]: {
                        ...characteristic,
                        value: clamp(modification(characteristic.value), 0, characteristic.limit || characteristic.max)
                    }
                })
            )());

export const modifyCharacteristicLimit: (characteristicName: CharacteristicType) => CharacteristicAttributeModification =
    (characteristicName: CharacteristicType) => (modification: ValueModification) =>
        modifyCharacteristics(characteristics =>
            flow(
                () => characteristics[characteristicName],
                characteristic => ({
                    [characteristicName]: {
                        ...characteristic,
                        limit: Math.min(modification(characteristic.limit || characteristic.max), characteristic.max)
                    }
                })
            )());

export const isLessThenPercentOfMax = (characteristic: Characteristic, percent: number): boolean =>
    characteristic.value * 100 < characteristic.max * percent;