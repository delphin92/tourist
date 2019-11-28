import React from "react";
import TimeControl from "pages/HikingScreen/Actions/TimeControl";
import {Card} from "react-bootstrap";
import GameActions from "pages/HikingScreen/Actions/GameActions";

interface ActionsProps {

}

const Actions: React.FC<ActionsProps> = () => (
    <Card>
        <Card.Body>
            <TimeControl/>
            <GameActions/>
        </Card.Body>
    </Card>
);

export default Actions;