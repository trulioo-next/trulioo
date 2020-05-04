import React from 'react';
import { connect } from 'react-redux';
import Layout from '../../containers/Layout/Layout';
import Header from '../../components/Header/Header';
import appActions from '../../stores/user/actions';
import appSelectors from '../../stores/user/selectors';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import AdminPanel from '@/components/7rewards/Admin/AdminPanel';

import SevenRewardsLogo from '@/static/images/7rewards/7-rewards-logo.svg';

class UserAuth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      password: '',
      valid: false,
      isLoading: false,
      loggedIn: false,
    };
  }

  static async getInitialProps({ isServer, store }) {
    return {};
  }

  componentDidMount() {
    // Logout action trigger
    //
    this.props.userLogoutRequest();
  }

  //
  componentDidUpdate() {
    let isUserAuth = this.props.user.auth;
    // console.log('THIS USER ', isUserAuth);
  }

  render() {
    return (
      <Layout>
        <Header title="Sign Out" />
        <Container className="my-5 px-5 px-md-4">
          <Row className="justify-content-center py-lg-4 my-5">
            <Col xs="6" md="3">
              <SevenRewardsLogo />
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs="12" md="10" lg="8">
              <AdminPanel className="mt-n5 p-5">
                <h1 className="h4 text-center m-0">
                  You have successfully logged out.
                </h1>
              </AdminPanel>
            </Col>
          </Row>
        </Container>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  user: appSelectors.userDataSelector(state),
});

const mapDispatchToProps = dispatch => ({
  userLogoutRequest: () => dispatch(appActions.reqUserLogoutAction()),
});

const UserAuth_ = connect(mapStateToProps, mapDispatchToProps)(UserAuth);

export default UserAuth_;
