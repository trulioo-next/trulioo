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

class Faq extends React.Component {
  constructor(props) {
    super(props)

   
    this.state = {
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
  
  render() {

    return (
      <Layout>
        <Header title="My Account" />
        <Hero src="/static/images/placeholders/Nutritionals.png">
        </Hero>
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

const Faq_ = connect(
  mapStateToProps,
  mapDispatchToProps
)(Faq)
 
export default Faq_;
