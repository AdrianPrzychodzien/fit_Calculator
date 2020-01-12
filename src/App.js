import React, { Component } from 'react'
import { connect } from 'react-redux'

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import themeFile from './util/theme'

import home from './pages/home'
import personalData from './pages/personalData'
import help from './pages/help'
import SignInAndSignUp from './pages/SignInAndSignUp'

import NavBar from './components/NavBar'
import './App.css'

import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { setCurrentUser } from './redux/actions'

const theme = createMuiTheme(themeFile)

class App extends Component {
  unsubscribeFromAuth = null

  componentDidMount() {
    const { setCurrentUser } = this.props

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          })
        })
      } else {
        setCurrentUser(userAuth)
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    const { currentUser } = this.props

    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <NavBar />
            <Switch>
              <Route exact path='/' component={home} />
              <Route exact path='/personalData' component={personalData} />
              <Route exact path='/help' component={help} />
              <Route exact path='/signin' render={() =>
                currentUser ? (
                  <Redirect to='/' />
                ) : (
                    <SignInAndSignUp />
                  )}
              />
            </Switch>
          </Router>
        </div>
      </MuiThemeProvider>
    )
  }
}


const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)