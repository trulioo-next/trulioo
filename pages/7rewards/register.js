import React from "react";
import { connect } from 'react-redux'
import Layout from '../../containers/Layout/Layout'
import Header from '../../components/Header/Header'
import Button from '@/components/Button';
import appActions from '../../stores/user/actions'
import appSelectors from '../../stores/user/selectors'
import Hero from '@/components/Hero';
import {css, jsx} from "@emotion/core";  


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './RegisterScreen.scss';

class Register extends React.Component {


  constructor(props) {
    super(props)

    this.submitForm = this.submitForm.bind(this)
    this.onValueChange = this.onValueChange.bind(this)

    this.state = {
      firstName:'',
      lastName:'',
      email:'',
      password:'',
      confirmPassword:'',
      bMonth:'',
      bDay:'',
      bYear:'',
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
  
  // Update state value 
  //
  onValueChange(e,type) {
    this.setState({[type]:e.target.value})
  }
  
  //
  submitForm(e) {
    e.preventDefault()
    this.setState({isLoading:true})
    const payload = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password:this.state.password,
      email:this.state.email,
      bMonth:this.state.bMonth,
      bDay:this.state.bbDay,
      bYear:this.state.bYear
    }

    console.log('REGISTER USER ', payload )
    // this.setState({loggedIn:true})
    // this.props.userAuthRequest(payload)
  }
 
  render() {

    return (
      <Layout>

        <Header title="Nutritionals" />
        <Hero src="/static/images/placeholders/Nutritionals.png">
        </Hero>
        <Container className="Section__container">
        <div className="register__screen__page">
          {!this.state.loggedIn &&  
          <div className="form__wrapper">
            <h2>Register:</h2>
            <form>
              <Row>
                <Col className="text-center">
                  <div className="input__group">
                    <label>First Name</label>
                    <input id="first_name" value={this.state.firstName} onChange={(e) => this.onValueChange(e,'firstName')} name="first_name" placeholder="first name"/>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className="text-center">
                  <div className="input__group">
                  <label>Last Name</label>
                  <input id="last_name" value={this.state.lastName} onChange={(e) => this.onValueChange(e,'lastName')} name="last_name" placeholder="last name"/>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className="text-center">
                  <div className="input__group">
                    <label>Email Address </label>
                    <input id="email" value={this.state.email} onChange={(e) => this.onValueChange(e,'email')} name="email" placeholder="Email Address "/>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className="text-center">
                  <div className="input__group">
                    <label>Password</label>
                    <input id="password" type="password" value={this.state.password} onChange={(e) => this.onValueChange(e,'password')} name="password" placeholder="Password"/>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className="text-center">
                  <div className="input__group">
                    <label>Confirm Password</label>
                    <input id="password-confirm" type="password" value={this.state.confirmPassword} onChange={(e) => this.onValueChange(e,'confirmPassword')} name="password-confirm" placeholder="Confirm Password"/>
                  </div>
                </Col>
              </Row>   
              <Row>
                <Col className="text-center">
                   <div className="input__group">
                    <label>Month</label>
                     <input id="bb-month" value={this.state.bMonth} onChange={(e) => this.onValueChange(e,'bMonth')} name="b-month" placeholder="Year"/>
                  </div>
                </Col>
                 <Col className="text-center">
                   <div className="input__group">
                    <label>Day</label>
                     <input id="b-day" value={this.state.bDay} onChange={(e) => this.onValueChange(e,'bDay')} name="b-day" placeholder="Day"/>
                  </div>
                </Col>
                 <Col className="text-center">
                    <div className="input__group">
                    <label>Year</label>
                     <input id="b-year" value={this.state.bYear} onChange={(e) => this.onValueChange(e,'bYear')} name="b-year" placeholder="Year"/>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className="text-center">
                  <div className="input__group">
                    <label>Phone</label>
                    <input id="phone" value={this.state.phone} onChange={(e) => this.onValueChange(e,'phone')} name="phone" placeholder="Phone"/>
                  </div>
                </Col>
              </Row>   
              <Row>
                <Col className="text-center">
                  <div className="input__group">
                    <label>Card Number</label>
                    <input id="card-number"  value={this.state.cardNumber} onChange={(e) => this.onValueChange(e,'cardNumber')} name="card-number" placeholder="7 Rewards Card Number"/>
                  </div>
                </Col>
              </Row>  
              <Row>
                <Col className="text-center">
                  <div className="input__group bottom--margin--20">
                   <input type="checkbox" id="terms" name="terms" value="I accept the Terms & Conditions." />
                   <label className="show">I accept the Terms & Conditions.</label>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className="">
                  <div className="input__group bottom--margin--80">
                   <input type="checkbox" id="agree" name="agree" value="I agree to receive news, promotions, and information from 7-Eleven®. You can unsubscribe at any time. Please read our Privacy Policy or Contact Us." />
                   <label className="show">I agree to receive news, promotions, and information from 7-Eleven®. You can unsubscribe at any time. Please read our Privacy Policy or Contact Us.</label>
                  </div>
                </Col>
              </Row>   

              <Button
                id="submit"
                onClick={ (e) => this.submitForm(e) } >
                Register
              </Button>

              { this.props.user.auth.error &&  
                <div className="form__wrapper" css={css`position: relative; display:block; margin-top:30px; text-align:center; width: 100%;`}>
                <h5>{ this.props.user.auth.error.payload.error_description }</h5></div>
              }
              
            </form>
          </div>
          }
          
        </div>
        </Container>
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
)(Register)
 
export default UserAuth_;
