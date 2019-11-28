import React from "react";
import {Button} from "react-bootstrap";
import {ActionData, getAvailableActions} from "model/game/actions/actions";
import {connect} from "react-redux";
import {RootState} from "redux/rootReducer";
import {doAction} from "redux/reducers/gameState";

interface GameActionsProps {
    actions: ActionData[];
    onDoAction: (action: ActionData) => void;
}

const GameActions: React.FC<GameActionsProps> = ({actions, onDoAction}) => (
    <div className="flex-row">
        {actions.map((action, index) =>
            <Button key={index} onClick={() => onDoAction(action)}>{action.label}</Button>
        )}
    </div>
);

export default connect(
    (state: RootState) => ({
        actions: getAvailableActions(state.gameState.activeConditions)
    }), {
        onDoAction: doAction
    }
)(GameActions);