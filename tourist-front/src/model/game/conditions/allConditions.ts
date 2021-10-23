import {flow} from "lodash";
import {modifyEnergy, modifyEnergyLimit} from "model/game/characteristics/modifications/energy";
import {modifyComfort, modifyMood, modifyRestSpeed} from "model/game/characteristics/modifications/other";
import {modifySatiety} from "model/game/characteristics/modifications/satiety";
import {modifyHydration} from "model/game/characteristics/modifications/hydration";
import {Conditions, stopCondition} from "model/game/conditions/conditions";
import {commonAreasConditions} from "model/game/stubs/routes/commonAreas";
import {move} from "model/game/route/route";

export const allConditions: Conditions = {
    walk: {
        label: 'Движение',
        description: 'Энергия постепенно снижается',
        startEffect: () => stopCondition('nearFire'),
        permanentEffect: () => flow(
            modifyEnergyLimit(value => value - 5),
            modifyEnergy(value => value - 80),
            move
        ),
        startMessage: { text: 'Вы начали движение' },
        endMessage: { text: 'Вы остановились' },
    },
    rest: {
        label: 'Отдых',
        description: 'Энергия постепенно восстанавливается',
        permanentEffect: () => flow(
            gameState => modifyEnergy(value => value + gameState.characteristics.restSpeed.value)(gameState),
            modifyRestSpeed(speed => speed + 20)
        ),
        startMessage: { text: 'Вы расположились на отдых' },
        endMessage: { text: 'Вы закончили отдыхать' },
    },
    wake: {
        label: 'Бодрствование',
        description: 'Бодрость снижается',
        permanentEffect: () => flow(
            modifySatiety(satiety => satiety - 3),
            modifyHydration(satiety => satiety - 3)
        )
    },
    sleep: {
        label: 'Сон',
        description: 'Бодрость восстанавливается. Сытость и вода снижается медленнее',
        permanentEffect: () => flow(
            modifySatiety(satiety => satiety - 1),
            modifyHydration(satiety => satiety - 1)
        )
    },
    hungry: {
        label: 'Голод',
        startMessage: { text: 'Вы проголодались', style: 'bold' },
        endMessage: { text: 'Вы утолили чувство голода', style: 'bold' }
    },
    veryHungry: {
        label: 'Сильный голод',
        startMessage: { text: 'Вы чувствуете, что умираете от голода', style: 'bold' },
        endMessage: { text: 'Чувство голода уменьшилось', style: 'bold' }
    },
    thirst: {
        label: 'Жажда',
        startMessage: { text: 'Вы хотите пить', style: 'bold' },
        endMessage: { text: 'Вы утолили жажду', style: 'bold' }
    },
    strongThirst: {
        label: 'Сильная жажда',
        startMessage: { text: 'Вас мучает сильная жажда', style: 'bold' },
        endMessage: { text: 'Вы меньше хотите пить', style: 'bold' }
    },
    tired: {
        label: 'Усталость',
        description: 'Настроение снижено',
        startEffect: () => modifyMood(mood => mood - 200),
        endEffect: () => modifyMood(mood => mood + 200),

        startMessage: { text: 'Вы чувствуете сильную усталость', style: 'bold' },
        endMessage: { text: 'Вы больше не чувствуете себя сильно уставшим', style: 'bold' }
    },
    nearFire: {
        label: 'У огня',
        description: 'Отдых более эффективен',
        startEffect: () => flow(
          modifyRestSpeed(restSpeed => restSpeed + 20),
          modifyComfort(comfort => comfort + 20),
        ),
        permanentEffect: () => modifyEnergyLimit(energyLimit => energyLimit + 1),
        endEffect: () => flow(
          modifyRestSpeed(restSpeed => restSpeed - 20),
          modifyComfort(comfort => comfort - 20),
        ),

        startMessage: { text: 'Вы отдыхаете возле костра' },
        endMessage: { text: 'Вы ушли от костра' }
    },
    ...commonAreasConditions
};