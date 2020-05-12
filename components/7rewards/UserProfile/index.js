import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import appActions from '@/stores/user/actions';
import appSelectors from '@/stores/user/selectors';
import loadSelectors from '@/stores/app/selectors';
import CheckMark from '@/static/images/modal-check.svg';
import FormData from '@/helpers/formData';
import routerPush from '@/helpers/routerPush';

export class UserProfile extends Component {
  constructor(props) {
    super(props);

    let user =
      this.props.user && this.props.user.user ? this.props.user.user : false;
    let gender = user.gender ? user.gender : 'Prefer not to say';
    let address1 = user && user.address_line_1 ? user.address_line_1 : '';
    let address2 = user && user.address_line_2 ? user.address_line_2 : '';
    let province = user && user.state_or_province ? user.state_or_province : '';
    let city = user && user.city ? user.city : '';
    let phone = user && user.phone_number ? user.phone_number : '';
    let postal = user && user.postal_code ? user.postal_code : '';
    let email = user && user.email ? user.email : '';
    let firstName = user && user.first_name ? user.first_name : '';
    let lastName = user && user.last_name ? user.last_name : '';
    let month = user && user.birthdate ? user.birthdate.split('-')[1] : '';
    let day = user && user.birthdate ? user.birthdate.split('-')[2] : '';
    let year = user && user.birthdate ? user.birthdate.split('-')[0] : '';

    this.state = {
      user: user,
      showModal: false,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      postal: postal,
      address1: address1,
      address2: address2,
      province: province,
      city: city,
      gender: gender,
      bMonth: month,
      bDay: day,
      bYear: year,
      token: this.props.user.token,
      valid: false,
      isLoading: false,
      showSuccessModal: false,
      showSuccessModalLoaded: false,
      successMessage:'',
      closeSuccessModal:false,
      loaded: false,
      formloaded:false,
      formSubmit:false,
      validateNumberModal: false,
      smscode:'',
      codeSet:false,
      verifyDisabled:true,
      phoneLoaded:false,
      showEmailModal:false,
      showSMSModal:false,
      verifiedLoaded:false,
      phoneUpdated:false,
      phoneLoaded:false
    };

    this.submitForm = this.submitForm.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.modalClose = this.modalClose.bind(this)
    this.successClose = this.successClose.bind(this)
    this.handleVerifyToggle = this.handleVerifyToggle.bind(this)
    this.handleVerifyToggleOff = this.handleVerifyToggleOff.bind(this)
    this.resendSms = this.resendSms.bind(this)
    this.closeEmailModal = this.closeEmailModal.bind(this)
    this.handleEmailClose = this.handleEmailClose.bind(this)
    this.updateCode = this.updateCode.bind(this)
    this.getFieldErrors = this.getFieldErrors.bind(this)
    this.getPasswordResetErrors = this.getPasswordResetErrors.bind(this)
    this.verifySMSWithCode = this.verifySMSWithCode.bind(this)
    this.openPasswordReset = this.openPasswordReset.bind(this)
    this.passwordReset = this.passwordReset.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  getFieldErrors() {

    let formErrors = this.props.user && 
                    this.props.user.fieldErrors && 
                    this.props.user.fieldErrors.error && 
                    this.props.user.fieldErrors.error.payload && 
                    this.props.user.fieldErrors.error.payload.field_errors 
                    ? this.props.user.fieldErrors.error.payload.field_errors 
                    : false

    return  formErrors                        

  }

  getPasswordResetErrors() {

    let formErrors = this.props.user && 
                    this.props.user.passwordReset && 
                    this.props.user.passwordReset.error && 
                    this.props.user.passwordReset.error.payload && 
                    this.props.user.passwordReset.error.payload.field_errors 
                    ? this.props.user.passwordReset.error.payload.field_errors 
                    : false

    return  formErrors                        

  }

  // 
  componentDidUpdate() {



     
     if( !this.props.loading ) {
        
         // 1. Success Modal 
         if(this.state.formSubmit && !this.state.showSuccessModalLoaded && !this.state.closeSuccessModal) {
              
             let formErrors =  this.getFieldErrors();
             let message = 'YOUR PROFILE HAS BEEN UPDATED'
             if(formErrors) {
                if(formErrors.birthdate) {
                  message = formErrors.birthdate[0]
                }
                if(formErrors.mobile_number) {
                  message = formErrors.mobile_number[0]
                }
             }
              
             this.setState({ showSuccessModalLoaded:true, showSuccessModal:true, successMessage:message })
         }

        // 2. Verify Phone Modal
        if(this.state.codeSet && !this.state.formloaded ) {
          this.setState({ showSuccessModalLoaded:true, showSuccessModal:true, successMessage:'SUCCESS!', formloaded:true })
        }

        // 3. Is phone verified 
        if(this.props.user && this.props.user.user && this.props.user.user.mobile_number && !this.state.phoneLoaded ) {
          this.setState({phoneLoaded:true,verifyDisabled:false})
        }
        
        // 4. setup sms modal
        let smsError = 
          this.props.user &&
          this.props.user && 
          this.props.user.sms &&
          this.props.user.sms.error &&
          this.props.user.sms.error.payload &&
          this.props.user.sms.error.payload.error_description 
          ? this.props.user.sms.error.payload.error_description
          : false

        let isVerified = 
          this.props.user && 
          this.props.user.user &&
          this.props.user.user.is_sms_verified 
          ? this.props.user.user.is_sms_verified
          : false    


        if(smsError && !this.state.errorLoaded  ) {
          this.setState({errorLoaded:true,showSMSModal:true})
          this.props.unValidateSMSAction();
        }  
        
        if(!this.props.smsValid && !this.state.smsLoaded && ( this.props.user && this.props.user.auth ) ) {
           this.setState({smsLoaded:true});
          setTimeout(() => {
            this.setState({showSMSModal:true });
          }, 3000)
        } 

        if( isVerified && !this.state.verifiedLoaded) {
          this.props.unValidateSMSAction();
          this.setState({showSMSModal:false,verifiedLoaded:true})
          // this.props.verifySmsRequest({ clear: true })
        } 
 
     }

  }

  submitForm(e) {
    e.preventDefault();
    let user = this.props.user && this.props.user.user ? this.props.user.user : false;
    let phone = user && user.phone_number ? user.phone_number : this.state.phone;
    let currentPhone = user && user.phone_number ? user.phone_number : false;

    if (this.state.phone === currentPhone) {
      phone = null;
      this.setState({phoneUpdated:false})
    } else {
      phone = this.state.phone;
      this.setState({phoneUpdated:true})
    }

    let payload = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phone: phone,
      postal: this.state.postal,
      address1: this.state.address1,
      address2: this.state.address2,
      province: this.state.province,
      city: this.state.city,
      bMonth: this.state.bMonth,
      bDay: this.state.bDay,
      bYear: this.state.bYear,
      gender: this.state.gender,
      token: this.state.token,
    };
    this.props.userUpdateRequest(payload);
    this.setState({formSubmit:true,closeSuccessModal:false})
  }

  //
  verifySMSWithCode(e) {
    e.preventDefault()
    this.setState({validateNumberModal:false, codeSet:true})
    let payload = { token: this.props.user.token, mobileNumber: this.state.phone, code: this.state.smscode  }
    this.props.verifySmsRequest(payload)
  }

  // Update state value
  //
  onValueChange(e, type) {
    this.setState({ [type]: e.target.value });
  }
  
  openPasswordReset(e) {
    e.preventDefault();
    this.setState({showEmailModal:true, showModal:false})
  }
  passwordReset(e) {

    e.preventDefault();

    // routerPush('/7rewards/forgotpassword');
    let payload = {
      email: this.state.email,
    };
    this.props.passwordResetRequest(payload);
  }

  handleClose(e) {
    if(e) {
    e.preventDefault();
    }
    let user = this.props.user && this.props.user.user ? this.props.user.user : false;
    let phone = user && user.phone_number ? user.phone_number : this.state.phone;
    let currentPhone = user && user.phone_number ? user.phone_number : false;
 
    if (this.state.phone === currentPhone) {
      // kill modal 
      this.props.validateSMSAction()
      this.setState({showSMSModal:false, showSuccessModalLoaded:false, showSuccessModal:false, successMessage:'', closeSuccessModal:true, validateNumberModal:false, codeSet:false, formloaded:false, showModal:false, phoneUpdated:false})  
    } else {
       this.props.unValidateSMSAction();
      this.setState({ showSMSModal:true, phoneUpdated:false, phoneLoaded:true, showModal:false, showSuccessModal:false})
    }
       
  }

  successClose() {
      this.setState({  showSuccessModal:false })
  }

  modalClose() {
    this.setState({showSMSModal:false});
  }

  handleVerifyToggle(e) {
     e.preventDefault();
     this.setState({verifyToggle:true})
  }

  handleVerifyToggleOff(e) {
     e.preventDefault();
     this.setState({verifyToggle:false})
  }


  resendSms(e) {
    e.preventDefault();
    this.setState({verifyToggle:false});
    let phone = 
      this.props.user && 
      this.props.user.user &&
      this.props.user.user.mobile_number 
      ? this.props.user.user.mobile_number
      : false;

      if(phone) {
        let payload = { token: this.props.user.token, mobileNumber: phone  }
        this.props.verifySmsRequest(payload)
      }
  }

  closeEmailModal(e) {
    e.preventDefault();
    this.setState({showEmailModal:false})
  }
  handleEmailClose() {
    
    let isSuccess =
      this.props.user && 
      this.props.user.passwordReset && 
      this.props.user.passwordReset.success
      ? true
      : false
      
      // Rehydrate ! 
      if(isSuccess) {
         let payload = {
          clear: true,
        };
        this.props.passwordResetRequest(payload);
      }


    this.setState({showEmailModal:false})
  }

  updateCode(e) {
    this.setState({smscode:e.target.value})
  }
 
  render() {
    //
    // Form data 
    let { provinces,genders,months,days,years } = FormData()
     
    // validation :
    // TODO: create a helper service to validate inline state
    //
    const fieldErrors = this.getFieldErrors();
 
    const phoneError =
      fieldErrors &&
      fieldErrors.mobile_number
        ? fieldErrors.mobile_number[0]
        : false;
    const firstNameError =
      fieldErrors &&
      fieldErrors.first_name
        ? fieldErrors.first_name[0]
        : false;
    const lastNameError =
      fieldErrors &&
      fieldErrors.last_name
        ? fieldErrors.last_name[0]
        : false;
    const birthdateError =
      fieldErrors &&
      fieldErrors.birthdate
        ? fieldErrors.birthdate[0]
        : false;

    let emailError =
      fieldErrors &&
      fieldErrors.email 
        ? fieldErrors.email[0]
        : false;

   let passwordFieldErrors = this.getPasswordResetErrors()     

   let passwordResetError =
      passwordFieldErrors &&
      passwordFieldErrors.email 
        ? passwordFieldErrors.email[0]
        : false;     

    let passwordResetSuccess =
      this.props.user && 
      this.props.user.passwordReset && 
      this.props.user.passwordReset.success
      ? true
      : false


    let smsError = 
      this.props.user &&
      this.props.user && 
      this.props.user.sms &&
      this.props.user.sms.error &&
      this.props.user.sms.error.payload &&
      this.props.user.sms.error.payload.error_description 
      ? this.props.user.sms.error.payload.error_description
      : false

    let smsSuccess = 
      this.props.user &&
      this.props.user.sms &&
      this.props.user.sms.success
      ? true
      : false  

    let userPhone = 
      this.props.user && 
      this.props.user.user &&
      this.props.user.user.mobile_number 
      ? this.props.user.user.mobile_number
      : false

    let isVerified = 
      this.props.user && 
      this.props.user.user &&
      this.props.user.user.is_sms_verified 
      ? this.props.user.user.is_sms_verified
      : false  
 
    if(userPhone) {
     let n = userPhone.toString()
     userPhone = n.replace(/.(?=.{4})/g, '');
    }  
 
    return (
      <div className="p-5">
        <div className="d-flex w-100 align-items-end justify-content-between">
          <h2 className="h6 m-0">Profile</h2>
          <Button
            type="button"
            variant="dark"
            className="bt--md"
            onClick={() => this.setState({ showModal: true })}
          >
            EDIT
          </Button>
  
          <Modal
             
            show={this.state.showSMSModal}
            onHide={this.modalClose}
            center
            aria-labelledby="contained-modal-title-vcenter"
            animation={false}
            size="md"
          >
            <Modal.Header closeButton />
            <Modal.Body>
              { !this.state.verifyToggle &&  
                <div className="center--text">
                  <h2 className="SevenRewards__heading text-center">Let's Verify Your Mobile Phone</h2>
                  <p>Account verification required for new members to receive welcome offer.</p>
                  <h6>{this.state.modalMessage}</h6>

                  <form>
                    <input
                      className="verify--input"
                      id="sms_code"
                      type="text"
                      value={this.state.smscode}
                      placeholder="Verification PIN"
                      onChange={e => this.updateCode(e)}
                    />
                  </form>
                  { smsError && 
                    <p className="field--error">{smsError}</p>
                  }

                 <button
                  green="true" className="verify--button" 
                  onClick={(e) =>  this.verifySMSWithCode(e) }
                >
                  Verify
                </button> 
                <div className="close--button">
                 <a href="/" onClick={(e) => this.handleClose(e)}>Cancel</a>
                </div>
                
                <div className="more--options">
                 <a href="/" onClick={(e) => this.handleVerifyToggle(e)}>Click Here</a><span> for more options</span>
                </div>  
              
                </div>
              }

              { this.state.verifyToggle && 
                  <div className="inner__modal__page">
                     <h2 className="SevenRewards__heading text-center">Lets Verify Your Mobile Phone</h2>  
                     <div className="sms__toggle__header">
                        <div>Verify (***)***-{ userPhone }</div>
                        <div><a href="/" onClick={(e) => this.resendSms(e)}>Resend</a></div>
                     </div>
                     <div>
                      <p>
                        Didn't receive your 6 digit PIN? No problem, click the resend and we will send you a new unique PIN to verify your mobile phone.
                      </p>
                      <p>
                        Help? <a href="https://survey.medallia.com/?711-gr" target="_blank">Contact Support</a>
                      </p>
                      <p>
                       If you are having issues verifying your mobile phone, <Link href="/contact-us"><a><u>Contact Us</u></a></Link> <a href="https://policies.google.com/privacy" target="_blank">support</a>  and we will look into it for you.
                      </p>
                     </div>

                     <div>
                      <button
                        green="true" className="verify--button" 
                        onClick={(e) =>  this.handleVerifyToggleOff(e) }
                      >
                        Back
                      </button> 

                     </div>

                  </div>
              }
            </Modal.Body>
          </Modal>

 
          <Modal
            show={this.state.showSuccessModal}
            onHide={this.successClose}
            centered
            size="sm"
          >
            <Modal.Header closeButton />
            <Modal.Body>
              <div className="check__mark">
                <CheckMark />
              </div>
              <div className="center--text">
                <h5>{this.state.successMessage}</h5>
              </div>
            </Modal.Body>
          </Modal>

          <Modal
            className="modal__rounded"
            show={this.state.showEmailModal}
            onHide={this.handleEmailClose}
            centered
            size="md"
          >
            <Modal.Header closeButton />
            <Modal.Body>
              { !passwordResetSuccess && 
              <div>
                <h2 className="SevenRewards__heading text-center">
                  Forgot your password?
                </h2>
                <div>
                  <p className="center--text">
                    Please enter the email adress that was used to register your account.
                    If the email you provide is valid, you will receive a link to reset your password shortly.
                  </p>

                  <Form>
                    <Form.Row>
                      <Col>
                        <Form.Group controlId="edit-email">
                          <Form.Label className="left--align">Email</Form.Label>
                          <Form.Control
                            size="lg"  
                            value={this.state.email}
                            onChange={e => this.onValueChange(e, 'email')}
                          />
                        </Form.Group>
                        { passwordResetError && 
                          <p className="field--error">{passwordResetError}</p>
                        }
                      </Col>
                      </Form.Row>
                      <div className="center--text">
                        <button type="submit" className="Button mt-4" onClick={(e) => this.passwordReset(e) }>
                          Update
                        </button>
                        <div className="margin--top">
                          <a href="/" onClick={ (e) => this.closeEmailModal(e) }>Cancel</a>
                        </div>
                      </div>
                   </Form> 
                </div>
              </div>
              }

              { passwordResetSuccess &&

                <div>
                  <div className="check__mark">
                    <CheckMark />
                  </div>
                  <div className="center--text">
                    <h2 className="SevenRewards__heading text-center">
                      Check your inbox
                    </h2>
                    <p>We have sent you an email with further instructions on resetting your password. You should receive it momentarily.</p>
                  </div>
                </div>
              }
            </Modal.Body>
          </Modal>


          <Modal
            show={this.state.showModal}
            onHide={ this.handleClose }
          >
            <Modal.Header closeButton />
            <Modal.Body>
              <Form onSubmit={this.submitForm}>
                <Form.Row>
                  <Col>
                    <Form.Group controlId="edit-first-name">
                      <Form.Label className="small">First Name</Form.Label>
                      <Form.Control
                        size="lg"
                        isInvalid={firstNameError}
                        value={this.state.firstName}
                        onChange={e => this.onValueChange(e, 'firstName')}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="edit-last-name">
                      <Form.Label className="small">
                        Last Name (Optional)
                      </Form.Label>
                      <Form.Control
                        size="lg"
                        isInvalid={lastNameError}
                        value={this.state.lastName}
                        onChange={e => this.onValueChange(e, 'lastName')}
                      />
                    </Form.Group>
                  </Col>
                </Form.Row>
                <Form.Group controlId="edit-email">
                  <Form.Label className="small">Email Address</Form.Label>
                  <Form.Control
                    size="lg"
                    as="input"
                    type="email"
                    value={this.state.email}
                    onChange={e => this.onValueChange(e, 'email')}
                  />
                </Form.Group>
                <Form.Group controlId="edit-mobile-number">
                  <Form.Label className="small">Mobile Number</Form.Label>
                    
                  <Form.Control
                    size="lg"
                    as="input"
                    type="tel"
                    isInvalid={phoneError}
                    value={this.state.phone}
                    onChange={e => this.onValueChange(e, 'phone')}
                  />
                  { smsError && 
                    <p className="field--error sm">{smsError}</p>
                  }
                  { phoneError && 

                    <p className="field--error sm">{phoneError}</p>

                  }
                </Form.Group>
                <Form.Row>
                  <Col>
                    <Form.Group controlId="edit-city">
                      <Form.Label className="small">Month</Form.Label>
                      <Form.Control
                        size="lg"
                        as="select"
                        value={this.state.bMonth}
                        isInvalid={birthdateError}
                        onChange={e => this.onValueChange(e, 'bMonth')}
                      >
                        {months.map((month, index) => (
                          <option key={index} value={month.value}>
                            {month.name}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="edit-province">
                      <Form.Label className="small">Day</Form.Label>
                      <Form.Control
                        size="lg"
                        as="select"
                        value={this.state.bDay}
                        isInvalid={birthdateError}
                        onChange={e => this.onValueChange(e, 'bDay')}
                      >
                        {days.map((day, index) => (
                          <option key={index} value={day.value}>
                            {day.name}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group controlId="edit-province">
                      <Form.Label className="small">Year</Form.Label>
                      <Form.Control
                        size="lg"
                        as="select"
                        isInvalid={birthdateError}
                        value={this.state.bYear}
                        onChange={e => this.onValueChange(e, 'bYear')}
                      >
                        {years.map((year, index) => (
                          <option key={index} value={year.value}>
                            {year.name}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Form.Row>
                <Form.Group>
                  <span className="d-block small mb-2">Password</span>
                  <Button
                    variant="dark"
                    type="button"
                    onClick={(e) => this.openPasswordReset(e)}
                  >
                    Change Password
                  </Button>
                  {emailError && <p>{emailError}</p>}
                </Form.Group>
                <Form.Group controlId="edit-address-line-1">
                  <Form.Label className="small">
                    Address Line 1 (Optional)
                  </Form.Label>
                  <Form.Control
                    size="lg"
                    value={this.state.address1}
                    onChange={e => this.onValueChange(e, 'address1')}
                  />
                </Form.Group>
                <Form.Group controlId="edit-address-line-2">
                  <Form.Label className="small">
                    Address Line 2 (Optional)
                  </Form.Label>
                  <Form.Control
                    size="lg"
                    value={this.state.address2}
                    onChange={e => this.onValueChange(e, 'address2')}
                  />
                </Form.Group>
                <Form.Row>
                  <Col>
                    <Form.Group controlId="edit-city">
                      <Form.Label className="small">City (Optional)</Form.Label>
                      <Form.Control
                        size="lg"
                        value={this.state.city}
                        onChange={e => this.onValueChange(e, 'city')}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="edit-province">
                      <Form.Label className="small">
                        Province (Optional)
                      </Form.Label>
                      <Form.Control
                        size="lg"
                        as="select"
                        value={this.state.province}
                        onChange={e => this.onValueChange(e, 'province')}
                      >
                        {provinces.map((province, index) => (
                          <option key={index} value={province.value}>
                            {province.name}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Form.Row>
                <Form.Group controlId="edit-postal-code">
                  <Form.Label className="small">Postal Code</Form.Label>
                  <Form.Control
                    size="lg"
                    value={this.state.postal}
                    onChange={e => this.onValueChange(e, 'postal')}
                  />
                </Form.Group>
                <Form.Group controlId="edit-gender">
                  <Form.Label className="small">Gender</Form.Label>
                  <Form.Control
                    size="lg"
                    as="select"
                    value={this.state.gender}
                    onChange={e => this.onValueChange(e, 'gender')}
                  >
                    {genders.map((gender, index) => (
                      <option key={index} value={gender.value}>
                        {gender.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <button type="submit" className="Button mt-4">
                  Update
                </button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
        <hr />
        {this.props.user && (
          <div className="mb-4">
            <span className="d-block py-2 small">Name</span>
            <span className="d-block">
              {this.props.user.user.first_name} {this.props.user.user.last_name}
            </span>
          </div>
        )}
        <div className="mb-4">
          <span className="d-block py-2 small">Account ID</span>
          <span className="d-block">{this.props.user.user.username}</span>
        </div>
        {this.props.user && (
          <div className="mb-4">
            <span className="d-block py-2 small">Email Address</span>
            <span className="d-block">{this.props.user.user.email}</span>
          </div>
        )}
        {this.props.user && (
          <div className="mb-4">
            <span className="d-block py-2 small">Birthdate</span>
            <span className="d-block">{this.props.user.user.birthdate}</span>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: appSelectors.userDataSelector(state),
  loading: loadSelectors.selectIsLoading(state),
  token: appSelectors.userTokenSelector(state),
  smsValid:appSelectors.smsValidatedSelector(state)
});

const mapDispatchToProps = dispatch => ({
  userUpdateRequest: payload => dispatch(appActions.reqUpdateAction(payload)),
  passwordResetRequest: payload => dispatch(appActions.reqPasswordResetAction(payload)),
  verifySmsRequest: payload => dispatch(appActions.reqSMSAction(payload)),
  validateSMSAction: payload => dispatch(appActions.validateSMSAction(payload)),
  unValidateSMSAction: payload => dispatch(appActions.unValidateSMSAction(payload)),
});

const UserProfile_ = connect(mapStateToProps, mapDispatchToProps)(UserProfile);

export default UserProfile_;
