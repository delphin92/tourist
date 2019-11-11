import {combineModifications, ValueModification} from "model/game/utils";
import {GameState, GameStateModification} from "model/game/gameState";
import {ConditionType, startCondition} from "model/game/conditions/conditions";

export enum CharacteristicType {
    ENERGY = 'energy',
    ENERGY_MAX = 'energyMax',
    ENERGY_MAX_MAX = 'energyMaxMax',
    CHEERFULNESS = 'cheerfulness',
    BELLYFUL = 'bellyful',
    HYDRATION = 'hydration',
    MOOD = 'mood',
    COMFORT = 'comfort',
    REST_SPEED = 'restSpeed',
    REST_SPEED_MAX = 'restSpeedMax',
}

export type Characteristics = {
    [name in CharacteristicType]: number
}

export type CharacteristicsModification = (characteristics: Characteristics) => Partial<Characteristics>;
export type CharacteristicValueModification = (modification: ValueModification) => GameStateModification;

const modifyCharacteristics: (modification: CharacteristicsModification) => GameStateModification =
    (modification: CharacteristicsModification) => (gameState: GameState) => ({
        ...gameState,
        characteristics: {...gameState.characteristics, ...modification(gameState.characteristics)}
    });

const modifyCharacteristicWithMax: (characteristicName: CharacteristicType, characteristicMaxName: CharacteristicType) => CharacteristicValueModification =
    (characteristicName: CharacteristicType, characteristicMaxName: CharacteristicType) => (modification: ValueModification) =>
        modifyCharacteristics(characteristics => ({
            [characteristicName]: Math.min(modification(characteristics[characteristicName]), characteristics[characteristicMaxName])
        }));

export const modifyEnergy: CharacteristicValueModification =
    (modification: ValueModification) =>
        combineModifications(
            modifyCharacteristics((characteristics: Characteristics) => ({
                energy: Math.min(characteristics.energyMax, modification(characteristics.energy))
            })),
            startCondition(ConditionType.TIRED)
        );

export const modifyEnergyMax: CharacteristicValueModification =
    (modification: ValueModification) =>
        modifyCharacteristics((characteristics: Characteristics) => ({
            energyMax: Math.min(characteristics.energyMaxMax, modification(characteristics.energyMax))
        }));

export const modifyRestSpeed: CharacteristicValueModification =
    modifyCharacteristicWithMax(CharacteristicType.REST_SPEED, CharacteristicType.REST_SPEED_MAX);