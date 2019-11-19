import React from "react";
import CharacteristicMonitor from "pages/HikingScreen/Characteristics/CharacteristicMonitor/CharacteristicMonitor";
import {CharacteristicType} from "model/game/characteristics/characteristics";

const Characteristics: React.FC = ({}) => (
    <div>
        <CharacteristicMonitor characteristicType={CharacteristicType.ENERGY}/>
        <CharacteristicMonitor characteristicType={CharacteristicType.CHEERFULNESS}/>
        <CharacteristicMonitor characteristicType={CharacteristicType.BELLYFUL}/>
        <CharacteristicMonitor characteristicType={CharacteristicType.HYDRATION}/>
        <CharacteristicMonitor characteristicType={CharacteristicType.MOOD}/>
        <CharacteristicMonitor characteristicType={CharacteristicType.COMFORT}/>
    </div>
);

export default Characteristics;