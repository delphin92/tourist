import React from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import './Menu.css';
import {RouteComponentProps, withRouter} from "react-router";
import {connect} from "react-redux";
import {GameState} from "model/game/gameState";
import gameStateSlice from "redux/reducers/gameStateSlice";
import initialGameState from "model/game/stubs/initialGameState";

interface MenuProps extends RouteComponentProps {
    initGame: (gameState: GameState) => void;
}

const Menu: React.FC<MenuProps> = ({initGame, history}) => {
    const newGame = () => {
        initGame(initialGameState);
        history.push('/hiking');
    };

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

export default connect(null, dispatch => ({
    initGame: (gameState: GameState) => dispatch(gameStateSlice.actions.init(gameState))
}))(withRouter(Menu));