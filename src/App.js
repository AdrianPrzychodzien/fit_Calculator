import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import Home from './pages/Home'
import PersonalData from './pages/PersonalData'
import Help from './pages/Help'
import BodyFat from './pages/BodyFat'
import SignInAndSignUp from './pages/SignInAndSignUp'
import Bmi from './pages/Bmi'

import NavBar from './components/NavBar/NavBar'
import SideBar from './components/SideBar/SideBar'
import Backdrop from './util/Backdrop/Backdrop'

import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { setCurrentUser } from './redux/actions'

import './App.css'

const App = ({ currentUser, setCurrentUser, sidebarOpen }) => {

  useEffect(() => {
    let unsubscribeFromAuth = null

    unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })
        })
      } else {
        setCurrentUser(userAuth)
      }
    })

    return () => unsubscribeFromAuth()
  }, [setCurrentUser])

  return (
    <div className="App">
      <Router>
        <NavBar />
        <SideBar />
        {sidebarOpen && <Backdrop />}
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/personalData' component={PersonalData} />
          <Route exact path='/help' component={Help} />
          <Route exact path='/bodyFat' component={BodyFat} />
          <Route exact path='/bmi' component={Bmi} />
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
  )
}

const mapStateToProps = ({ user, ui }) => ({
  currentUser: user.currentUser,
  sidebarOpen: ui.sidebarOpen
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)