import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import Layout from '../../containers/Layout/Layout';
import Header from '../../components/Header/Header';
import Button from '@/components/Button';
import appActions from '../../stores/user/actions';
import appSelectors from '../../stores/user/selectors';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import SevenRewards from '@/containers/SevenRewards';
import AdminPanel from '@/components/7rewards/Admin/AdminPanel';
import NeedHelp from '@/components/7rewards/NeedHelp';

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);

    this.submitForm = this.submitForm.bind(this);
    this.onValueChange = this.onValueChange.bind(this);

    this.state = {
      email: '',
      valid: false,
      isLoading: false,
      loggedIn: false,
    };
  }

  static async getInitialProps({ isServer, store }) {
    return {};
  }

  componentDidMount() {
    let isUserAuth = this.props.user.auth;
    if (!isUserAuth.error && isUserAuth) {
      this.setState({ loggedIn: true });
    }
  }
  componentDidUpdate() {}

  //
  onValueChange(e, type) {
    if (type === 'email') {
      this.setState({ email: e.target.value });
    }
  }

  //
  submitForm(e) {
    e.preventDefault();
    this.setState({ isLoading: true });
    const payload = {
      email: this.state.email,
    };
    this.setState({ loggedIn: true });

    // Add email reset action here
    this.props.userResetPasswordRequest(payload)
  }

  render() {
    return (
      <Layout>
        <Header title="Forgot Password" />
        <SevenRewards>
          <section className="Section">
            <Container className="Section__container">
              <Row className="justify-content-center">
                <Col xs="12" md="9" lg="8" className="col">
                  <h1 className="h4">Forgot Your Password?</h1>
                  <p>
                    Please enter the email address that was used to register
                    your account. If the email you provide is valid, you will
                    receive a link to reset your password shortly.
                  </p>
                </Col>
              </Row>
              <Row className="justify-content-center mt-5">
                <Col xs="12" md="9" lg="8" className="col">
                  <AdminPanel className="mt-n5 mb-5 mb-md-0">
                    <Container className="p-5">
                      <Form>
                        <Form.Group className="mb-4 mb-lg-5" controlId="email">
                          <Form.Label className="small">
                            Email Address
                          </Form.Label>
                          <Form.Control
                            size="lg"
                            id="email"
                            type="email"
                            value={this.state.email}
                            onChange={e => this.onValueChange(e, 'email')}
                            name="email"
                          />
                        </Form.Group>
                        <Button id="submit" onClick={e => this.submitForm(e)}>
                          Send Email
                        </Button>
                        <Link href="/7rewards/signin">
                          <a className="ml-4">Cancel</a>
                        </Link>

                        {/* {this.props.user.auth.error && (
                          <div className="form__wrapper">
                            <h5>
                              {
                                this.props.user.auth.error.payload
                                  .error_description
                              }
                            </h5>
                          </div>
                        )} */}
                      </Form>
                    </Container>
                  </AdminPanel>
                </Col>
              </Row>
              <Row className="justify-content-center mt-5">
                <Col xs="12" md="9" lg="8" className="col">
                  <p className="text-center">
                    <strong className="font-trasandina mr-2 text-success">
                      Need Help?
                    </strong>
                    <NeedHelp.AdminText />
                  </p>
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
  userAuthRequest: payload => dispatch(appActions.reqUserAuthAction(payload)),
  userResetPasswordRequest: payload => dispatch(appActions.reqPasswordResetAction(payload)),
});

const ResetPassword_ = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResetPassword);

export default ResetPassword_;
