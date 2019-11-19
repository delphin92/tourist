import React from "react";
import {Card} from "react-bootstrap";
import CharacteristicBar from "pages/HikingScreen/Characteristics/CharacteristicMonitor/CharacteristicBar";
import {CharacteristicType} from "model/game/characteristics/characteristics";
import {characteristicsLabels} from "model/game/characteristics/characteristicsLabels";

interface CharacteristicMonitorProps {
    characteristicType: CharacteristicType;
}

const CharacteristicMonitor: React.FC<CharacteristicMonitorProps> = ({characteristicType}) => (
    <Card>
        <Card.Body>
            {characteristicsLabels[characteristicType]}
            <CharacteristicBar characteristicType={characteristicType} color="red"/>
        </Card.Body>
    </Card>
);

export default CharacteristicMonitor;