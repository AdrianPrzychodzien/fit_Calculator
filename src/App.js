import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import Home from './pages/Home'
import PersonalData from './pages/PersonalData'
import Help from './pages/Help'
import BodyFat from './pages/BodyFat'
import SignInAndSignUp from './pages/SignInAndSignUp'

import NavBar from './components/NavBar/NavBar'
import SideBar from './components/SideBar/SideBar'
import Backdrop from './util/Backdrop/Backdrop'

import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { setCurrentUser } from './redux/actions'

import './App.css'

const App = ({ currentUser, setCurrentUser }) => {
  const [sideBar, setSideBar] = useState({
    open: false
  })

  const { open } = sideBar

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

  const handleToggleSideBar = () => {
    setSideBar((prevState) => {
      return { open: !prevState.open }
    })
  }

  const handleBackdropClick = () => {
    setSideBar({ open: false })
  }

  // TODO
  // SIDEBAR TRANSITION
  // SIDEBAR LINKS

  return (
    <div className="App">
      <Router>
        <NavBar toggleSideBar={handleToggleSideBar} />
        {open && <SideBar show={open} />}
        {open && <Backdrop click={handleBackdropClick} />}
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/personalData' component={PersonalData} />
          <Route exact path='/help' component={Help} />
          <Route exact path='/bodyFat' component={BodyFat} />
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

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)