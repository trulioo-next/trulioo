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
    const [loaded, setLoaded] = useState(false);
    const [errorLoaded, setErrorLoaded] = useState(false);
    const [error, setError] = useState(false);
    const user = useSelector(state => userDataSelector(state));
    let balance = props.balance && props.balance > 0 ? props.balance : false;
 
    if(props.card && props.card.card_number && !loaded) {
        setCardNumber(props.card.card_number);
        setLoaded(true)
    }

    if(props.error && !errorLoaded) {

      if(!props.error) {
        setError(false)
        setErrorLoaded(true)
      }
    }
 
    const showModal = () => {
      setShow(true);
    };  
    
    //
    useImperativeHandle(ref, () => {
      return {
        showModal: showModal
      };
    });    
    
    //
    function handleClose() {
      setShow(false);
      if(props.cb) {
          props.cb();
      }
    }
    
    //
    function onValueChange (e, type) {
      setCardNumber(e.target.value );
    }
 
    // Check the card ID 
    const checkCard = () => {
      if(cardNumber !== '') {
        dispatch(reqCheckCardAction({ payload: cardNumber }));
      } else {

        if(props.error) {
            // 
        } else {
          setError("That gift card number does not appear to be valid.");
        }
      }
    } 
 
    return (
        <div className="CheckBalanceModal">
             
            <Modal show={show} onHide={ () => handleClose() } centered size="lg" className="modal__container">
                <Modal.Header closeButton />
                <Modal.Body className="center--text">
                  
                    <h2>{props.content.modal_title}</h2>
                    <p className="blue--text lg center">{props.content.modal_subtitle}</p>
                      
                      { balance && 
                        <div>
                          <h4> Card Balance: ${ balance } </h4>
                          <p>Try another Card.</p>
                        </div>
                      }
                    
                      <form>
                        <input value={cardNumber} placeholder="GIFT CARD NUMBER" type="number" id="card_number" onChange={e => onValueChange(e)}/>
                          { props.error && 
                           <p className="field__error">{props.error}</p>
                          }
                          { error && 
                           <p className="field__error">{error}</p>
                          }
                      </form>
                    
                    <div className="column__row">
                     <Button green className="Section__cta" onClick={checkCard}>
                       Check Your Balance
                     </Button>
                   </div>

                   <p className="sm--text" dangerouslySetInnerHTML={{ __html:props.content.modal_description}} />
                    
                   <div> 
                     <Button
                        id="submit">
                        <a href="https://stores.7-eleven.ca/" target="_blank">
                          Find a store
                        </a>
                      </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
});

export default CheckBalanceModal;