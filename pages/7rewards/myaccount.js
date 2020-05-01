import React, { Fragment } from 'react';
import { connect, useSelector } from 'react-redux';
import Layout from '@/containers/Layout';
import Admin from '@/containers/Admin';
import Header from '@/components/Header';
import appActions from '@/stores/user/actions';
import appSelectors from '@/stores/user/selectors';
import routerPush from '../../helpers/routerPush';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormCheck from 'react-bootstrap/FormCheck';

import Button from '@/components/Button';

class MyAccount extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valid: false,
      isLoading: false,
      loggedIn: false,
    };
  }

  static async getInitialProps({ isServer, store }) {
    let userData = store.getState();
    return { isServer, userData };
  }

  componentDidMount() {
    let isUserAuth = this.props.user.auth;
    if (!isUserAuth.error && isUserAuth) {
      this.setState({ loggedIn: true });
    }

    // TODO: Setup redirect if not logged in.

    // if (!isUserAuth) {
    //   routerPush('/7rewards/signin');
    // }

    // console.log('::: this.props.user :: ', this.props.user);
  }

  componentDidUpdate() {}

  // TODO: Add in Edit Profile modal + form styles.
  // TODO: Hook up Preferences to match user data.
  // TODO: Set up form actions for account page.

  render() {
    const userInfo = this.props.user.user;
    return (
      <Layout>
        <Header title="7Rewards" />
        {this.state.loggedIn && (
          <Admin>
            <Container className="px-0">
              <Row className="justify-content-center mx-lg-n5">
                <Col xs="12" md="10" lg="6" className="px-lg-5">
                  <Admin.Panel>
                    <div className="p-5">
                      <div className="d-flex w-100 align-items-end justify-content-between">
                        <h2 className="h6 m-0">Profile</h2>
                        <button type="button" className="btn btn-dark">
                          Edit
                        </button>
                      </div>
                      <hr />
                      <div className="mb-4">
                        <span className="d-block py-2 small">Name</span>
                        <span className="d-block">
                          {userInfo.first_name} {userInfo.last_name}
                        </span>
                      </div>
                      <div className="mb-4">
                        <span className="d-block py-2 small">Account ID</span>
                        <span className="d-block">{userInfo.username}</span>
                      </div>
                      <div className="mb-4">
                        <span className="d-block py-2 small">
                          Email Address
                        </span>
                        <span className="d-block">{userInfo.email}</span>
                      </div>
                      <div className="mb-4">
                        <span className="d-block py-2 small">Birthdate</span>
                        <span className="d-block">{userInfo.birthdate}</span>
                      </div>
                    </div>
                  </Admin.Panel>
                  <Admin.Panel>
                    <div className="p-5">
                      <h2 className="h6">Preferences</h2>
                      <hr className="mb-4" />
                      <Form>
                        <fieldset className="my-4">
                          <legend className="mb-4">Communication</legend>
                          <Form.Check id="communication-subscribe">
                            <FormCheck.Input type="checkbox" />
                            <FormCheck.Label className="ml-3">
                              Yes, I&apos;d like to receive news, special offers
                              and more from 7-Eleven.
                            </FormCheck.Label>
                          </Form.Check>
                        </fieldset>
                        <Button type="submit">Save</Button>
                      </Form>
                    </div>
                  </Admin.Panel>
                </Col>
                <Col xs="12" md="10" lg="6" className="px-lg-5">
                  <Admin.Panel
                    className="text-center text-white"
                    style={{
                      backgroundImage:
                        'linear-gradient(64deg, #4FB0C9, #64BAA5, #8ACE70, #9FDA4F)',
                    }}
                  >
                    <Form className="p-5">
                      <Form.Group className="my-5" controlId="account-add-card">
                        <Form.Label className="h3">Add A Card</Form.Label>
                        <Form.Control
                          size="lg"
                          className="form-control form-control-lg"
                          type="number"
                          placeholder="Card Number"
                        />
                      </Form.Group>
                      <Button type="submit">Add Card</Button>
                    </Form>
                  </Admin.Panel>
                </Col>
              </Row>
            </Container>
          </Admin>
        )}
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  user: appSelectors.userDataSelector(state),
});

const mapDispatchToProps = dispatch => ({
  userAuthRequest: payload => dispatch(appActions.reqUserAuthAction(payload)),
});

MyAccount.defaultProps = {
  description: false,
  expiration_label: false,
  expires: false,
  expires_soon: false,
  id: false,
  image_large: false,
  image_thumb: false,
  is_limited_quantity: false,
  is_location_specific: false,
  legal_text: false,
  participating_stores: false,
  percentage_left: false,
  quantity_is_low: false,
  title: false,
  type: false,
};

const MyAccount_ = connect(mapStateToProps, mapDispatchToProps)(MyAccount);

export default MyAccount_;
