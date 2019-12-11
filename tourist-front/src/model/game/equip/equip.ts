import {GameStateModification} from "model/game/gameState";
import { mapValues, flow } from "lodash";
import {modifySatiety} from "model/game/characteristics/modifications/satiety";
import produce from "immer";

export interface Equip {
    name: string;
    label: string;
    imgPath?: string;
    permanentEffect?: () => GameStateModification;
    useEffect?: () => GameStateModification;
}

type EquipPart = Omit<Equip, 'name'>;

const createEquipments = (equipments: Record<string, EquipPart>): Record<string, Equip> =>
    mapValues(equipments, (equipPart, name) => ({
        ...equipPart,
        name
    }));

const equipments = createEquipments({
    chocolateBar: {
        label: 'Шоколадный батончик',
        useEffect: () => flow(
            modifySatiety(satiety => satiety + 500),
            state => produce(state, draftState => {
                draftState.equipment.splice(state.equipment.indexOf('chocolateBar'), 1);
            })
        )
    }
});