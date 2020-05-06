import React, { Fragment } from 'react';
import { connect, useSelector } from 'react-redux';
import Layout from '@/containers/Layout';
import Admin from '@/containers/Admin';
import Header from '@/components/Header';
import appActions from '@/stores/user/actions';
import appSelectors from '@/stores/user/selectors';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Landing from '@/components/7rewards/Landing';
import MyStatus from '@/components/7rewards/MyStatus';
import RewardsTabs from '@/components/7rewards/RewardsTabs';
import NeedHelp from '@/components/7rewards/NeedHelp';

class SevenRewards extends React.Component {
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

    //console.log('::: this.props.user :: ', this.props.user)
  }
  componentDidUpdate() {}

  render() {
    return (
      <Layout>
        <Header title="7Rewards" />
        {this.state.loggedIn ? (
          <Admin>
            <Container className="px-0">
              <Row className="justify-content-center mx-lg-n5">
                <Col xs="12" md="10" lg="3" className="px-lg-5">
                  <Admin.Panel label="My Status" className="p-4">
                    <MyStatus data={this.props.user.user} />
                  </Admin.Panel>
                </Col>
                <Col xs="12" md="10" lg="9" className="px-lg-5">
                  <Admin.Panel>
                    <RewardsTabs data={this.props.user} />
                  </Admin.Panel>
                </Col>
              </Row>
              <Row className="my-5 pt-md-5">
                <Col>
                  <p className="text-center">
                    <strong className="font-trasandina mr-2 text-success">
                      Need Help?
                    </strong>
                    <NeedHelp.AdminText />
                  </p>
                </Col>
              </Row>
            </Container>
          </Admin>
        ) : (
          <Landing />
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

SevenRewards.defaultProps = {
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

const SevenRewards_ = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SevenRewards);

export default SevenRewards_;
