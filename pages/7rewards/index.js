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
import Modal from 'react-bootstrap/Modal';
import Landing from '@/components/7rewards/Landing';
import MyStatus from '@/components/7rewards/MyStatus';
import RewardsTabs from '@/components/7rewards/RewardsTabs';
import NeedHelp from '@/components/7rewards/NeedHelp';
import Button from 'react-bootstrap/Button';
 
class SevenRewards extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valid: false,
      isLoading: false,
      loggedIn: false,
      showSMSModal:false,
      modalMessage:'',
      modalLoaded:false,
      smscode:'',
      errorLoaded:false,
      smsLoaded:false,
      verifyToggle:false
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

    let sendSmsPrompt = 
       this.props.user && 
       this.props.user.sms && 
       this.props.user.sms.success ? this.props.user.sms.success : false

    if(sendSmsPrompt && !this.state.modalLoaded) {
      this.setState({modalMessage:sendSmsPrompt,modalLoaded:true  })
    }   

  }
  componentDidUpdate() {

    // 
  }

  updateCode(e) {
    this.setState({smscode:e.target.value})
  }

  verifySMSWithCode(e) {
    e.preventDefault()
    const props = this.props;
    // console.log('USER ', this.props.user )

    let phone = 
      this.props.user && 
      this.props.user.user &&
      this.props.user.user.mobile_number 
      ? this.props.user.user.mobile_number
      : false;


      // console.log('PHONE SENDING SMS REQUEST ', phone )
       
      if(phone) {
        this.setState({validateNumberModal:false, codeSet:true})
        let payload = { token: this.props.user.token, mobileNumber: phone, code: this.state.smscode  }
        this.props.verifySmsRequest(payload)
       // this.setState({showSMSModal:false});
        
        setTimeout(function () {
          // props.verifySmsRequest({ clear: true })
          console.log('PHONE SENDING SMS REQUEST ', phone )
        },10000)
        
      }
   
  }

  handleClose(e) {
    e.preventDefault();
    this.setState({showSMSModal:false});
      
  }

  modalClose(e) {
    this.setState({showSMSModal:false});
  }

  handleVerifyToggle(e) {
     e.preventDefault();
     this.setState({verifyToggle:true})
  }

  handleVerifyToggleOff(e) {
     e.preventDefault();
     this.setState({verifyToggle:false})
  }

  resendSms(e) {
    e.preventDefault();
    this.setState({verifyToggle:false});
    let phone = 
      this.props.user && 
      this.props.user.user &&
      this.props.user.user.mobile_number 
      ? this.props.user.user.mobile_number
      : false;

      if(phone) {
        let payload = { token: this.props.user.token, mobileNumber: phone  }
        this.props.verifySmsRequest(payload)
      }
  }

  render() {
    
    let smsError = 
      this.props.user &&
      this.props.user && 
      this.props.user.sms &&
      this.props.user.sms.error &&
      this.props.user.sms.error.payload &&
      this.props.user.sms.error.payload.error_description 
      ? this.props.user.sms.error.payload.error_description
      : false

    let smsSuccess = 
      this.props.user &&
      this.props.user.sms &&
      this.props.user.sms.success
      ? true
      : false  

    let userPhone = 
      this.props.user && 
      this.props.user.user &&
      this.props.user.user.mobile_number 
      ? this.props.user.user.mobile_number
      : false

    let isVerified = 
      this.props.user && 
      this.props.user.user &&
      this.props.user.user.is_email_verified 
      ? this.props.user.user.is_email_verified
      : false  

      
      
    if(userPhone) {
     let n = userPhone.toString()
     userPhone = n.replace(/.(?=.{4})/g, '');
      
    }  

    if(smsError && !this.state.errorLoaded) {
      // this.props.verifySmsRequest({ clear: true })
      this.setState({errorLoaded:true,showSMSModal:true})
    }  

    // console.log('smsError' , this.props.user )
    if(!isVerified && !this.state.smsLoaded) {
      this.setState({showSMSModal:true,smsLoaded:true})
      // this.props.verifySmsRequest({ clear: true })
    }
 
    return (
      <Layout>
         <Modal
            className="modal__container"
            show={this.state.showSMSModal}
            onHide={() => this.modalClose()}
            centered
            size="md"
          >
            <Modal.Header closeButton />
            <Modal.Body>
              { !this.state.verifyToggle &&  
                <div className="center--text">
                  <h2 className="SevenRewards__heading text-center">Lets Verify Your Mobile Phone</h2>
                  <p>Account verification required for new members to receive welcome offer.</p>
                  <h6>{this.state.modalMessage}</h6>

                  <form>
                    <input
                      className="verify--input"
                      id="sms_code"
                      type="text"
                      value={this.state.smscode}
                      placeholder="Verification PIN"
                      onChange={e => this.updateCode(e)}
                    />
                  </form>
                  { smsError && 
                    <p className="field--error">{smsError}</p>
                  }

                 <button
                  green className="verify--button" 
                  onClick={(e) =>  this.verifySMSWithCode(e) }
                >
                  Verify
                </button> 
                <div className="close--button">
                 <a href="/" onClick={(e) => this.handleClose(e)}>Cancel</a>
                </div>
                
                <div className="more--options">
                 <a href="/" onClick={(e) => this.handleVerifyToggle(e)}>Click Here</a><span> for more options</span>
                </div>  
              
                </div>
              }

              { this.state.verifyToggle && 
                  <div className="inner__modal__page">
                     <h2 className="SevenRewards__heading text-center">Lets Verify Your Mobile Phone</h2>  
                     <div className="sms__toggle__header">
                        <div>Verify (***)***-{ userPhone }</div>
                        <div><a href="/" onClick={(e) => this.resendSms(e)}>Resend</a></div>
                     </div>
                     <div>
                      <p>
                        Didn't receive your 6 digit PIN? No problem, click the resend and we will send you a new unique PIN to verify your mobile phone.
                      </p>
                      <p>
                        Help? <a href="" target="_blank">Contact Support</a>
                      </p>
                      <p>
                       If you are having issues verifying your mobile phone, contact support and we will look into it for you. 
                      </p>
                     </div>

                     <div>
                      <button
                        green className="verify--button" 
                        onClick={(e) =>  this.handleVerifyToggleOff(e) }
                      >
                        Back
                      </button> 

                     </div>

                  </div>
              }
            </Modal.Body>
          </Modal>


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
  verifySmsRequest: payload => dispatch(appActions.reqSMSAction(payload)),
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
