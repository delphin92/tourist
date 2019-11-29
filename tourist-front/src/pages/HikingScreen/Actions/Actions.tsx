import React from "react";
import TimeControl from "pages/HikingScreen/Actions/TimeControl";
import {Card} from "react-bootstrap";
import GameActions from "pages/HikingScreen/Actions/GameActions";
import GameClock from "pages/HikingScreen/Actions/GameClock";

interface ActionsProps {

}

const Actions: React.FC<ActionsProps> = () => (
    <Card>
        <Card.Body>
            <div className="d-flex flex-row justify-content-between">
                <TimeControl/>
                <GameClock/>
            </div>
            <GameActions/>
        </Card.Body>
    </Card>
);

export default Actions;