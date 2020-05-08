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
      phoneLoaded:false
    };

    this.submitForm = this.submitForm.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
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

  // 
  componentDidUpdate() {
     
     if( !this.props.loading ) {
        
         // 1. Success Modal 
         if(this.state.formSubmit && !this.state.showSuccessModalLoaded && !this.state.closeSuccessModal) {
              
             let formErrors =  this.getFieldErrors();
             let message = 'SUCCESS!'
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
       
     }

  }

  submitForm(e) {
    e.preventDefault();
    let user = this.props.user && this.props.user.user ? this.props.user.user : false;
    let phone = user && user.phone_number ? user.phone_number : this.state.phone;
    let currentPhone = user && user.phone_number ? user.phone_number : false;

    if (this.state.phone === currentPhone) {
      phone = null;
    } else {
      phone = this.state.phone;
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
  verifyMobileNumber(e) {
    e.preventDefault();
    this.setState({validateNumberModal:true})
    let payload = { token: this.props.user.token, mobileNumber: this.state.phone }
    this.props.verifySmsRequest(payload)
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

  passwordReset() {
    let payload = {
      email: this.state.email,
    };

    this.props.passwordResetRequest(payload);
  }

  handleClose() {
      
    // Clear success modal   
    this.setState({ showSuccessModalLoaded:false, showSuccessModal:false, successMessage:'', closeSuccessModal:true, validateNumberModal:false, codeSet:false, formloaded:false})  
    
    // let payload = { clear: true }
    // this.props.verifySmsRequest(payload)
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

    let smsError = this.props.user && 
        this.props.user.sms && 
        this.props.user.sms.error && 
        this.props.user.sms.error.payload ? this.props.user.sms.error.payload.error_description : false
 
    return (
      <div className="p-5">
        <div className="d-flex w-100 align-items-end justify-content-between">
          <h2 className="h6 m-0">Profile</h2>
          <Button
            type="button"
            variant="dark"
            onClick={() => this.setState({ showModal: true })}
          >
            Edit
          </Button>

          

          <Modal
            show={this.state.validateNumberModal}
            onHide={() => this.handleClose()}
            centered
            size="sm"
          >
            <Modal.Header closeButton />
            <Modal.Body>
              
               <form className="form__test">
                <input
                   className="underlined__input"
                  id="sms_code"
                  type="text"
                  value={this.state.smscode}
                  placeholder="Enter Code Here"
                  onChange={e => this.updateCode(e)}
                />
              </form>

              <div className="margin--top"><Button
                green
                className="Section__cta"
                onClick={(e) =>  this.verifySMSWithCode(e) }
              >
                Verify SMS
              </Button></div>
            </Modal.Body>
          </Modal>
          

          <Modal
            show={this.state.showSuccessModal}
            onHide={() => this.handleClose()}
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
            show={this.state.showModal}
            onHide={() => this.setState({ showModal: false })}
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
                   <div className="verify__button"><Button
                    green
                    type="button"
                    className="-fixed--height"
                    disabled={this.state.verifyDisabled}
                    onClick={(e) => this.verifyMobileNumber(e)}
                  >
                    <span className="white--text">Verify</span>
                  </Button></div>
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
                    onClick={() => this.passwordReset()}
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
});

const mapDispatchToProps = dispatch => ({
  userUpdateRequest: payload => dispatch(appActions.reqUpdateAction(payload)),
  passwordResetRequest: payload => dispatch(appActions.reqPasswordResetAction(payload)),
  verifySmsRequest: payload => dispatch(appActions.reqSMSAction(payload)),
});

const UserProfile_ = connect(mapStateToProps, mapDispatchToProps)(UserProfile);

export default UserProfile_;
