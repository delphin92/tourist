import {Route} from "model/game/route/route";
import {addNamesToConfig, when} from "model/game/utils";
import {modifyEnergy} from "model/game/characteristics/modifications/energy";
import {ConditionType} from "model/game/conditions/conditions";

export const simpleWay: Route = {
    name: 'simpleWay',
    length: 3000,
    wayPoints: [{
        position: 100,
        startArea: ['forest', 'goodForestPath']
    }, {
        position: 1000,
        startArea: 'badForestPath',
        endArea: 'goodForestPath'
    }, {
        position: 2000,
        startArea: 'lightSwamp',
        endArea: 'forest'
    }, {
        position: 2500,
        endArea: 'lightSwamp'
    }],
    areas: addNamesToConfig({
        lightSwamp: {
            startMessage: { text: 'Вы вышли к заболоченному полю. Дорога в целом сухая, но иногда прриходится обходить большие лужи.' },
            endMessage: { text: 'Заболоченное поле закончилось' },
            condition: {
                name: 'on',
                permanentEffect: () => when(state => state.activeConditions.includes(ConditionType.WALK))(
                    modifyEnergy(energy => energy - 15)
                )
            }
        }
    })
};