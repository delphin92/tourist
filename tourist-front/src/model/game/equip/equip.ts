import {GameStateModification} from "model/game/gameState";
import { mapValues, flow } from "lodash";
import {modifySatiety} from "model/game/characteristics/modifications/satiety";
import {NEUTRAL_GAME_STATE_MODIFICATION} from "model/game/utils";
import {modifyHydration} from "model/game/characteristics/modifications/hydration";
import {modifyMood} from "model/game/characteristics/modifications/other";
import {remove} from "utils/arrayUtils";

export interface Equip {
    name: string;
    label: string;
    description?: string;
    imgPath?: string;
    permanentEffect?: GameStateModification;
    useEffect?: GameStateModification;
}

export const getEquipments = (equipmentsNames: string[]): Equip[] =>
    equipmentsNames.map(name => equipments[name]);

export const getEquipmentUseEffect = (equipmentName: string): GameStateModification =>
    equipments[equipmentName].useEffect || NEUTRAL_GAME_STATE_MODIFICATION;

type EquipPart = Omit<Equip, 'name'>;

const createEquipments = (equipments: Record<string, EquipPart>): Record<string, Equip> =>
    mapValues(equipments, (equipPart, name) => ({
        ...equipPart,
        name
    }));

const equipments = createEquipments({
    chocolateBar: {
        label: 'Шоколадный батончик',
        description: 'Вкусно и питательно, но вызывает жажду.',
        imgPath: '/images/equipments/chocolateBar.jpg',
        useEffect: flow(
            modifySatiety(satiety => satiety + 500),
            modifyMood(mood => mood + 50),
            modifyHydration(hydration => hydration - 100),
            state => ({
                ...state,
                equipment: remove(state.equipment, state.equipment.indexOf('chocolateBar'))
            })
        )
    }, bottleWithWater: {
        label: 'Бутылка с водой',
        description: 'Маленькая бутылка с водой, хватит чтобы один раз как следует напиться.',
        imgPath: '/images/equipments/bottleWithWater.jpg',
        useEffect: flow(
            modifyHydration(hydration => hydration + 500),
            state => ({
                ...state,
                equipment: remove(state.equipment, state.equipment.indexOf('bottleWithWater'))
            })
        )
    },
});