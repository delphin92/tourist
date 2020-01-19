import React from "react";
import {GameLog as GameLogModel} from "model/game/gameLog";
import {connect} from "react-redux";
import {RootState} from "redux/rootReducer";
import {ListGroup} from "react-bootstrap";
import "./GameLog.scss";

interface GameLogProps extends GameLogModel {

}

const GameLog: React.FC<GameLogProps> = ({items}) => (
    <div className="game-log">
        <ListGroup>
            {items.map(({text, style, color}, index) =>
                <ListGroup.Item key={index}>
                    <span style={{
                        fontWeight: style === 'bold' ? 'bold' : undefined,
                        color
                    }}>{text}</span>
                </ListGroup.Item>
            )}
        </ListGroup>
    </div>
);

export default connect((state: RootState) => state.gameState.gameLog)(GameLog);