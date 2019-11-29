import React from "react";
import {GameClock as GameClockModel} from "model/game/gameClock";
import {connect} from "react-redux";
import {RootState} from "redux/rootReducer";

interface GameClockProps extends GameClockModel { }

const GameClock: React.FC<GameClockProps> = ({day, hour, minute}) => (
    <div>{day} : {hour.toString().padStart(2, '0')} : {minute.toString().padStart(2, '0')}</div>
);

export default connect((state: RootState) => state.gameClock)(GameClock);