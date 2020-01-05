import {
    CharacteristicAttributeModification,
    CharacteristicType,
    isLessThenPercentOfMax,
    modifyCharacteristicValue
} from "model/game/characteristics/characteristics";
import {flow} from "lodash";
import {checkCondition, when} from "model/game/utils";
import {ConditionType} from "model/game/conditions/conditions";

export const modifyHydration: CharacteristicAttributeModification =
    modification =>
        flow(
            modifyCharacteristicValue(CharacteristicType.HYDRATION)(modification),
            checkCondition(ConditionType.THIRST, state => isLessThenPercentOfMax(state.characteristics.hydration, 40)),
            checkCondition(ConditionType.STRONG_THIRST, state => isLessThenPercentOfMax(state.characteristics.hydration, 20)),

            when(state => state.characteristics.hydration.value === 0)(
                state => {
                    alert('Вы умерли от жажды');
                    return state;
                }
            )
        );