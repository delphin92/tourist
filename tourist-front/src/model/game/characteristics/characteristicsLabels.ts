import {CharacteristicType} from "model/game/characteristics/characteristics";

export type CharacteristicsLabels = {
    [name in CharacteristicType]: string
}

export const characteristicsLabels: CharacteristicsLabels = {
    [CharacteristicType.ENERGY]: 'Силы',
    [CharacteristicType.CHEERFULNESS]: 'Бодрость',
    [CharacteristicType.BELLYFUL]: 'Сытость',
    [CharacteristicType.HYDRATION]: 'Вода',
    [CharacteristicType.MOOD]: 'Настроение',
    [CharacteristicType.COMFORT]: 'Комфорт',
    [CharacteristicType.REST_SPEED]: 'Скорость отдыха'
};