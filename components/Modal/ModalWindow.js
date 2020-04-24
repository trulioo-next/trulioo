import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from '@/components/Button';

const ModalWindow = props => {

    const [show, setShow] = useState(props.visible);
    function handleClose() {
        setShow(false);
        if(props.cb) {
            props.cb();
        }
    }
    
    return (
        <div>
             
            <Modal show={show} onHide={ () => handleClose() } centered size="lg">
                <Modal.Header closeButton />
                <Modal.Body>
                   { props.content }

                   <Button
                      id="submit"
                      onClick={ (e) => handleClose(e) } >
                    Complete
                    </Button>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ModalWindow;