import React from "react";
import TimeControl from "pages/HikingScreen/Actions/TimeControl";
import {Card} from "react-bootstrap";

interface ActionsProps {

}

const Actions: React.FC<ActionsProps> = () => (
    <Card>
        <Card.Body>
            <TimeControl/>
        </Card.Body>
    </Card>
);

export default Actions;