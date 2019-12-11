import {
    CharacteristicAttributeModification, CharacteristicType, isLessThenPercentOfMax,
    modifyCharacteristicValue
} from "model/game/characteristics/characteristics";
import { flow } from "lodash";
import {when} from "model/game/utils";
import {ConditionType, startCondition, stopCondition} from "model/game/conditions/conditions";

export const modifySatiety: CharacteristicAttributeModification =
    modification =>
        flow(
            modifyCharacteristicValue(CharacteristicType.SATIETY)(modification),
            when(state => isLessThenPercentOfMax(state.characteristics.satiety, 40))(
                startCondition(ConditionType.HUNGRY),
                stopCondition(ConditionType.HUNGRY)
            ),
            when(state => isLessThenPercentOfMax(state.characteristics.satiety, 20))(
                startCondition(ConditionType.VERY_HUNGRY),
                stopCondition(ConditionType.VERY_HUNGRY)
            ),
            when(state => state.characteristics.satiety.value === 0)(
                state => {
                    alert('Вы умерли с голоду');
                    return state;
                }
            )
        );