import React, {forwardRef, useImperativeHandle, useState} from "react";
import {Equip} from "model/game/equip/equip";
import {Button, Image, Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {useEquipment} from "redux/reducers/gameState";

interface EquipModalProps {
    onUseEquipment: (name: string) => void;
}

export interface EquipModalInterface {
    open: (equipment: Equip) => void;
}

const EquipModal: React.FC<EquipModalProps> = ({onUseEquipment}, ref) => {
    useImperativeHandle<EquipModalInterface, EquipModalInterface>(ref, () => ({
        open: equipment => {
            setEquipment(equipment);
            setShow(true);
        }
    }));

    const [equipment, setEquipment] = useState({} as Equip);
    const [show, setShow] = useState(false);
    const close = () => setShow(false);
    const use = () => {
        onUseEquipment(equipment.name);
        setShow(false);
    };

    return (
        <Modal show={show} onHide={close}>
            <Modal.Header><Modal.Title>{equipment.label}</Modal.Title></Modal.Header>
            <Modal.Body>
                <Image rounded className="w-100" src={equipment.imgPath}/>
                {equipment.description &&
                    <p>{equipment.description}</p>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={close}>
                    Закрыть
                </Button>
                <Button variant="primary" onClick={use}>
                    Использовать
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default connect(null, {onUseEquipment: useEquipment}, null, {forwardRef: true})(forwardRef(EquipModal));