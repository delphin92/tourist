import React from "react";
import {Card} from "react-bootstrap";
import CharacteristicBar from "pages/HikingScreen/Characteristics/CharacteristicMonitor/CharacteristicBar";

interface CharacteristicMonitorProps {
    name: string;
}

const CharacteristicMonitor: React.FC<CharacteristicMonitorProps> = ({name}) => (
    <Card>
        <Card.Body>
            {name}
            <CharacteristicBar value={200} limit={400} max={500} color="red"/>
        </Card.Body>
    </Card>
);

export default CharacteristicMonitor;