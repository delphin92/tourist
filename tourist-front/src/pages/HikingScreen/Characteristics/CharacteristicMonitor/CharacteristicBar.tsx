import React from "react";
import './CharacteristicBar.scss'
import {connect} from "react-redux";
import {Characteristic, CharacteristicType} from "model/game/characteristics/characteristics";
import {RootState} from "redux/rootReducer";

interface CharacteristicBarOwnProps {
    characteristicType: CharacteristicType;
    color: string;
}

interface CharacteristicBarProps extends CharacteristicBarOwnProps {
    characteristic: Characteristic;
}

const CharacteristicBar: React.FC<CharacteristicBarProps> = ({color, characteristic}) => {
    const {value, limit, max} = characteristic;
    const valueWidth = (value / max * 100) + '%';
    const limitWidth = limit ? ((limit / max * 100) + '%') : '100%';

    return (
        <div className="characteristic-bar">
            <div className="limit-bar" style={{width: limitWidth}}/>
            <div className="value-bar" style={{width: valueWidth, backgroundColor: color}}/>
        </div>
    );
};

export default connect((state: RootState, ownProps: CharacteristicBarOwnProps) => ({
    characteristic: state.gameState.characteristics[ownProps.characteristicType]
}))(CharacteristicBar);