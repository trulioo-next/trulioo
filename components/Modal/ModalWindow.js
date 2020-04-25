import React, { useState, forwardRef, useImperativeHandle } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from '@/components/Button';


const ModalWindow = forwardRef((props, ref) => {
  
    const [show, setShow] = useState(props.visible);

    const showModal = () => {
        setShow(true);
      };  

    useImperativeHandle(ref, () => {
        return {
          showModal: showModal
        };
      });    

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
});

export default ModalWindow;