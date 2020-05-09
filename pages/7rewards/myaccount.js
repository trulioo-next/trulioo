import React, { Fragment } from 'react';
import { connect, useSelector } from 'react-redux';
import Layout from '@/containers/Layout';
import Admin from '@/containers/Admin';
import Header from '@/components/Header';
import appActions from '@/stores/user/actions';
import appSelectors from '@/stores/user/selectors';
import routerPush from '../../helpers/routerPush';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormCheck from 'react-bootstrap/FormCheck';

import Button from '@/components/Button';
import UserProfile from '@/components/7rewards/UserProfile';

class MyAccount extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valid: false,
      isLoading: false,
      loggedIn: false,
      isChecked: false,
      card:''
    };


    this.updatePreferences = this.updatePreferences.bind(this);
    this.savePreferences = this.savePreferences.bind(this)
  }

  static async getInitialProps({ isServer, store }) {
    let userData = store.getState();
    return { isServer, userData };
  }

  componentDidMount() {
    let isUserAuth = this.props.user && this.props.user.auth ? this.props.user.auth : false ;
    if (!isUserAuth.error && isUserAuth) {
      this.setState({ loggedIn: true });
      let preferences = this.props.user.user.preferences
      
      if(preferences) {
        for(var i = 0; i < preferences.length; i++ ) {
            if(preferences[i].enabled === 'true' || preferences[i].enabled === true) {
               this.setState({isChecked:true})
            }
        }
      }
    } else {
      routerPush('/7rewards/signin')
    }
  }

  componentDidUpdate() {}

  updatePreferences(e) {
     
    let newUser = this.props.user;
    if(this.state.isChecked) {
      newUser.user.preferences[0].enabled = false
      this.setState({isChecked:false}) 
    } else {
      newUser.user.preferences[0].enabled = true
      this.setState({isChecked:true})
       
    }
 
  }

  savePreferences(e) {
    e.preventDefault()
    let newUser = this.props.user;
    newUser.user.preferences[0].enabled = this.state.isChecked
 
    let payload = {
      token: newUser.token,
      value:newUser.user.preferences[0].enabled,
      user:newUser.user
    }

    this.props.updatePrefernecesRequest(payload)
  }

  //
  updateCardId(e) {
    this.setState({ card: e.target.value });
  }

  addNewCard(e) {
    e.preventDefault();
    let token = this.props.user && this.props.user.token ? this.props.user.token : false;

    if(token) {
       this.props.addCardRequest({card:this.state.card,token})
    } else {
      alert('NEED TO AUTHENTICATE ')
    }
   
  }

  // TODO: Set up form actions for account page.

  render() {
    const userInfo = this.props.user && this.props.user.user ? this.props.user.user : false;

    const cardError = 
    this.props.user && 
    this.props.user.addCard && 
    this.props.user.addCard.error && 
    this.props.user.addCard.error.payload && 
    this.props.user.addCard.error.payload.field_errors && 
    this.props.user.addCard.error.payload.field_errors.new_loyalty_id ? this.props.user.addCard.error.payload.field_errors.new_loyalty_id[0] : false;
   
    return (
      <Layout>
        <Header title="7Rewards" />
        {this.state.loggedIn && (
          <Admin>
            <Container className="px-0">
              <Row className="justify-content-center mx-lg-n5">
                <Col xs="12" md="10" lg="6" className="px-lg-5">
                 { userInfo && 
                  <Admin.Panel>
                    <UserProfile data={userInfo} />
                  </Admin.Panel>
                  }
                  <Admin.Panel>
                    <div className="p-5">
                      <h2 className="h6">Preferences</h2>
                      <hr className="mb-4" />
                      <Form>
                        { userInfo.preferences.map((preference, index) => (
                          <fieldset className="my-4" key={index}>
                            <legend className="mb-4">{preference.title}</legend>
                            <Form.Check id={preference.id}>
                              <FormCheck.Input
                                type="checkbox"
                                checked={this.state.isChecked}
                                onChange={(e) => this.updatePreferences(e) }
                              />
                              <FormCheck.Label className="ml-3">
                                {preference.description}
                              </FormCheck.Label>
                            </Form.Check>
                          </fieldset>
                        ))}
                        <Button type="submit" onClick={(e) => this.savePreferences(e) }>Save</Button>
                      </Form>
                    </div>
                  </Admin.Panel>
                </Col>
                <Col xs="12" md="10" lg="6" className="px-lg-5">
                  <Admin.Panel
                    className="text-center text-white"
                    style={{
                      backgroundImage:
                        'linear-gradient(64deg, #4FB0C9, #64BAA5, #8ACE70, #9FDA4F)',
                    }}
                  >
                    <Form className="p-5">
                      <Form.Group className="my-5" controlId="account-add-card">
                        <Form.Label className="h3">Add A Card</Form.Label>
                        <Form.Control
                          size="lg"
                          className="form-control form-control-lg"
                          type="number"
                          placeholder="Card Number"
                          value={this.state.card}
                          onChange={(e) => this.updateCardId(e) }
                        />
                        { cardError && 

                          <p className="field--error white">{cardError}</p>

                        }
                      </Form.Group>
                      <Button type="submit" onClick={ (e) => this.addNewCard(e) }>Add Card</Button>
                    </Form>
                  </Admin.Panel>
                </Col>
              </Row>
            </Container>
          </Admin>
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
  updatePrefernecesRequest: payload => dispatch(appActions.reqPreferenceUpdateAction(payload)),
  addCardRequest: payload => dispatch(appActions.reqAddCardAction(payload)),
});

MyAccount.defaultProps = {
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

const MyAccount_ = connect(mapStateToProps, mapDispatchToProps)(MyAccount);

export default MyAccount_;
