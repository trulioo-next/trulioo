import React from 'react'
import { connect } from 'react-redux'

import Header from '../../components/Header/Header'
import NavBar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/Footer'
import Loader from '../../components/Loader/Loader'

import { selectIsLoading, selectIsLoaded } from '../../stores/app/selectors'
import './Layout.scss';


class Layout extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { isLoading } = this.props

    return (
      <main className="layout">
        <Header
          title="Oura Ring"
          description="Oura Ring: the most accurate sleep and activity tracker"
          canonical="https://ouraring.com"
        />
        <NavBar />

        <div className="conteiner">
          {isLoading && <Loader />}
          {this.props.children}
        </div>
        <Footer />
      </main>
    )
  }
}


const mapStateToProps = (state) => ({
  isLoading: selectIsLoading(state),
  isLoaded: selectIsLoaded(state)
})

export default connect(
  mapStateToProps,
)(Layout)
