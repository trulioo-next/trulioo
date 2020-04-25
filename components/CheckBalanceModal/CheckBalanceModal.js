import React, { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import Modal from 'react-bootstrap/Modal';
import Button from '@/components/Button';

import { reqCheckCardAction } from '@/stores/user/actions';
import { userDataSelector } from '@/stores/user/selectors';
import CheckBalanceModalStyles from './CheckBalanceModal.scss';

const CheckBalanceModal = forwardRef((props, ref) => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(props.visible);
    const [cardNumber, setCardNumber] = useState('');
    const user = useSelector(state => userDataSelector(state));

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

    function onValueChange (e, type) {
      
      setCardNumber(e.target.value );
     
    }

    // Check the card ID 
    const checkCard = () => {
      dispatch(reqCheckCardAction({ payload: cardNumber }));
    } 
 
    return (
        <div>
             
            <Modal show={show} onHide={ () => handleClose() } centered size="lg">
                <Modal.Header closeButton />
                <Modal.Body className="center--text">
                  
                    <h2>{props.content.modal_title}</h2>
                    <p>{props.content.modal_subtitle}</p>

                    <form>
                      <input value={cardNumber} placeholder="GIFT CARD NUMBER" type="number" id="card_number" onChange={e => onValueChange(e)}/>
                      { user.cardBalance.error && 
                         <p className="field__error">{user.cardBalance.error.payload.field_errors.loyalty_id}</p>
                      }
                    </form>

                    <div className="column__row">
                     <Button className="Section__cta" onClick={checkCard}>
                       Check Your Balance
                     </Button>
                   </div>

                   <p dangerouslySetInnerHTML={{ __html:props.content.modal_description}} />
                    
                   <div> 
                     <Button
                        id="submit"
                        onClick={ (e) => handleClose(e) } >
                        Find a store
                      </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
});

export default CheckBalanceModal;