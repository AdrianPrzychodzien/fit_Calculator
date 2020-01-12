import React, { Component } from 'react'
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

const theme = createMuiTheme(themeFile)

class App extends Component {
  state = {
    currentUser: null
  }
  unsubscribeFromAuth = null

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          })
          console.log(this.state);
        })
      } else {
        this.setState({ currentUser: userAuth })
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    const { currentUser } = this.state
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <NavBar currentUser={currentUser} />
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

export default App