import {Areas} from "model/game/route/area";
import {addNamesToConfig, when} from "model/game/utils";
import {Conditions, ConditionType} from "model/game/conditions/conditions";
import {modifyEnergy} from "model/game/characteristics/modifications/energy";

export const commonAreas: Areas = addNamesToConfig({
    forest: {
        startMessage: { text: 'Вы вошли в лес' },
        endMessage: { text: 'Вы вышли из леса' }
    },
    badForestPath: {
        startMessage: { text: 'Вы вышли на неширокую лесную тропинку. Под ногами попадаются корни, иногда приходится перебираться через упавшие деревья.' },
        condition: 'onBadForestPath'
    },
    goodForestPath: {
        startMessage: { text: 'Вы вышли на широкую лесную тропу.' }
    }
});

export const commonAreasConditions: Conditions = {
    onBadForestPath: {
        permanentEffect: () => when(state => state.activeConditions.includes(ConditionType.WALK))
        (
            modifyEnergy(energy => energy - 10)
        )
    }
};