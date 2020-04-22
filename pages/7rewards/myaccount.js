import React from "react";
import { connect } from 'react-redux'
import Layout from '../../containers/Layout/Layout'
import Header from '../../components/Header/Header'
import Button from '@/components/Button';
import appActions from '../../stores/user/actions'
import appSelectors from '../../stores/user/selectors'
import Hero from '@/components/Hero';
import {css, jsx} from "@emotion/core";  
import * as Yup from 'yup';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './RegisterScreen.scss';

class MyAccount extends React.Component {


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
      cardNumber:'',
      phone:'',
      postal:'',
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
    

       // PROD ID 1018851968129793
       // STAGING ID 219346039373151

      window.fbAsyncInit = () => {
        FB.init({
          appId: '1018851968129793', 
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
  componentDidUpdate() { }


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
      this.logUserIn(response.authResponse.accessToken);
      

    } else if (response.status === 'not_authorized') {
      console.log("[FacebookLoginButton] Person is logged into Facebook but not your app");
    } else {
      console.log("[FacebookLoginButton] Person is not logged into Facebook");
    }
  }

  logUserIn(access_token) {
    FB.api('/me', function(response) {
      console.log('[FacebookLoginButton] Successful login for: ', response );
      this.submitFacebookRequest(access_token,response);
    }.bind(this));
  }
  
  // Update state value 
  //
  onValueChange(e,type) {
    // console.log('ON VALUE CHANGED ', type, e.target.value)
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
      bDay:this.state.bDay,
      bYear:this.state.bYear,
      phone:this.state.phone,
      postal:this.state.postal,
      cardNumber: this.state.cardNumber
    }

    // console.log('REGISTER USER ', payload )
    // this.setState({loggedIn:true})
    this.props.userRegisterRequest(payload)
  }


  submitFacebookRequest(access_token,response) {
  
    console.log('access_token ', access_token )
    console.log('response ', response )
   //  this.props.userFacebookRegisterRequest(access_token);

  }
 
  render() {

    return (
      <Layout>

        <Header title="7 Rewards Register"/>
        <Hero src="/static/images/placeholders/Homepage_Banner.jpg">
        </Hero>
        <Container className="Section__container">
        <div className="register__screen__page">
          {!this.state.loggedIn &&  
          <div className="form__wrapper">
            <h2>Register:</h2>

            <Row>
              <Col className="text-center">
                <img className="facebook__btn" src="/static/images/placeholders/facebook-btn.png" onClick={(e) => this.login(e) } />
                <p className="bottom--margin--20">OR</p>
              </Col>
            </Row>

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
                     <select id="bb-month" name="b-month" placeholder="Year" value={this.state.bMonth} onChange={(e) => this.onValueChange(e,'bMonth')}>
                       <option value="">Month</option>
                       <option value="0">Jan</option>
                       <option value="1">Feb</option>
                       <option value="2">Mar</option>
                       <option value="3">Apr</option>
                       <option value="4">May</option>
                       <option value="5">Jun</option>
                       <option value="6">Jul</option>
                       <option value="7">Aug</option>
                       <option value="8">Sep</option>
                       <option value="9">Oct</option>
                       <option value="10">Nov</option>
                       <option value="11">Dec</option>
                     </select>
                  </div>
                </Col>
                 <Col className="text-center">
                   <div className="input__group">
                    <label>Day</label>
                     
                     <select id="b-day" value={this.state.bDay} onChange={(e) => this.onValueChange(e,'bDay')} name="b-day" placeholder="Day"><option value="">Day</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option></select>
                  </div>
                </Col>
                 <Col className="text-center">
                    <div className="input__group">
                    <label>Year</label>
                    
                     <select id="b-year" value={this.state.bYear} onChange={(e) => this.onValueChange(e,'bYear')} name="b-year" placeholder="Year"><option value="">Year</option><option value="2020">2020</option><option value="2019">2019</option><option value="2018">2018</option><option value="2017">2017</option><option value="2016">2016</option><option value="2015">2015</option><option value="2014">2014</option><option value="2013">2013</option><option value="2012">2012</option><option value="2011">2011</option><option value="2010">2010</option><option value="2009">2009</option><option value="2008">2008</option><option value="2007">2007</option><option value="2006">2006</option><option value="2005">2005</option><option value="2004">2004</option><option value="2003">2003</option><option value="2002">2002</option><option value="2001">2001</option><option value="2000">2000</option><option value="1999">1999</option><option value="1998">1998</option><option value="1997">1997</option><option value="1996">1996</option><option value="1995">1995</option><option value="1994">1994</option><option value="1993">1993</option><option value="1992">1992</option><option value="1991">1991</option><option value="1990">1990</option><option value="1989">1989</option><option value="1988">1988</option><option value="1987">1987</option><option value="1986">1986</option><option value="1985">1985</option><option value="1984">1984</option><option value="1983">1983</option><option value="1982">1982</option><option value="1981">1981</option><option value="1980">1980</option><option value="1979">1979</option><option value="1978">1978</option><option value="1977">1977</option><option value="1976">1976</option><option value="1975">1975</option><option value="1974">1974</option><option value="1973">1973</option><option value="1972">1972</option><option value="1971">1971</option><option value="1970">1970</option><option value="1969">1969</option><option value="1968">1968</option><option value="1967">1967</option><option value="1966">1966</option><option value="1965">1965</option><option value="1964">1964</option><option value="1963">1963</option><option value="1962">1962</option><option value="1961">1961</option><option value="1960">1960</option><option value="1959">1959</option><option value="1958">1958</option><option value="1957">1957</option><option value="1956">1956</option><option value="1955">1955</option><option value="1954">1954</option><option value="1953">1953</option><option value="1952">1952</option><option value="1951">1951</option><option value="1950">1950</option><option value="1949">1949</option><option value="1948">1948</option><option value="1947">1947</option><option value="1946">1946</option><option value="1945">1945</option><option value="1944">1944</option><option value="1943">1943</option><option value="1942">1942</option><option value="1941">1941</option><option value="1940">1940</option><option value="1939">1939</option><option value="1938">1938</option><option value="1937">1937</option><option value="1936">1936</option><option value="1935">1935</option><option value="1934">1934</option><option value="1933">1933</option><option value="1932">1932</option><option value="1931">1931</option><option value="1930">1930</option><option value="1929">1929</option><option value="1928">1928</option><option value="1927">1927</option><option value="1926">1926</option><option value="1925">1925</option><option value="1924">1924</option><option value="1923">1923</option><option value="1922">1922</option><option value="1921">1921</option><option value="1920">1920</option><option value="1919">1919</option><option value="1918">1918</option><option value="1917">1917</option><option value="1916">1916</option><option value="1915">1915</option><option value="1914">1914</option><option value="1913">1913</option><option value="1912">1912</option><option value="1911">1911</option><option value="1910">1910</option><option value="1909">1909</option><option value="1908">1908</option><option value="1907">1907</option><option value="1906">1906</option><option value="1905">1905</option><option value="1904">1904</option><option value="1903">1903</option><option value="1902">1902</option><option value="1901">1901</option><option value="1900">1900</option></select>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className="text-center">
                  <div className="input__group">
                    <label>Mobile Number *</label>
                    <input id="phone" value={this.state.phone} onChange={(e) => this.onValueChange(e,'phone')} name="phone" placeholder="Mobile Number"/>
                  </div>
                </Col>
              </Row>   

              <Row>
                <Col className="text-center">
                  <div className="input__group">
                    <label>Postal Code *</label>
                    <input id="postal" value={this.state.postal} onChange={(e) => this.onValueChange(e,'postal')} name="postal" placeholder="Postal Code *"/>
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
  userRegisterRequest: (payload) => dispatch(appActions.reqUserRegisterAction(payload)),
  userFacebookRegisterRequest: payload => dispatch(appActions.reqUserFacebookRegisterAction(payload)),
})

const MyAccount_ = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyAccount)
 
export default MyAccount_;
