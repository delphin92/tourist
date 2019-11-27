import { ValueModification} from "model/game/utils";
import {GameState, GameStateModification} from "model/game/gameState";
import {ConditionType, startCondition} from "model/game/conditions/conditions";
import { flow } from "lodash";

export interface Characteristic {
    value: number;
    limit?: number;
    max: number
}

export enum CharacteristicType {
    ENERGY = 'energy',
    CHEERFULNESS = 'cheerfulness',
    BELLYFUL = 'bellyful',
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

const modifyCharacteristics: (modification: CharacteristicsModification) => GameStateModification =
    (modification: CharacteristicsModification) => (gameState: GameState) => ({
        ...gameState,
        characteristics: {...gameState.characteristics, ...modification(gameState.characteristics)}
    });

const modifyCharacteristicValue: (characteristicName: CharacteristicType) => CharacteristicAttributeModification =
    (characteristicName: CharacteristicType) => (modification: ValueModification) =>
        modifyCharacteristics(characteristics =>
            flow(
                () => characteristics[characteristicName],
                characteristic => ({
                    [characteristicName]: {
                        ...characteristic,
                        value: Math.min(modification(characteristic.value), characteristic.limit || characteristic.max)
                    }
                })
            )());

const modifyCharacteristicLimit: (characteristicName: CharacteristicType) => CharacteristicAttributeModification =
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

export const modifyEnergy: CharacteristicAttributeModification =
    (modification: ValueModification) =>
        flow(
            modifyCharacteristicValue(CharacteristicType.ENERGY)(modification),
            startCondition(ConditionType.TIRED)
        );

export const modifyEnergyLimit: CharacteristicAttributeModification =
    modifyCharacteristicLimit(CharacteristicType.ENERGY);

export const modifyRestSpeed: CharacteristicAttributeModification =
    modifyCharacteristicValue(CharacteristicType.REST_SPEED);