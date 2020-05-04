import React from 'react';
import { connect } from 'react-redux';
import Layout from '../../containers/Layout/Layout';
import Header from '../../components/Header/Header';
import Button from '@/components/Button';
import appActions from '../../stores/user/actions';
import appSelectors from '../../stores/user/selectors';
import Hero from '@/components/Hero';
import { css, jsx } from '@emotion/core';

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
    this.setState({ loggedIn: true });
    this.props.userAuthRequest(payload);
  }

  render() {
    return (
      <Layout>
        <Header title="Nutritionals" />
        <Hero src="/static/images/placeholders/Nutritionals.png"></Hero>
        <div className="login__screen__page">
          {!this.state.loggedIn && (
            <div
              className="form__wrapper"
              css={css`
                margin-top: 150px;
              `}
            >
              <h2>Login:</h2>
              <form>
                <div className="input__group">
                  <label>User Name</label>
                  <input
                    id="user_name"
                    value={this.state.userName}
                    onChange={e => this.onValueChange(e, 'user')}
                    name="user_name"
                    placeholder="user name"
                  />
                </div>
                <div className="input__group">
                  <label>Password</label>
                  <input
                    value={this.state.password}
                    type="password"
                    name="password"
                    onChange={e => this.onValueChange(e, 'pass')}
                    placeholder="password"
                  />
                </div>
                <Button id="submit" onClick={e => this.submitForm(e)}>
                  Login
                </Button>

                {this.props.user.auth.error && (
                  <div
                    className="form__wrapper"
                    css={css`
                      position: relative;
                      display: block;
                      margin-top: 30px;
                      text-align: center;
                      width: 100%;
                    `}
                  >
                    <h5>
                      {this.props.user.auth.error.payload.error_description}
                    </h5>
                  </div>
                )}
              </form>
            </div>
          )}
          {this.state.loggedIn && (
            <div
              className="form__wrapper"
              css={css`
                margin-top: 150px;
                text-align: center;
                width: 100%;
              `}
            >
              <h2>You are logged in.</h2>
            </div>
          )}
        </div>
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

const UserAuth_ = connect(mapStateToProps, mapDispatchToProps)(UserAuth);

export default UserAuth_;
