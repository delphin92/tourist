import React from "react";
import TimeControl from "pages/HikingScreen/Actions/TimeControl";
import {Card} from "react-bootstrap";

const Actions: React.FC = ({}) => (
    <Card>
        <Card.Body>
            <TimeControl/>
        </Card.Body>
    </Card>
);

export default Actions;