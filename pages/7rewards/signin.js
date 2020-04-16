import React from "react";
import { connect } from 'react-redux'
import Layout from '../../containers/Layout/Layout'
import Header from '../../components/Header/Header'
import Button from '@/components/Button';
import appActions from '../../stores/user/actions'
import appSelectors from '../../stores/user/selectors'
import Hero from '@/components/Hero';
import {css, jsx} from "@emotion/core";  
import Link from 'next/link';
import routerPush from "../../helpers/routerPush";
import * as Yup from 'yup';

import '../login/LoginScreen.scss';

class UserAuth extends React.Component {
  constructor(props) {
    super(props)

    this.submitForm = this.submitForm.bind(this)
    this.onValueChange = this.onValueChange.bind(this)

    this.state = {
      userName:'',
      password:'',
      valid:false,
      isLoading:false,
      loggedIn:false
    }
  }

  static async getInitialProps({  query  }) {
    return { query }
  }

  componentDidMount() {
    
    console.log('user ', this.props.user )

    let isUserAuth = this.props.user ? this.props.user.auth : false
    if( !isUserAuth.error && isUserAuth ) {
      // this.setState({loggedIn:true})
      routerPush("/7rewards");
    }

  }
  componentDidUpdate() { 
    
    let isUserAuth = this.props.user ? this.props.user.auth : false
    if( !isUserAuth.error && isUserAuth && !this.state.loggedIn ) {
      this.setState({loggedIn:true})
      routerPush("/7rewards");
    }

  }
  
  //
  onValueChange(e,type) {
    if( type === 'user') {
      this.setState({userName:e.target.value})
    }

    if( type === 'pass') {
      this.setState({password:e.target.value})
    }
  }
  
  //
  submitForm(e) {
    e.preventDefault()
    this.setState({isLoading:true})
    const payload = {
      userName: this.state.userName,
      password:this.state.password
    }
    // this.setState({loggedIn:true})
    this.props.userAuthRequest(payload)
  }
 
  render() {

    return (
      <Layout>
        <Header title="Sign In" />
        <Hero src="/static/images/placeholders/Pizza_Hero.jpg">
        </Hero>
         
        <div className="login__screen__page">
          {!this.state.loggedIn &&  
          <div className="form__wrapper" css={css`margin-top:100px;`}>
            <p className="header__title" css={css`margin-top:0px; margin-bottom:50px;`} >EARN points for every $1 you spend. REDEEM points for FREE food & drink. Enjoy bonus offers and get rewards even faster. And every 7th cup still FREE!</p>
            <h3>Sign In</h3>
            <form>
              <p>If you’re an existing member, please sign in using your 7Rewards email address and password.</p>
              <div className="input__group">
                <label>User Name</label>
                <input id="user_name" value={this.state.userName} onChange={(e) => this.onValueChange(e,'user')} name="user_name" placeholder="Email"/>
              </div>
              <div className="input__group">
                <label>Password</label>
                <input value={this.state.password} type="password" name="password" onChange={(e) => this.onValueChange(e,'pass')} placeholder="Password"/>
              </div>
              <Button
                id="submit"
                onClick={ (e) => this.submitForm(e) } >
                Login
              </Button>

               
            </form>
 
          </div>
          }
          {this.state.loggedIn &&  
            <div className="form__wrapper" css={css`margin-top:150px; text-align:center; width: 100%;`}>
            <h2>You are logged in.</h2></div>
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


const UserAuth_ = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserAuth)
 
export default UserAuth_;
