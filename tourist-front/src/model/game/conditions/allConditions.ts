import {flow} from "lodash";
import {modifyEnergy, modifyEnergyLimit} from "model/game/characteristics/modifications/energy";
import {modifyMood, modifyRestSpeed} from "model/game/characteristics/modifications/other";
import {modifySatiety} from "model/game/characteristics/modifications/satiety";
import {modifyHydration} from "model/game/characteristics/modifications/hydration";
import {Conditions} from "model/game/conditions/conditions";
import {commonAreasConditions} from "model/game/stubs/routes/commonAreas";
import {move} from "model/game/route/route";

export const allConditions: Conditions = {
    walk: {
        permanentEffect: () => flow(
            modifyEnergyLimit(value => value - 5),
            modifyEnergy(value => value - 80),
            move
        )
    },
    rest: {
        permanentEffect: () => flow(
            gameState => modifyEnergy(value => value + gameState.characteristics.restSpeed.value)(gameState),
            modifyRestSpeed(speed => speed + 20)
        )
    },
    wake: {
        permanentEffect: () => flow(
            modifySatiety(satiety => satiety - 3),
            modifyHydration(satiety => satiety - 3)
        )
    },
    sleep: {
        permanentEffect: () => flow(
            modifySatiety(satiety => satiety - 1),
            modifyHydration(satiety => satiety - 1)
        )
    },
    hungry: {
        startMessage: { text: 'Вы проголодались', style: 'bold' },
        endMessage: { text: 'Вы утолили чувство голода', style: 'bold' }
    },
    veryHungry: {
        startMessage: { text: 'Вы чувствуете, что умираете от голода', style: 'bold' },
        endMessage: { text: 'Чувство голода уменьшилось', style: 'bold' }
    },
    thirst: {
        startMessage: { text: 'Вы хотите пить', style: 'bold' },
        endMessage: { text: 'Вы утолили жажду', style: 'bold' }
    },
    strongThirst: {
        startMessage: { text: 'Вас мучает сильная жажда', style: 'bold' },
        endMessage: { text: 'Вы меньше хотите пить', style: 'bold' }
    },
    tired: {
        startEffect: () => modifyMood(mood => mood - 200),
        endEffect: () => modifyMood(mood => mood + 200),

        startMessage: { text: 'Вы чувствуете сильную усталость', style: 'bold' },
        endMessage: { text: 'Вы больше не чувствуете себя сильно уставшим', style: 'bold' }
    },
    ...commonAreasConditions
};