import React from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import './Menu.css';
import {RouteComponentProps, withRouter} from "react-router";

const Menu: React.FC<RouteComponentProps> = ({history}) => {
    const newGame = () =>
        history.push('/hiking');

    return (
        <Container className="menu-container">
            <Row>
                <Col xs={{span: 4, offset: 4}} className="menu-buttons-container">
                    <Button onClick={newGame}>Новая игра</Button>
                    <Button>Что-то еще</Button>
                    <Button>И что-то еще</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default withRouter(Menu);