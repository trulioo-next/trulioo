import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

const ModalWindow = props => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <button className="Button" onClick={handleShow}>
                Launch Modal
            </button>

            <Modal show={show} onHide={handleClose} centered size="lg">
                <Modal.Header closeButton />
                <Modal.Body>
                    Content goes here
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ModalWindow;