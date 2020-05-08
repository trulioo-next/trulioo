import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import Layout from '../../containers/Layout/Layout';
import Header from '../../components/Header/Header';
import Button from '@/components/Button';
import appActions from '../../stores/user/actions';
import appSelectors from '../../stores/user/selectors';
import Hero from '@/components/Hero';
import * as Yup from 'yup';
import routerPush from '../../helpers/routerPush';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import AdminPanel from '@/components/7rewards/Admin/AdminPanel';
import NeedHelp from '@/components/7rewards/NeedHelp';
import SevenRewards from '@/containers/SevenRewards';

import ModalWindow from '@/components/Modal';
import { useFormik } from 'formik';

import { ReCaptcha } from 'react-recaptcha-v3'
import { GOOGLE_RECAPTCHA_V3_KEY, verify } from '../../utils/recaptcha'
import FormData from '@/helpers/formData';

class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);

    this.submitForm = this.submitForm.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.modalCallBack = this.modalCallBack.bind(this);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      bMonth: '',
      bDay: '',
      bYear: '',
      cardNumber: '',
      phone: '',
      postal: '',
      valid: false,
      isLoading: false,
      loggedIn: false,
      modalVisible: false,
      facebookPayload: false,
      checkBox1:false,
      checkBox2:false,
      fieldErrors:{
        firstName:null,
        lastName:null,
        email:null,
        password:null,
        confirmPassword:null,
        bMonth:null,
        bDay: null,
        bYear: null,
        phone: null,
        postal: null,
        checkBox1:null,
        checkBox2:null
      }
    };
  }

  static async getInitialProps({ isServer, store }) {
    return {};
  }

  componentDidMount() {
    let isUserAuth = this.props.user ? this.props.user.auth : false;
    if (!this.props.user.error && isUserAuth) {
       routerPush('/7rewards');
    }

    // TODO: REMVOE THIS FORM HERE :
    // facebook signin  button render
    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');

    // PROD ID 1018851968129793
    // STAGING ID 219346039373151

    window.fbAsyncInit = () => {
      FB.init({
        appId: '1018851968129793',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v6.0',
      });

      FB.Event.subscribe('auth.statusChange', response => {
        if (response.authResponse) {
          this.checkLoginState();
        } else {
          console.log(
            '[FacebookLoginButton] User cancelled login or did not fully authorize.',
          );
        }
      });
    };
  }
  componentDidUpdate() {
    // Check if user authenticated
    //
    let isUserAuth = this.props.user ? this.props.user.auth : false;
    if (isUserAuth) {
      routerPush('/7rewards');
    }
  }

  checkLoginState() {
    FB.getLoginStatus(
      function(response) {
        this.statusChangeCallback(response);
      }.bind(this),
    );
  }

  login() {
    FB.login(this.checkLoginState(), {
      scope: 'public_profile,email',
      return_scopes: true,
    });
  }

  statusChangeCallback(response) {
    console.log('FACEBOOK RESPONSE , ', response);
    if (response.status === 'connected') {
      console.log('TOKEN  , ', response.authResponse.accessToken);
      this.logUserIn(response.authResponse.accessToken);
      // this.submitFacebookRequest(response.authResponse.accessToken,response);
    } else if (response.status === 'not_authorized') {
      console.log(
        '[FacebookLoginButton] Person is logged into Facebook but not your app',
      );
    } else {
      console.log('[FacebookLoginButton] Person is not logged into Facebook');
    }
  }

  logUserIn(access_token) {
    FB.api(
      '/me',
      { fields: 'first_name,last_name,email,birthday' },
      function(response) {
        console.log('[FacebookLoginButton] Successful login for: ', response);
        this.submitFacebookRequest(access_token, response);
      }.bind(this),
    );
  }

  // Update state value
  //
  onValueChange(e, type) {
    // console.log('ON VALUE CHANGED ', type, e.target.value)
    this.setState({ [type]: e.target.value });
  }

  //
  submitForm(e) {
    e.preventDefault();
    this.setState({ isLoading: true });

    let bday = this.state.bDay;

    const payload = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      email: this.state.email,
      bMonth: this.state.bMonth,
      bDay: bday,
      bYear: this.state.bYear,
      phone: this.state.phone,
      postal: this.state.postal,
      cardNumber: this.state.cardNumber,
    };
   
 
    const validateEmail = (email) =>  {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    let passwordValid = this.state.password !== this.state.confirmPassword || this.state.password === '' ? true : null;
    let emailValid = validateEmail(this.state.email) ? null : true;

    this.setState({
        fieldErrors:{
          firstName:this.state.firstName === '' ? true : null,
          lastName:this.state.lastName === '' ? true : null,
          email:emailValid,
          password:passwordValid,
          confirmPassword:passwordValid,
          phone: this.state.phone === '' ? true : null,
          postal: this.state.postal === '' ? true : null,
          checkBox1:this.state.checkBox1 === false ? true : null,
          checkBox2:this.state.checkBox2 === false ? true : null,
          bMonth: this.state.bMonth === '' ? true : null,
          bDay: this.state.bDay === '' ? true : null,
          bYear: this.state.bYear === '' ? true : null,
      }
    })

    let isValid = true;

    // if all is valid, pass alogn to the action : 
    if(this.state.firstName === '' || 
      this.state.lastName === '' ||
      emailValid ||
      passwordValid || 
      this.state.phone === '' ||
      this.state.postal === '' || 
      this.state.checkBox1 === false || 
      this.state.checkBox2 === false || 
      this.state.bMonth === '' ||
      this.state.bDay === '' || 
      this.state.bYear === ''
    ) {
      isValid = false;
    }

    // console.log('FIELDS', this.state.fieldErrors )
 
    if(isValid) {
     this.setState({loggedIn:true})
     this.props.userRegisterRequest(payload);
    }
    
  }

  submitFacebookRequest(access_token, response) {
    console.log('access_token ', access_token);
    console.log('rresponse ', response);
    let payload = {
      token: access_token,
      response: response,
    };

    this.props.userFacebookRegisterRequest(payload);
    this.setState({ facebookPayload: payload, modalVisible: true });
  }

  modalCallBack() {
    this.props.userFacebookRegisterRequest(this.state.facebookPayload);
  }

  facebookForm() {
    const phoneRegExp = /^\+?[0-9\-().\s]{10,15}$/gm;

    let schema = Yup.object().shape({
      first_name: Yup.string().required('This field is required'),
      last_name: Yup.string().required('This field is required'),
      email: Yup.string()
        .email()
        .required('This field is required'),
      phone: Yup.string()
        .required('This field is required')
        .matches(phoneRegExp, 'Phone number is not valid'),
      postal: Yup.string().required('This field is required'),
      password: Yup.string().required('Password is required'),
      password_confirm: Yup.string()
        .oneOf([Yup.ref('password'), null])
        .required('Password confirm is required'),
    });

    return (
      <form>
        <p>
          To complete your registration for 7Rewards, review and agree to the
          Terms & Conditions. Once you have done so, check the box below.
        </p>
        <Row>
          <Col className="text-center">
            <div className="input__group bottom--margin--20">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                value="I accept the Terms & Conditions."
              />
              <label className="show">I accept the Terms & Conditions.</label>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="">
            <div className="input__group bottom--margin--80">
              <input
                type="checkbox"
                id="agree"
                name="agree"
                value="I agree to receive news, promotions, and information from 7-Eleven®. You can unsubscribe at any time. Please read our Privacy Policy or Contact Us."
              />
              <label className="show">
                I agree to receive news, promotions, and information from
                7-Eleven®. You can unsubscribe at any time. Please read our
                Privacy Policy or Contact Us.
              </label>
            </div>
          </Col>
        </Row>
      </form>
    );
  }

  render() {

    // Form data 
    let { provinces, genders, months, days, years } = FormData()
     
    // 
    let fieldError = this.props.user && this.props.user.error && this.props.user.error.payload ? this.props.user.error.payload.field_errors : false

    let emailError = fieldError && fieldError.email ? fieldError.email[0] : false;
    let passwordError = fieldError && fieldError.password ? fieldError.password : false;

    // validation :
    // TODO: create a helper service to validate inline state
    //
    const fieldErrors =
      this.props.user && this.props.user.error
        ? this.props.user.error
        : false;
 
    const phoneError =
      fieldErrors &&
      fieldErrors.payload &&
      fieldErrors.payload.field_errors &&
      fieldErrors.payload.field_errors.mobile_number
        ? fieldErrors.payload.field_errors.mobile_number[0]
        : false;
    
    const firstNameError =
      fieldErrors &&
      fieldErrors.payload &&
      fieldErrors.payload.field_errors &&
      fieldErrors.payload.field_errors.first_name
        ? fieldErrors.payload.field_errors.first_name[0]
        : false;
    const lastNameError =
      fieldErrors &&
      fieldErrors.payload &&
      fieldErrors.payload.field_errors &&
      fieldErrors.payload.field_errors.last_name
        ? fieldErrors.payload.field_errors.last_name[0]
        : false;
    const birthdateError =
      fieldErrors &&
      fieldErrors.payload &&
      fieldErrors.payload.field_errors &&
      fieldErrors.payload.field_errors.birthdate
        ? fieldErrors.payload.field_errors.birthdate[0]
        : false;

    let formError =
      this.props.user &&
      this.props.user.passwordReset &&
      this.props.user.passwordReset.error &&
      this.props.user.passwordReset.error.payload &&
      this.props.user.passwordReset.error.payload.field_errors
        ? this.props.user.passwordReset.error.payload.field_errors.email
        : false;

    let formSuccess =
      this.props.user &&
      this.props.user.passwordReset &&
      this.props.user.passwordReset.success
        ? this.props.user.passwordReset.success
        : false;

    return (
      <Layout>
        <Header title="Register" />
        <ReCaptcha
            sitekey={GOOGLE_RECAPTCHA_V3_KEY}
            action='register'
            verifyCallback={ verify }
        />
        <SevenRewards>
          <section className="Section">
            <Container className="Section__container">
              
                <Row className="justify-content-center">
                  <Col xs="12" md="10">
                    <Row className="justify-content-center">
                      <Col xs="12" md="10" lg="8" className="col text-center">
                        <h1 className="h3">Become a 7Rewards Member</h1>
                        <p>
                          Rack up points for the things you buy every day. Plus,
                          when you register, you’ll get 1,000 Bonus Points which
                          you can redeem for a free Slurpee®, coffee or snack!
                        </p>
                        <img
                          className="mt-3 w-50 mx-auto"
                          onClick={e => this.login(e)}
                          src="/static/images/placeholders/facebook-btn.png"
                        />
                        <p className="my-4">OR</p>
                      </Col>
                    </Row>
                    <Row className="justify-content-center mb-md-5">
                      <Col xs="12" md="10" className="col">
                        <AdminPanel className="mt-n5 mb-5 mb-md-0">
                          <Container className="p-5">
                            <ModalWindow
                              content={this.facebookForm()}
                              visible={this.state.modalVisible}
                              cb={this.modalCallBack}
                            />
                            <Form>
                              <Form.Row>
                                <Col xs="12" md="6">
                                  <Form.Group controlId="first_name">
                                    <Form.Label className="small">
                                      First Name
                                    </Form.Label>
                                    <Form.Control
                                      size="lg"
                                      value={this.state.firstName}
                                      isInvalid={this.state.fieldErrors.firstName}
                                      onChange={e =>
                                        this.onValueChange(e, 'firstName')
                                      }
                                    />
                                  </Form.Group>
                                </Col>
                                <Col xs="12" md="6">
                                  <Form.Group controlId="last_name">
                                    <Form.Label className="small">Last Name</Form.Label>
                                    <Form.Control
                                      size="lg"
                                      value={this.state.lastName}
                                      isInvalid={this.state.fieldErrors.lastName}
                                      onChange={e =>
                                        this.onValueChange(e, 'lastName')
                                      }
                                    />
                                  </Form.Group>
                                </Col>
                              </Form.Row>
                              <Form.Group controlId="email">
                                <Form.Label className="small">
                                  Email Address
                                </Form.Label>
                                <Form.Control
                                  size="lg"
                                  as="input"
                                  type="email"
                                  value={this.state.email}
                                  isInvalid={this.state.fieldErrors.email}
                                  onChange={e => this.onValueChange(e, 'email')}
                                />
                                 { emailError && 
                                     <p><span className="field--error">{emailError}</span>  </p>
                                 }
                              </Form.Group>
                              <Form.Row>
                                <Col xs="12" md="6">
                                  <Form.Group controlId="password">
                                    <Form.Label className="small">
                                      Password
                                    </Form.Label>
                                    <Form.Control
                                      size="lg"
                                      as="input"
                                      type="password"
                                      value={this.state.password}
                                      isInvalid={this.state.fieldErrors.password}
                                      onChange={e =>
                                        this.onValueChange(e, 'password')
                                      }
                                    />

                                    { passwordError && 

                                      passwordError.map((error, index) => (
                                        <div key={index} className="field--error">
                                          {error}
                                        </div>
                                      ))

                                    }
                                  </Form.Group>
                                </Col>
                                <Col xs="12" md="6">
                                  <Form.Group controlId="password_confirm">
                                    <Form.Label className="small">
                                      Confirm Password
                                    </Form.Label>
                                    <Form.Control
                                      size="lg"
                                      as="input"
                                      type="password"
                                      isInvalid={this.state.fieldErrors.confirmPassword}
                                      value={this.state.confirmPassword}
                                      onChange={e =>
                                        this.onValueChange(e, 'confirmPassword')
                                      }
                                    />
                                  </Form.Group>
                                </Col>
                              </Form.Row>
                              <Form.Row>
                                <Col xs="12" md="6">
                                  <Form.Group controlId="phone">
                                    <Form.Label className="small">
                                      Mobile Number
                                    </Form.Label>
                                    <Form.Control
                                      size="lg"
                                      value={this.state.phone}
                                      isInvalid={this.state.fieldErrors.phone}
                                      onChange={e =>
                                        this.onValueChange(e, 'phone')
                                      }
                                    />
                                    { phoneError && 
                                      <p className="field--error">{phoneError}</p>
                                    }
                                  </Form.Group>
                                </Col>
                                <Col xs="12" md="6">
                                  <Form.Group controlId="postal">
                                    <Form.Label className="small">
                                      Postal Code
                                    </Form.Label>
                                    <Form.Control
                                      size="lg"
                                      value={this.state.postal}
                                      isInvalid={this.state.fieldErrors.postal}
                                      onChange={e =>
                                        this.onValueChange(e, 'postal')
                                      }
                                    />
                                  </Form.Group>
                                </Col>
                              </Form.Row>

                              <Form.Row>
                                <Col>
                                  <Form.Group controlId="edit-city">
                                    <Form.Label className="small">Month</Form.Label>
                                    <Form.Control
                                      size="lg"
                                      as="select"
                                      value={this.state.bMonth}
                                      isInvalid={this.state.fieldErrors.bMonth}
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
                                      isInvalid={this.state.fieldErrors.bDay}
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
                                      isInvalid={this.state.fieldErrors.bYear}
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
                              {birthdateError && 
                                <Form.Row>
                                   <p className="field--error">{birthdateError}</p>
                                </Form.Row>
                              }

                              <Form.Group controlId="card-number">
                                <Form.Label className="small">
                                  7Rewards Card Number (Optional)
                                </Form.Label>
                                <Form.Control
                                  size="lg"
                                  value={this.state.cardNumber}
                                  onChange={e =>
                                    this.onValueChange(e, 'cardNumber')
                                  }
                                />
                              </Form.Group>
                              <fieldset className="mt-5">
                                <Form.Group>
                                  <Form.Check id="terms">
                                    <Form.Check.Input isInvalid={this.state.fieldErrors.checkBox1} onChange={e =>
                                        this.onValueChange(e, 'checkBox1')
                                      } />
                                    <Form.Check.Label className="ml-3">
                                      I accept the{' '}
                                      <Link href="/terms-conditions">
                                        <a>
                                          <u>Terms &amp; Conditions</u>
                                        </a>
                                      </Link>
                                    </Form.Check.Label>
                                  </Form.Check>
                                </Form.Group>
                                <Form.Group>
                                  <Form.Check id="agree">
                                    <Form.Check.Input isInvalid={this.state.fieldErrors.checkBox2} onChange={e =>
                                        this.onValueChange(e, 'checkBox2')
                                      }/>
                                    <Form.Check.Label className="ml-3">
                                      I agree to receive news, promotions, and
                                      information from 7-Eleven®. You can
                                      unsubscribe at any time. Please read our{' '}
                                      <Link href="/privacy">
                                        <a>
                                          <u>Privacy Policy</u>
                                        </a>
                                      </Link>{' '}
                                      or{' '}
                                      <Link href="/contact-us">
                                        <a>
                                          <u>Contact Us</u>
                                        </a>
                                      </Link>
                                      .
                                    </Form.Check.Label>
                                  </Form.Check>
                                </Form.Group>
                              </fieldset>
                              <Button type="submit" className="mt-4" onClick={(e) => this.submitForm(e)}>
                                Register
                              </Button>
                            </Form>
                          </Container>
                        </AdminPanel>
                      </Col>
                    </Row>
                    <Row className="justify-content-center">
                      <Col xs="12" md="10" lg="8" className="col text-center">
                        <p>
                          <strong className="d-inline font-trasandina mr-2 text-success">
                            Need Help?
                          </strong>
                          <NeedHelp.AdminText />
                        </p>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              
            </Container>
          </section>
        </SevenRewards>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  user: appSelectors.userDataSelector(state),
});

const mapDispatchToProps = dispatch => ({
  userRegisterRequest: payload =>
    dispatch(appActions.reqUserRegisterAction(payload)),
  userFacebookRegisterRequest: payload =>
    dispatch(appActions.reqUserFacebookRegisterAction(payload)),
});

const RegisterScreen_ = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterScreen);

export default RegisterScreen_;
