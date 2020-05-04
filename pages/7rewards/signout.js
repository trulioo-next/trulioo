import React from 'react';
import { connect } from 'react-redux';
import Layout from '../../containers/Layout/Layout';
import Header from '../../components/Header/Header';
import Button from '@/components/Button';
import appActions from '../../stores/user/actions';
import appSelectors from '../../stores/user/selectors';
import Hero from '@/components/Hero';
import { css, jsx } from '@emotion/core';
import Link from 'next/link';

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
    console.log('THIS USER ', isUserAuth);
  }

  render() {
    return (
      <Layout>
        <Header title="Sign Out" />
        <Hero src="/static/images/placeholders/Get7Rewards_Background.jpg"></Hero>
        <div className="login__screen__page">
          <div
            className="form__wrapper"
            css={css`
              margin-top: 150px;
            `}
          >
            <h2>You have successfully logged out</h2>
          </div>
        </div>
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
