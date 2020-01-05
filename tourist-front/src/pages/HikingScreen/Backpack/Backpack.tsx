import React, {useRef} from "react";
import {connect} from "react-redux";
import {RootState} from "redux/rootReducer";
import {Equip, getEquipments} from "model/game/equip/equip";
import {Card} from "react-bootstrap";
import "./Backpack.scss";
import EquipModal, {EquipModalInterface} from "pages/HikingScreen/Backpack/EquipModal";

interface BackpackProps {
    equipments: Equip[];
}

const Backpack: React.FC<BackpackProps> = ({equipments}) => {
    const equipModal = useRef<EquipModalInterface>(null);

    return (
        <div className="backpack">
            {equipments.map((equipment, index) =>
                <Card key={index} onClick={() => equipModal.current && equipModal.current.open(equipment)}>
                    <Card.Img src={equipment.imgPath}/>
                    <Card.Body>
                        <Card.Text>{equipment.label}</Card.Text>
                    </Card.Body>
                </Card>
            )}

            <EquipModal ref={equipModal}/>
        </div>
    );
};

export default connect((state: RootState) => ({
    equipments: getEquipments(state.gameState.equipment)
}))(Backpack);