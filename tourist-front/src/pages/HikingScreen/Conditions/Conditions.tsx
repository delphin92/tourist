import React from "react";
import {connect} from "react-redux";
import {RootState} from "redux/rootReducer";
import {allConditions} from "model/game/conditions/allConditions";
import {Badge, OverlayTrigger, Tooltip} from "react-bootstrap";
import {flow} from "lodash";

interface ConditionsProps {
    conditionNames: string[];
}

const Conditions: React.FC<ConditionsProps> = ({conditionNames}) => (
    <>
        {conditionNames.map(flow(name => (
            <OverlayTrigger
                key={name}
                placement="top"
                overlay={
                    <Tooltip id={`tooltip-${name}`}>
                        {allConditions[name].description}
                    </Tooltip>
                }
            >
                <Badge variant="secondary" className="mr-1">{allConditions[name].label}</Badge>
            </OverlayTrigger>
        )))}
    </>
);

export default connect((state: RootState) => ({
    conditionNames: state.gameState.activeConditions,
}))(Conditions);