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
import routerPush from '../../helpers/routerPush';
import * as Yup from 'yup';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



import '../login/LoginScreen.scss';

class UserAuth extends React.Component {
  constructor (props) {
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

  static async getInitialProps ({ query }) {
    return { query };
  }

  componentDidMount () {
    // console.log('user ', this.props.user )

    let isUserAuth = this.props.user ? this.props.user.auth : false;
    if (!this.props.user.error && isUserAuth) {
      // this.setState({loggedIn:true})
      routerPush('/7rewards');
    }



    // TODO: REMVOE THIS FORM HERE : 
    // facebook signin  button render
      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    

       // PROD ID 603915923024451

      window.fbAsyncInit = () => {
        FB.init({
          appId: '219346039373151', 
          autoLogAppEvents: true,
          xfbml: true,
          version: 'v6.0'
        });

        FB.Event.subscribe('auth.statusChange', response => {
          if (response.authResponse) {
            this.checkLoginState();
          } else {
            console.log('[FacebookLoginButton] User cancelled login or did not fully authorize.');
          }
        });
      };
      
  }

  componentDidUpdate () {
   let isUserAuth = this.props.user ? this.props.user.auth : false;
    if (!this.props.user.error && isUserAuth) {
      // this.setState({loggedIn:true})
      routerPush('/7rewards');
    }
 
  }


  checkLoginState() {
    FB.getLoginStatus(function(response) {
      this.statusChangeCallback(response);
    }.bind(this));
  }

  login() {
    FB.login(this.checkLoginState(), {
      scope: 'email'
    });
  }

  statusChangeCallback(response) {
    if (response.status === 'connected') {
      // this.logUserIn(response.authResponse.accessToken);
      this.submitFacebookRequest(response.authResponse.accessToken);

    } else if (response.status === 'not_authorized') {
      console.log("[FacebookLoginButton] Person is logged into Facebook but not your app");
    } else {
      console.log("[FacebookLoginButton] Person is not logged into Facebook");
    }
  }

  logUserIn(access_token) {
    FB.api('/me', function(response) {
      console.log('[FacebookLoginButton] Successful login for: ', response );
      
    }.bind(this));
  }
 
  //
  onValueChange (e, type) {
    if (type === 'user') {
      this.setState({ userName: e.target.value });
    }

    if (type === 'pass') {
      this.setState({ password: e.target.value });
    }
  }

  //
  submitForm (e) {
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

  render () {

    let error = this.props.user && this.props.user.error ? this.props.user.error : false;


    return (
      <Layout>
        <Header title='Sign In' />
        <Hero src='/static/images/placeholders/Pizza_Hero.jpg'></Hero>

        <div className='login__screen__page'>
          {!this.state.loggedIn && (
            <div
              className='form__wrapper'
              css={css`
                margin-top: 100px;
              `}
            >
              <p
                className='header__title'
                css={css`
                  margin-top: 0px;
                  margin-bottom: 50px;
                `}
              >
                EARN points for every $1 you spend. REDEEM points for FREE food
                & drink. Enjoy bonus offers and get rewards even faster. And
                every 7th cup still FREE!
              </p>
              <h3>Sign In</h3>
              <form>
                <p>
                  If you’re an existing member, please sign in using your
                  7Rewards email address and password.
                </p>

                 <Row>
                  <Col className="text-center">
                    <img className="facebook__btn" onClick={(e) => this.login(e) } src="/static/images/placeholders/facebook-btn.png" />
                    <p className="bottom--margin--20">OR</p>
                  </Col>
                </Row>


                <div className='input__group'>
                  <label>User Name</label>
                  <input
                    id='user_name'
                    value={this.state.userName}
                    onChange={e => this.onValueChange(e, 'user')}
                    name='user_name'
                    placeholder='Email'
                  />
                </div>
                <div className='input__group'>
                  <label>Password</label>
                  <input
                    value={this.state.password}
                    type='password'
                    name='password'
                    onChange={e => this.onValueChange(e, 'pass')}
                    placeholder='Password'
                  />
                </div>

                { error &&  
                  <div className="form__wrapper" css={css`position: relative; display:block; margin-top:30px; text-align:center; width: 100%;`}>
                  <h5>{ this.props.user.error.payload.error_description }</h5></div>
                }
               
                <Button id='submit' onClick={e => this.submitForm(e)}>
                  Login
                </Button>
                
 
              </form>
            </div>
          )}
          {this.state.loggedIn && (
            <div
              className='form__wrapper'
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
  userFacebookAuthRequest: payload => dispatch(appActions.reqUserFacebookAuthAction(payload)),
});

const UserAuth_ = connect(mapStateToProps, mapDispatchToProps)(UserAuth);

export default UserAuth_;
