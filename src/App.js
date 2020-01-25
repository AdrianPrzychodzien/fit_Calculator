import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import Home from './pages/home/Home'
import PersonalData from './pages/personalData/PersonalData'
import FormikPersonalData from './pages/personalData/FormikPersonalData'
import Help from './pages/help/Help'
import BodyFat from './pages/bodyFat/BodyFat'
import FormikBodyFat from './pages/bodyFat/FormikBodyFat'
import SignInAndSignUp from './pages/signInAndSignUp/SignInAndSignUp'
import Bmi from './pages/bmi/Bmi'
import Calories from './pages/calories/Calories'

import NavBar from './components/NavBar/NavBar'

import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { setCurrentUser } from './redux/actions'
import { Jumbotron, Container } from 'reactstrap'

const App = ({ currentUser, setCurrentUser }) => {

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
    <Router>
      <Jumbotron fluid className="pt-5">
        <NavBar />
        <Container fluid className="mt-3" >
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/personalData' component={FormikPersonalData} />
            <Route exact path='/help' component={Help} />
            <Route exact path='/bodyFat' component={FormikBodyFat} />
            <Route exact path='/bmi' component={Bmi} />
            <Route exact path='/calories' component={Calories} />
            <Route exact path='/signin' render={() =>
              currentUser ? (
                <Redirect to='/' />
              ) : (
                  <SignInAndSignUp />
                )}
            />
          </Switch>
        </Container>
      </Jumbotron>
    </Router>

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