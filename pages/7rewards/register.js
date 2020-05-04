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

import SevenRewardsLogo from '@/static/images/7rewards/7-rewards-logo.svg';

import ModalWindow from '@/components/Modal';
import { useFormik } from 'formik';

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
    };
  }

  static async getInitialProps({ isServer, store }) {
    return {};
  }

  componentDidMount() {
    let isUserAuth = this.props.user ? this.props.user.auth : false;
    if (!this.props.user.error && isUserAuth) {
      // routerPush('/account');
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
    if (!this.props.user.error && isUserAuth) {
      // routerPush('/7rewards/register');
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
    const payload = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      email: this.state.email,
      bMonth: this.state.bMonth,
      bDay: this.state.bDay,
      bYear: this.state.bYear,
      phone: this.state.phone,
      postal: this.state.postal,
      cardNumber: this.state.cardNumber,
    };

    // console.log('REGISTER USER ', payload )
    // this.setState({loggedIn:true})
    this.props.userRegisterRequest(payload);
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
    let provinces = [
      { name: '', value: '' },
      { name: 'Alberta', value: 'AB' },
      { name: 'British Columbia', value: 'BC' },
      { name: 'Manitoba', value: 'MB' },
      { name: 'New Brunswick', value: 'NB' },
      { name: 'Newfoundland & Labrador', value: 'NL' },
      { name: 'Northwest Territories', value: 'NT' },
      { name: 'Nova Scotia', value: 'NS' },
      { name: 'Nunavut', value: 'NU' },
      { name: 'Ontario', value: 'ON' },
      { name: 'Prince Edward Island', value: 'PE' },
      { name: 'Québec', value: 'QC' },
      { name: 'Saskatchewan', value: 'SK' },
      { name: 'Yukon', value: 'YT' },
    ];

    let genders = [
      { name: 'Prefer not to say', value: '' },
      { name: 'Male', value: 'Male' },
      { name: 'Female', value: 'Female' },
    ];

    return (
      <Layout>
        <Header title="Register" />
        {this.state.loggedIn ? (
          <Container>
            <Row>
              <Col>
                <h2>You are logged in.</h2>
              </Col>
            </Row>
          </Container>
        ) : (
          <Container className="my-md-5 px-5 px-md-4">
            <Row className="justify-content-center">
              <Col xs="12" md="10">
                <Row className="justify-content-center my-5">
                  <Col xs="6" md="3">
                    <SevenRewardsLogo />
                  </Col>
                </Row>
                <Row className="justify-content-center mt-5 mb-2 pt-lg-5">
                  <Col xs="12" md="10" lg="8" className="text-center">
                    <h1 className="h3">Become a 7Rewards Member</h1>
                    <p>
                      Rack up points for the things you buy every day. Plus,
                      when you register, you’ll get 1,000 Bonus Points which you
                      can redeem for a free Slurpee®, coffee or snack!
                    </p>
                    <img
                      className="mt-3 w-50 mx-auto"
                      onClick={e => this.login(e)}
                      src="/static/images/placeholders/facebook-btn.png"
                    />
                    <p className="my-4 small">OR</p>
                  </Col>
                </Row>
                <Row className="justify-content-center mt-2 mb-5 mx-n5">
                  <Col xs="12" md="10" className="px-5">
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
                                  onChange={e =>
                                    this.onValueChange(e, 'firstName')
                                  }
                                />
                              </Form.Group>
                            </Col>
                            <Col xs="12" md="6">
                              <Form.Group controlId="last_name">
                                <Form.Label className="small">
                                  Last Name
                                </Form.Label>
                                <Form.Control
                                  size="lg"
                                  value={this.state.lastName}
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
                              onChange={e => this.onValueChange(e, 'email')}
                            />
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
                                  onChange={e =>
                                    this.onValueChange(e, 'password')
                                  }
                                />
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
                                  onChange={e => this.onValueChange(e, 'phone')}
                                />
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
                                  onChange={e =>
                                    this.onValueChange(e, 'postal')
                                  }
                                />
                              </Form.Group>
                            </Col>
                          </Form.Row>
                          <Form.Group controlId="card-number">
                            <Form.Label className="small">
                              7Rewards Card Number
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
                                <Form.Check.Input />
                                <Form.Check.Label className="ml-3">
                                  I accept the{' '}
                                  <Link href="/terms-conditions">
                                    <a>Terms &amp; Conditions</a>
                                  </Link>
                                </Form.Check.Label>
                              </Form.Check>
                            </Form.Group>
                            <Form.Group>
                              <Form.Check id="agree">
                                <Form.Check.Input />
                                <Form.Check.Label className="ml-3">
                                  I agree to receive news, promotions, and
                                  information from 7-Eleven®. You can
                                  unsubscribe at any time. Please read our{' '}
                                  <Link href="/privacy">
                                    <a>Privacy Policy</a>
                                  </Link>{' '}
                                  or{' '}
                                  <Link href="/contact-us">
                                    <a>Contact Us</a>
                                  </Link>
                                  .
                                </Form.Check.Label>
                              </Form.Check>
                            </Form.Group>
                          </fieldset>
                          <Button type="submit" className="mt-4">
                            Register
                          </Button>
                        </Form>
                      </Container>
                    </AdminPanel>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        )}
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
