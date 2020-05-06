import React from 'react';
import { connect } from 'react-redux';
import Layout from '../../containers/Layout/Layout';
import Header from '../../components/Header/Header';
import Button from '@/components/Button';
import appActions from '../../stores/user/actions';
import appSelectors from '../../stores/user/selectors';
import Hero from '@/components/Hero';
import Link from 'next/link';
import routerPush from '../../helpers/routerPush';
import * as Yup from 'yup';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import AdminPanel from '@/components/7rewards/Admin/AdminPanel';
import SevenRewards from '@/containers/SevenRewards';
import NeedHelp from '@/components/7rewards/NeedHelp';

class UserAuth extends React.Component {
  constructor(props) {
    super(props);

    this.submitForm = this.submitForm.bind(this);
    this.onValueChange = this.onValueChange.bind(this);

    this.state = {
      userName: '',
      password: '',
      valid: false,
      isLoading: false,
      loggedIn: false,
    };
  }

  static async getInitialProps({ query, store }) {
    let userData = store.getState();
    return { query, userData };
  }

  componentDidMount() {
    //  console.log('user STORE :: >>  ', this.props.store.getState() )

    let isUserAuth = this.props.user ? this.props.user.auth : false;
    if (!this.props.user.error && isUserAuth) {
      // this.setState({loggedIn:true})
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
    let isUserAuth = this.props.user ? this.props.user.auth : false;
    if (!this.props.user.error && isUserAuth) {
      // this.setState({loggedIn:true})
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
    if (response.status === 'connected') {
      this.logUserIn(response.authResponse.accessToken);
      // this.submitFacebookRequest(response.authResponse.accessToken);
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
         this.submitFacebookRequest(response.authResponse.accessToken);
      }.bind(this),
    );
  }

  //
  onValueChange(e, type) {
    if (type === 'user') {
      this.setState({ userName: e.target.value });
    }

    if (type === 'pass') {
      this.setState({ password: e.target.value });
    }
  }

  //
  submitForm(e) {
    e.preventDefault();
    this.setState({ isLoading: true });
    const payload = {
      userName: this.state.userName,
      password: this.state.password,
    };
    // this.setState({loggedIn:true})
    this.props.userAuthRequest(payload);
  }

  //
  submitFacebookRequest(access_token) {
    this.props.userFacebookAuthRequest(access_token);
  }

  render() {
    let error =
      this.props.user && this.props.user.error ? this.props.user.error : false;

    return (
      <Layout>
        <Header title="Sign In" />
        <SevenRewards>
          <section className="Section">
            <Container className="Section__container">
              {this.state.loggedIn ? (
                <Row>
                  <Col>
                    <h2>You are logged in.</h2>
                  </Col>
                </Row>
              ) : (
                <Row className="justify-content-center">
                  <Col xs="12" md="10" lg="8" className="col">
                    <Row className="justify-content-center mb-5">
                      <Col xs="12" md="10" className="col">
                        <p>
                          <strong>EARN</strong> points for every $1 you spend.{' '}
                          <strong>REDEEM</strong> points for{' '}
                          <strong>FREE</strong> food &amp; drink. Enjoy bonus
                          offers and get rewards even faster. And every 7th cup
                          still <strong>FREE</strong>!
                        </p>
                      </Col>
                    </Row>
                    <Row className="justify-content-center my-5">
                      <Col xs="12" md="6" className="col">
                        <AdminPanel className="mb-5 mb-md-0">
                          <Container className="p-5">
                            <Form>
                              <Row className="text-center">
                                <Col>
                                  <h2 className="SevenRewards__heading text-center">
                                    Sign In
                                  </h2>
                                  <p>
                                    If you’re an existing member, please sign in
                                    using your 7Rewards email address and
                                    password.
                                  </p>
                                  <img
                                    className="w-75 mx-auto"
                                    onClick={e => this.login(e)}
                                    src="/static/images/placeholders/facebook-btn.png"
                                  />
                                  <p className="my-4 small">OR</p>
                                </Col>
                              </Row>

                              <Form.Group controlId="user_name">
                                <Form.Label className="small">
                                  Email Address
                                </Form.Label>
                                <Form.Control
                                  size="lg"
                                  type="email"
                                  value={this.state.userName}
                                  onChange={e => this.onValueChange(e, 'user')}
                                  name="user_name"
                                />
                              </Form.Group>

                              <Form.Group controlId="password">
                                <Form.Label className="small">
                                  Password
                                </Form.Label>
                                <Form.Control
                                  size="lg"
                                  value={this.state.password}
                                  type="password"
                                  name="password"
                                  onChange={e => this.onValueChange(e, 'pass')}
                                />
                              </Form.Group>

                              {error && (
                                <Row>
                                  <Col>
                                    <p className="h5 my-4 text-danger text-center">
                                      {
                                        this.props.user.error.payload
                                          .error_description
                                      }
                                    </p>
                                  </Col>
                                </Row>
                              )}

                              <Row>
                                <Col className="text-center">
                                  <Button
                                    id="submit"
                                    onClick={e => this.submitForm(e)}
                                  >
                                    Login
                                  </Button>
                                  <Link href="/7rewards/forgotpassword">
                                    <a className="d-block mt-4">
                                      Forgot password?
                                    </a>
                                  </Link>
                                </Col>
                              </Row>
                            </Form>
                          </Container>
                        </AdminPanel>
                      </Col>
                      <Col xs="12" md="6" className="col">
                        <AdminPanel className="mb-5 mb-md-0 text-center">
                          <Container className="p-5">
                            <Row>
                              <Col>
                                <h3 className="SevenRewards__heading text-center">
                                  Join Now
                                </h3>
                                <p>
                                  Register today and start collecting 7Rewards
                                  Bonus Points to redeem for FREE rewards!
                                </p>
                                <Button href="/7rewards/register">
                                  Register
                                </Button>
                              </Col>
                            </Row>
                          </Container>
                        </AdminPanel>
                        <div className="mt-5">
                          <h3 className="h5 text-success">Need help?</h3>
                          <p>
                            <NeedHelp.AdminText />
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              )}
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
  userAuthRequest: payload => dispatch(appActions.reqUserAuthAction(payload)),
  userFacebookAuthRequest: payload =>
    dispatch(appActions.reqUserFacebookAuthAction(payload)),
});

const UserAuth_ = connect(mapStateToProps, mapDispatchToProps)(UserAuth);

export default UserAuth_;
