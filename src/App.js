import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import Home from './pages/home/Home'
import PersonalData from './pages/personalData/PersonalData'
import Help from './pages/help/Help'
import BodyFat from './pages/bodyFat/BodyFat'
import SignInAndSignUp from './pages/signInAndSignUp/SignInAndSignUp'
import Bmi from './pages/bmi/Bmi'
import Bmr from './pages/bmr/Bmr'

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
          <Route exact path='/bmr' component={Bmr} />
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