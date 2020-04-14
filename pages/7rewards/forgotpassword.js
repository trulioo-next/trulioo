import React from "react";
import { connect } from 'react-redux'
import Layout from '../../containers/Layout/Layout'
import Header from '../../components/Header/Header'
import Button from '@/components/Button';
import appActions from '../../stores/user/actions'
import appSelectors from '../../stores/user/selectors'
import Hero from '@/components/Hero';
import {css, jsx} from "@emotion/core";  

import '../login/LoginScreen.scss';

class ResetPassword extends React.Component {
  constructor(props) {
    super(props)

    this.submitForm = this.submitForm.bind(this)
    this.onValueChange = this.onValueChange.bind(this)

    this.state = {
      email:'',
      valid:false,
      isLoading:false,
      loggedIn:false
    }
  }

  static async getInitialProps({ isServer, store }) {
    return {}
  }

  componentDidMount() {

    let isUserAuth = this.props.user.auth
    if( !isUserAuth.error && isUserAuth ) {
      this.setState({loggedIn:true})
    }

  }
  componentDidUpdate() { }
  
  //
  onValueChange(e,type) {
    if( type === 'email') {
      this.setState({email:e.target.value})
    }
  }
  
  //
  submitForm(e) {
    e.preventDefault()
    this.setState({isLoading:true})
    const payload = {
      email: this.state.email
    }
    this.setState({loggedIn:true})

    // Add email reset action here 
    //  this.props.userAuthRequest(payload)
  }
 
  render() {

    return (
      <Layout>
        <Header title="Forgot Password" />
        <Hero src="/static/images/placeholders/Get7Rewards_Background.jpg">
        </Hero>
        <div className="login__screen__page">
          { !this.state.loggedIn &&  
          <div className="form__wrapper" css={css`margin-top:150px;`}>
            <h2>Login:</h2>
            <form>
              <div className="input__group">
                <label>Email</label>
                <input id="user_name" value={this.state.email} onChange={(e) => this.onValueChange(e,'email')} name="email" placeholder="Email Address"/>
              </div>
              <Button
                id="submit"
                onClick={ (e) => this.submitForm(e) } >
                Login
              </Button>
              {this.props.user.auth.error &&  
                <div className="form__wrapper" css={css`position: relative; display:block; margin-top:30px; text-align:center; width: 100%;`}>
                <h5>{ this.props.user.auth.error.payload.error_description }</h5></div>
              }
            </form>
          </div>
          }
           
        </div>
     </Layout>
    )
  }
}

const mapStateToProps = (state) => ({
  user: appSelectors.userDataSelector(state),
})

const mapDispatchToProps = (dispatch) => ({
  userAuthRequest: (payload) => dispatch(appActions.reqUserAuthAction(payload)),
})

const ResetPassword_ = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPassword)
 
export default ResetPassword_;
