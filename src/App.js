import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import themeFile from './util/theme'

import home from './pages/home'
import personalData from './pages/personalData'
import help from './pages/help'
import signInAndSignUp from './pages/signInAndSignUp'

import NavBar from './components/NavBar'
import './App.css'

const theme = createMuiTheme(themeFile)

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <NavBar />
          <Switch>
            <Route exact path='/' component={home} />
            <Route exact path='/personalData' component={personalData} />
            <Route exact path='/help' component={help} />
            <Route exact path='/signin' component={signInAndSignUp} />
          </Switch>
        </Router>
      </div>
    </MuiThemeProvider>
  )
}

export default App