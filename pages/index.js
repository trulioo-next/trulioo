import React from 'react'
import { connect } from 'react-redux';

import StartupActions from '../stores/startup/actions'
import { selectIsAuthenticated } from '../stores/app/selectors'

import CheckConnection from '../components/CheckConnection/CheckConnection'
import Home from './home'

class Index extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if(!this.props.isLoaded) this.props.startup(this.props.isAuthenticated)
  }

  render() {
    return (
      <Home />
    )
  }
}


const mapStateToProps = (state) => ({
  isAuthenticated: selectIsAuthenticated(state),
})

const mapDispatchToProps = (dispatch) => ({
  startup: (isAuthenticated) => dispatch(StartupActions.startup(isAuthenticated)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)
