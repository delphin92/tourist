import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import Characteristics from "pages/HikingScreen/Characteristics/Characteristics";
import Backpack from "pages/HikingScreen/Backpack/Backpack";
import "pages/HikingScreen/HikingScreen.scss"
import Actions from "pages/HikingScreen/Actions/Actions";

const HikingScreen: React.FC = () => (
    <Container className="hiking-screen-container">
        <Row>
            <Col sm={3} className="hiking-screen-panel hiking-screen-left-panel">
                <Characteristics/>
            </Col>
            <Col sm={6} className="hiking-screen-center">
                <div className="hiking-screen-center-top">
                    123
                </div>
                <div className="hiking-screen-center-bottom hiking-screen-panel">
                    <Actions/>
                </div>
            </Col>
            <Col sm={3} className="hiking-screen-panel hiking-screen-right-panel">
                <Backpack/>
            </Col>
        </Row>
    </Container>
);

export default HikingScreen;