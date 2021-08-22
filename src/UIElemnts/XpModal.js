import React from 'react';
import {Modal} from "react-bootstrap";

const XpModal = (props) => {
    return (
        <Modal
            show={props.show}
            onHide={props.handleClose}
            
            keyboard={false}
            className={props.className}
        >
            {props.children}
        </Modal>
    );
};

export default XpModal;
