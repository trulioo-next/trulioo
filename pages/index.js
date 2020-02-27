import React from 'react'
import { connect } from 'react-redux';
import { selectIsAuthenticated } from '../stores/app/selectors'

import CheckConnection from '../components/CheckConnection/CheckConnection'
import Home from './home'

class Index extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
     
  }

  render() {
    return (
      <Home />
    )
  }
}


const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)
