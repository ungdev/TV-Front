import React from 'react'
import { connect } from 'react-redux'

import Layout from './layout'
import Home from './pages/Home'

class Dashboard extends React.Component {
  render() {
    const component = <Home />
    return <Layout component={component} />
  }
}

const mapStateToProps = state => ({
  user: state.user.user
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
