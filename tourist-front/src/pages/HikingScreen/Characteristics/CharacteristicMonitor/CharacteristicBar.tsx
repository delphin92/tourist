import React from "react";
import './CharacteristicBar.scss'

interface CharacteristicBarProps {
    value: number;
    limit: number;
    max: number;
    color: string;
}

const CharacteristicBar: React.FC<CharacteristicBarProps> = ({value, limit, max, color}) => {
    const width = (value / max * 100) + '%';
    //TODO: limit

    return (
        <div className="characteristic-bar">
            <div style={{width, backgroundColor: color}}/>
        </div>
    );
};

export default CharacteristicBar;