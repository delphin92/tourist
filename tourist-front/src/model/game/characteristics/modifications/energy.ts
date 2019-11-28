import {ValueModification, when} from "model/game/utils";
import {ConditionType, startCondition, stopCondition} from "model/game/conditions/conditions";
import {
    CharacteristicAttributeModification,
    CharacteristicType, isLessThenPercentOfMax, modifyCharacteristicLimit,
    modifyCharacteristicValue
} from "model/game/characteristics/characteristics";
import { flow } from "lodash";

export const modifyEnergy: CharacteristicAttributeModification =
    (modification: ValueModification) =>
        flow(
            modifyCharacteristicValue(CharacteristicType.ENERGY)(modification),
            when(state => isLessThenPercentOfMax(state.characteristics.energy, 20))(
                startCondition(ConditionType.TIRED),
                stopCondition(ConditionType.TIRED)
            ),
            when(state => state.characteristics.energy.value === 0)(
                flow(
                    stopCondition(ConditionType.WALK),
                    startCondition(ConditionType.REST)
                )
            )
        );

export const modifyEnergyLimit: CharacteristicAttributeModification =
    modifyCharacteristicLimit(CharacteristicType.ENERGY);