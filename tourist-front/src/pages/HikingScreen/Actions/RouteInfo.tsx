import React from "react";
import {connect} from "react-redux";
import {RootState} from "redux/rootReducer";
import {RouteState} from "model/game/route/route";

interface RouteInfoProps extends RouteState { }

const RouteInfo: React.FC<RouteInfoProps> = ({position}) => (
    <div>Вы прошли {(position / 1000).toPrecision(2)} км</div>
);

export default connect(
    (state: RootState) => state.gameState.route
)(RouteInfo);